import {firebaseApp} from './firebase';
import firebase from 'firebase';
require('firebase/firestore')

const db = firebase.firestore(firebaseApp);

export const getCollection = async(collection) => {
    const result = { statusR : false, data: null, error: null};
    try {
        const data = await db.collection(collection).get();
        console.log(data);
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
        result.statusR = true;
        result.data = arrayData;
    } catch (error) {
        result.error = error;
    }
    return result;
} 

export const addTaskDB = async(collection,data) => {
    const result = { statusR : false, data: null, error: null};
    try {
        const response = await db.collection(collection).add(data);
        result.data = {id: response.id};
        result.statusR = true;
    } catch (error) {
        result.error= true;
    }
    return result;
}


export const getDocument = async(collection, id) => {
    const result = { statusR : false, data: null, error: null};

    try {
        const response = db.collection(collection).doc(id).get();
        result.data = { id: response.id, name: response.data()}
        result.statusR = true;
    } catch (error) {
        result.error= true;
    }
    return result;
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusR : false, data: null, error: null};

    try {
        await db.collection(collection).doc(id).update(data);
        result.statusR = true;
    } catch (error) {
        result.error= true;
    }
    return result;
}

export const deleteDocument = async(collection, id) => {
    const result = { statusR : false, data: null, error: null};

    try {
        await db.collection(collection).doc(id).delete();
        result.statusR = true;
    } catch (error) {
        result.error= true;
    }
    return result;
}

