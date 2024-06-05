// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcN8xw_QZhS-sG7NAiX8CqAOXMvpSOPWg",
  authDomain: "simple-chat-42d49.firebaseapp.com",
  projectId: "simple-chat-42d49",
  storageBucket: "simple-chat-42d49.appspot.com",
  messagingSenderId: "53453395514",
  appId: "1:53453395514:web:f9512d24ec23e4d2e38703",
  measurementId: "G-95HRVRVL6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Functions
const auth = getAuth(app);
const functions = getFunctions(app);

// Google Login
document.getElementById('login-google').addEventListener('click', () => {
  console.log('Login button clicked');
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      console.log('User signed in:', result.user.email);
      sendEmailNotification(result.user.email);
    })
    .catch(error => {
      console.error('Error signing in:', error);
    });
});

// Send email notification to the site owner
function sendEmailNotification(email) {
  console.log('Sending email notification for:', email);
  const sendEmail = httpsCallable(functions, 'sendEmail');
  sendEmail({ email: email })
    .then(result => console.log('Email sent:', result))
    .catch(error => {
      console.error('Error sending email:', error);
    });
}
