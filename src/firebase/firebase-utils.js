import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyA3xmt1lV-qaMvRHVCree6BkIG8vgjixxE",
    authDomain: "crwn-db-36214.firebaseapp.com",
    databaseURL: "https://crwn-db-36214.firebaseio.com",
    projectId: "crwn-db-36214",
    storageBucket: "crwn-db-36214.appspot.com",
    messagingSenderId: "505591613167",
    appId: "1:505591613167:web:0f440d8737d290d13b3d1a",
    measurementId: "G-T7GPZBM8CL" 
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if(!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if(!snapShot.exists) {
       const { displayName, email } = userAuth;
       const createdAt = new Date();

       try {
         await userRef.set({
             dispalyName,
             email,
             createdAt,
             ...additionalData
         })
       } catch (error) {
            console.log('errot creating user', error.message);
       }
   }

   return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 