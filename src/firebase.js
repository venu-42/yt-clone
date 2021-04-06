import firebase from 'firebase/app'

import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyBC0U1zPxljyMpxw9QG0C09OuddjxKZs",
    authDomain: "yt-clone-309607.firebaseapp.com",
    projectId: "yt-clone-309607",
    storageBucket: "yt-clone-309607.appspot.com",
    messagingSenderId: "26684412135",
    appId: "1:26684412135:web:74e8a0e38911e9ff551242",
    measurementId: "G-9GK1PS9PKQ"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
