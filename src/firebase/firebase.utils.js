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
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;