const container = document.getElementById('container');

// Botones del Overlay
const signUpOverlayBtn = document.getElementById('signUpOverlay');
const signInOverlayBtn = document.getElementById('signInOverlay');

// Links de texto
const signUpLink = document.getElementById('signUpLink');
const signInLink = document.getElementById('signInLink');

// Formularios
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// Funciones para overlay (desktop y tablet)
const toggleToSignUp = (e) => {
    e.preventDefault();
    if (window.innerWidth > 768) {
        container.classList.add("right-panel-active");
    } else {
        showForm("signup");
    }
};

const toggleToSignIn = (e) => {
    e.preventDefault();
    if (window.innerWidth > 768) {
        container.classList.remove("right-panel-active");
    } else {
        showForm("signin");
    }
};

// Listeners para los botones del overlay
if (signUpOverlayBtn && signInOverlayBtn) {
    signUpOverlayBtn.addEventListener('click', toggleToSignUp);
    signInOverlayBtn.addEventListener('click', toggleToSignIn);
}

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

// =======================
//  Responsive en móvil
// =======================

// Función para alternar formularios en móvil
function showForm(formToShow) {
    if (window.innerWidth <= 768) {
        const signInContainer = document.querySelector(".sign-in-container");
        const signUpContainer = document.querySelector(".sign-up-container");

        if (formToShow === "signin") {
            signInContainer.classList.remove("hidden");
            signUpContainer.classList.add("hidden");
        } else {
            signUpContainer.classList.remove("hidden");
            signInContainer.classList.add("hidden");
        }
    }
}

// Al cargar, mostrar solo Sign In en móvil
window.addEventListener("load", () => {
    if (window.innerWidth <= 768) {
        showForm("signin");
    }
});

// Si cambia el tamaño de pantalla
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        // Restaurar overlay normal
        const signInContainer = document.querySelector(".sign-in-container");
        const signUpContainer = document.querySelector(".sign-up-container");
        signInContainer.classList.remove("hidden");
        signUpContainer.classList.remove("hidden");
    } else {
        showForm("signin");
    }
});

//=================================================================
// ================Importar auth desde conection.js================
//=================================================================

import { auth, db } from "../js/Authentication/conection.js";
import {
    GoogleAuthProvider, 
    GithubAuthProvider, 
    OAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// ================== LOGIN EMAIL/PASSWORD ==================
// --- Sign Up ---
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        // Crear cuenta en Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Guardar en Firestore (opcional)
        await db.collection("users").doc(user.uid).set({
            email: email,
            createdAt: new Date()
        });

        console.log("User registered:", user.uid);
        alert("Account created successfully 🚀");

    } catch (error) {
        console.error("Sign Up error:", error.message);
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
        console.log("Signed in:", userCredential.user.uid);

        alert("Welcome back!");

        // Redirigir al dashboard del usuario
        window.location.href = "user.html";

    } catch (error) {
        console.error("Sign In error:", error.message);
        alert("Sign In failed: " + error.message);
    }
});

// ================== LOGIN SOCIAL ==================

// Google
const googleBtn = document.getElementById("googleBtn"); // Corregir el ID si es necesario
if (googleBtn) {
    googleBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider); // Sintaxis correcta
            console.log("Google user:", result.user);
            alert("Welcome with Google 👋");
            window.location.href = "user.html";
        } catch (error) {
            console.error("Google login error:", error.message);
            alert(error.message);
        }
    });
}

// GitHub
const githubBtn = document.getElementById('githubBtn');

githubBtn.addEventListener('click', async () => {
    const provider = new GithubAuthProvider();
    // And call the function with the 'auth' object
    const result = await signInWithPopup(auth, provider);

    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        console.log("GitHub login:", user.uid, user.email);
        alert("¡Bienvenido con GitHub!");
        window.location.href = "user.html";
    } catch (error) {
        // Manejamos el error específico 'popup-closed-by-user'
        if (error.code === 'auth/popup-closed-by-user') {
            console.warn("El usuario cerró la ventana de inicio de sesión.");
            // No mostramos una alerta al usuario.
        } else {
            // Manejamos otros errores de autenticación
            console.error("Error en GitHub login:", error);
            alert("El inicio de sesión con GitHub falló: " + error.message);
        }
    }
});

// Microsoft
const microsoftBtn = document.getElementById("microsoftBtn"); // Corregir el ID
if (microsoftBtn) {
    microsoftBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const provider = new OAuthProvider("microsoft.com"); // Sintaxis correcta
        try {
            const result = await signInWithPopup(auth, provider); // Sintaxis correcta
            console.log("Microsoft user:", result.user);
            alert("Welcome with Microsoft");
            window.location.href = "user.html";
        } catch (error) {
            console.error("Microsoft login error:", error.message);
            alert(error.message);
        }
    });
}