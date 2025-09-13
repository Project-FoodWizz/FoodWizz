const container = document.getElementById('container');
    
// Botones del Overlay
const signUpOverlayBtn = document.getElementById('signUpOverlay');
const signInOverlayBtn = document.getElementById('signInOverlay');

// Links de texto
const signUpLink = document.getElementById('signUpLink');
const signInLink = document.getElementById('signInLink');

const toggleToSignUp = (e) => {
    e.preventDefault();
    container.classList.add("right-panel-active");
};

const toggleToSignIn = (e) => {
    e.preventDefault();
    container.classList.remove("right-panel-active");
};

// Listeners para los botones del overlay
signUpOverlayBtn.addEventListener('click', toggleToSignUp);
signInOverlayBtn.addEventListener('click', toggleToSignIn);

// Listeners para los links de texto
signUpLink.addEventListener('click', toggleToSignUp);
signInLink.addEventListener('click', toggleToSignIn);

// Funcionalidad mostrar/ocultar contraseña
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling; // El input justo antes del icono
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        // Cambiar icono
        if (type === 'password') {
            toggle.classList.remove('ri-eye-line');
            toggle.classList.add('ri-eye-off-line');
        } else {
            toggle.classList.remove('ri-eye-off-line');
            toggle.classList.add('ri-eye-line');
        }
    });
});

//=================================================================
// ================Importar auth desde conection.js================
//=================================================================

import { auth, db } from "./Authentication/conection.js";

// Form references
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// --- Sign Up ---
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        // Create account in Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store minimal data in Firestore (optional)
        await db.collection("users").doc(user.uid).set({
            email: email,
            createdAt: new Date()
        });

        console.log("✅ User registered:", user.uid);
        alert("Account created successfully 🚀");

    } catch (error) {
        console.error("❌ Sign Up error:", error.message);
        alert("Sign Up failed: " + error.message);
    }
});

// --- Sign In ---
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("✅ Signed in:", userCredential.user.uid);

        alert("Welcome back 👋");

        // Redirect to user dashboard
        window.location.href = "user.html";

    } catch (error) {
        console.error("❌ Sign In error:", error.message);
        alert("Sign In failed: " + error.message);
    }
});

