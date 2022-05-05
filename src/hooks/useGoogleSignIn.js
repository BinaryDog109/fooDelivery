import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import firebase from "firebase/compat/app";
import { projectFirestore } from "../firebase/config";

export const useGoogleSignIn = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (form, roles) => {
    setError(null);
    setIsPending(true);

    try {
      var provider = new firebase.auth.GoogleAuthProvider();

      // signup

      const result = await firebase.auth().signInWithPopup(provider);

      if (!result || !result.credential) {
        throw new Error("Could not complete signup");
      }

      const user = result.user;
      const data = {
        firstname: user.displayName,
        lastname: user.displayName,
        email: user.email,
        via: "Google",
        ...form,
      };

      // Create a user in the Users collection
      const ref = projectFirestore.collection("Users").doc(user.uid);
      const doc = await ref.get()
      if (!doc.exists) {
          if (Object.keys(form).length === 1) {
            throw new Error("You are not yet a registered user");
          }
        // Adding properties based on different roles
        if (roles === "customer") {
          // Add a cart prop to customers
          await ref.set({
            ...data,
            cart: [],
          });
        } else if (roles === "restaurant manager") {
          const batch = projectFirestore.batch();
          const userRef = ref;
          const restaurantRef = projectFirestore
            .collection("Restaurants")
            .doc();
          batch.set(userRef, {
            firstname: data.firstname,
            lastname: data.lastname,
            roles: data.roles,
            email: data.email,
            restaurantId: restaurantRef.id,
          });
          batch.set(restaurantRef, {
            name: data.restaurantName,
            description: data.restaurantDescription,
            postCode: data.postCode,
            address: data.restaurantAddress,
            uid: user.uid,
            status: "waiting"
          });
          await batch.commit();
        } else if (roles === "delivery") {
          await ref.set({
            ...data,
            hasOrder: null,
          });
        }
      }
      // dispatch login action
      dispatch({ type: "LOGIN", payload: user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
