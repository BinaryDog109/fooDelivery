import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const storeReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const useFoodAddDeleteUpdate = (collection, id) => {
  const [response, dispatch] = useReducer(storeReducer, initState);
  const [hasAborted, setHasAborted] = useState(false);
  // collection ref
  const ref = projectFirestore.collection(collection);

  const dispatchIfNotAborted = (action) => {
    if (!hasAborted) dispatch(action);
  };

  const addDocumentCollection = (docId, subCollection) => {
    const subRef = ref.doc(docId).collection(subCollection);
    dispatchIfNotAborted({type: "PENDING"})
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await subRef.add({ ...doc, createdAt });
      dispatchIfNotAborted({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatchIfNotAborted({ type: "ERROR" });
    }
  };

  const addDoc = async (doc) => {
    dispatchIfNotAborted({ type: "PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotAborted({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatchIfNotAborted({ type: "ERROR" });
    }
  };
    // delete a document
    const deleteDocument = async (id) => {
      dispatch({ type: 'IS_PENDING' })
  
      try {
        await ref.doc(id).delete()
        dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
      }
      catch (err) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
      }
    }
    // delete a document's subCollection
    const deleteDocumentCollection = async (id, subCollection) => {
      dispatch({ type: 'IS_PENDING' })
      const subRef = ref.doc(id).collection(subCollection)
      try {
        await subRef.doc(id).delete()
        dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
      }
      catch (err) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
      }
    }
  const updateDoc = (payload) => {};
  useEffect(() => {
    return () => setHasAborted(true)
  }, [])
  return  ({ response, addDoc, deleteDoc, updateDoc });
};

