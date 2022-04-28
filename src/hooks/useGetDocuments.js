import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

// Get a collection or a sub-collection in a document
// Usage:
// useGetDocuments("Restaurants")
// useGetDocuments("Restaurants", "<userId>", "Food")
export const useGetDocuments = (collection, id, subCollection, _query) => {
  const [error, setError] = useState(null);
  const [docs, setDocs] = useState(null);
  const query = useRef(_query).current 

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    if (id && subCollection) {
      ref = ref.doc(id).collection(subCollection);
    }
    if (query) {
      ref = ref.where(...query)
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
  }, [collection, id, subCollection, query]);

  return { docs, error };
};
