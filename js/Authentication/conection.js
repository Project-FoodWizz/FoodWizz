const firebaseConfig = {
    apiKey: "AIzaSyCqmCYVi4l48PyXO3snoztB0AYFCEIUNHY",
    authDomain: "foodwizz-website.firebaseapp.com",
    projectId: "foodwizz-website",
    storageBucket: "foodwizz-website.firebasestorage.app",
    messagingSenderId: "892148786578",
    appId: "1:892148786578:web:8123401168924855538d4b",
    measurementId: "G-CMLKTYCC14"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar auth y firestore
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };