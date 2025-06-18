// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWCN4iNgR-mMeCTNEQq4eQxdDll-nkS8A",
  authDomain: "mock-test-website.firebaseapp.com",
  projectId: "mock-test-website",
  storageBucket: "mock-test-website.firebasestorage.app",
  messagingSenderId: "559228941335",
  appId: "1:559228941335:web:704853083da3688c7a9852",
  measurementId: "G-577D5B4NFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);