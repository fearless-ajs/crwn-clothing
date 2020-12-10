import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDVD6KVl9JdS3kZa5I56FCj2TQBCW35QZc",
    authDomain: "crwn-db-b8d2e.firebaseapp.com",
    databaseURL: "https://crwn-db-b8d2e.firebaseio.com",
    projectId: "crwn-db-b8d2e",
    storageBucket: "crwn-db-b8d2e.appspot.com",
    messagingSenderId: "266920382956",
    appId: "1:266920382956:web:35d0f1ddf562dc60a570c9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await userRef.get();

    //If there is no user data in that place
    if(!snapShot.exists){ //if user doesn't exist
        //What are the data we need to use
        const { displayName, email } = userAuth;
        const  createdAt = new Date();

        try {
            await userRef.set({ //this is the create method
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creating using', error.message);
        }
    }

    return userRef; //we will need the user data
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    //for uploading multiple collections
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();

};

export const convertCollectionsSnapShotToMap = ( collections ) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()) ,//The title has to be converted to a valid url
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});


}











firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


