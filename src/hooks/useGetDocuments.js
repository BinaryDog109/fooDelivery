import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useGetDocuments = (collection, id, subCollection) => {
  const [error, setError] = useState(null);
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    const ref = projectFirestore.collection("Restaurants");
    if (id && subCollection) {
      ref = ref.doc(id).collection(subCollection);
    }
    const unsub = ref.onSnapshot(
      (snapShot) => {
        let results = [];
        snapShot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocs(results);
        setError(null);
      },
      (err) => setError(err.message)
    );

    return () => unsub();
  }, [collection]);

  return { docs, error };
};
