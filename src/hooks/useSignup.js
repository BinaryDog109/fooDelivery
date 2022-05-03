import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const signup = async (data, roles) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(data.email, data.password)
      
      if (!res) {
        throw new Error('Could not complete signup')
      }
      const displayName = `${data.firstname} ${data.lastname}` 
      
      // add display name to user
      await res.user.updateProfile({ displayName })
      // Create a user in the Users collection
      const ref = projectFirestore.collection("Users").doc(res.user.uid)

      // Adding properties based on different roles
      if (roles === "customer ") {
        // Add a cart prop to customers
        await ref.set({
          ...data,
          cart: []
        })
      }
      else if (roles === "restaurant manager") {
        const batch = projectFirestore.batch();
        const userRef = ref
        const restaurantRef = projectFirestore.collection("Restaurants").doc()
        batch.set(userRef, {
          firstname: data.firstname,
          lastname: data.lastname,
          roles: data.roles,
          email: data.email,
        })
        batch.set(restaurantRef, {
          name: data.restaurantName,
          description: data.restaurantDescription,
          postCode: data.postCode,
          address: data.restaurantAddress,
          uid: res.user.uid
        })
        await batch.commit()
      }
      else if (roles === "delivery") {
        await ref.set({
          ...data,
          hasRole: null
        })
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}