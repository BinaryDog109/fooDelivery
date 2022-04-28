import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

// A general-purpose CRUD hook.
// Usage:
// const {response, addDoc, deleteDoc, updateDoc, getDoc} = useCRUD()
// add/delete/update/getDoc are functions
// The variable "response" is a set of state that represents the result of each CRUD operation
// E.g, response.isPending can show if the add/delete/update/getDoc function is pending
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
    case "UPDATED_DOCUMENT":
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
export const useCRUD = (collection, id, subCollection) => {
  const [response, dispatch] = useReducer(storeReducer, initState);
  const [hasAborted, setHasAborted] = useState(false);
  // collection ref
  let ref = projectFirestore
    .collection(collection)
  if (id && subCollection) {
    ref = ref
    .doc(id)
    .collection(subCollection);
  }  

  const dispatchIfNotAborted = (action) => {
    if (!hasAborted) dispatch(action);
  };


  const addDoc = async (doc) => {
    dispatchIfNotAborted({ type: "PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());      
      const addedDocument = await ref.add({ ...doc, createdAt });
      console.log(addedDocument);
      dispatchIfNotAborted({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatchIfNotAborted({ type: "ERROR", payload: error.message });
    }
  };
  // delete a document
  const deleteDoc = async (id) => {
    dispatch({ type: "PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotAborted({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotAborted({ type: "ERROR", payload: err.message });
    }
  };
  const getDoc = async(id) => {
    dispatch({ type: "PENDING" });
    
    const theDoc = await ref.doc(id).get()
    console.log(theDoc.data())
    try {
      
    } catch (err) {
      dispatchIfNotAborted({ type: "ERROR", payload: err.message });

    }
  }

  const updateDoc = async (id, data) => {
    dispatchIfNotAborted({ type: "PENDING" });
    try {
      const doc = await ref.doc(id).update(data);
      dispatchIfNotAborted({type: "UPDATED_DOCUMENT", payload: doc})
    } catch (error) {
      dispatchIfNotAborted({ type: "ERROR" });
    }
  };
  useEffect(() => {
    return () => setHasAborted(true);
  }, []);
  return { response, addDoc, deleteDoc, updateDoc, getDoc };
};
