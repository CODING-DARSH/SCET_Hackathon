// const API_BASE_URL = "http://localhost:5000";

// /* ================================
//    INITIALIZATION & VISUAL EFFECTS
// ================================ */
// document.addEventListener('DOMContentLoaded', function() {
//     createParticles();
//     createNeuralNetwork();
//     initReflectionPreview();

//     window.addEventListener('scroll', function() {
//         const navbar = document.getElementById('navbar');
//         navbar.classList.toggle('scrolled', window.scrollY > 50);
//     });
// });

// /* ================================
//    PARTICLES
// ================================ */
// function createParticles() {
//     const container = document.getElementById('particles');
//     for (let i = 0; i < 80; i++) {
//         const p = document.createElement('div');
//         p.className = 'particle';
//         p.style.left = Math.random() * 100 + 'vw';
//         p.style.top = Math.random() * 100 + 'vh';
//         p.style.width = p.style.height = Math.random() * 3 + 1 + 'px';
//         container.appendChild(p);
//     }
// }

// /* ================================
//    NEURAL NETWORK
// ================================ */
// function createNeuralNetwork() {
//     const container = document.getElementById('neuralNetwork');
//     const nodes = [];

//     for (let i = 0; i < 15; i++) {
//         const n = document.createElement('div');
//         n.className = 'node';

//         const angle = (i / 15) * Math.PI * 2;
//         const r = 200;
//         const x = r * Math.cos(angle);
//         const y = r * Math.sin(angle);

//         n.style.left = `calc(50% + ${x}px)`;
//         n.style.top = `calc(50% + ${y}px)`;

//         container.appendChild(n);
//         nodes.push({ x, y });
//     }

//     nodes.forEach((a, i) => {
//         nodes.slice(i + 1).forEach(b => {
//             if (Math.random() > 0.7) {
//                 const c = document.createElement('div');
//                 c.className = 'connection';
//                 const dx = b.x - a.x;
//                 const dy = b.y - a.y;
//                 c.style.width = Math.hypot(dx, dy) + 'px';
//                 c.style.left = `calc(50% + ${a.x}px)`;
//                 c.style.top = `calc(50% + ${a.y}px)`;
//                 c.style.transform = `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`;
//                 container.appendChild(c);
//             }
//         });
//     });
// }

// /* ================================
//    REFLECTION PREVIEW
// ================================ */
// function initReflectionPreview() {
//     const i = document.getElementById('previewInput');
//     const r = document.getElementById('previewResponse');
//     if (!i || !r) return;

//     i.addEventListener('input', () => {
//         const v = i.value.trim();
//         r.textContent = !v ? '' :
//             v.length < 10 ? "Would you like to share more?" :
//             v.length < 30 ? "This seems important." :
//             "The AI therapist can help you explore this further.";
//         r.classList.toggle('active', !!v);
//     });
// }

// /* ================================
//    LOGIN POPUP
// ================================ */
// function openLogin() {
//     document.getElementById('loginPopup').style.display = 'flex';
//     showLogin();
// }
// function closeLogin() {
//     document.getElementById('loginPopup').style.display = 'none';
//     resetForms();
// }
// function showLogin() { toggleView('loginForm'); }
// function showSignup() { toggleView('signupForm'); }
// function showEmailPassLogin() { toggleView('emailPassForm'); }
// function showOtpLogin() { toggleView('otpForm'); }

// function toggleView(id) {
//     ['loginForm','signupForm','emailPassForm','otpForm'].forEach(v => {
//         document.getElementById(v).style.display = v === id ? 'block' : 'none';
//     });
// }

// /* ================================
//    RESET
// ================================ */
// function resetForms() {
//     document.querySelectorAll('input').forEach(i => i.value = '');
// }

// /* ================================
//    SAFE JSON PARSE (NEW)
// ================================ */
// async function safeJsonParse(res) {
//     const text = await res.text();
//     try {
//         return JSON.parse(text);
//     } catch {
//         throw new Error("Backend returned non-JSON response");
//     }
// }

// /* ================================
//    REGISTER
// ================================ */

// async function submitSignup() {
//     const full_name = document.getElementById("name").value.trim();
//     const emailVal = document.getElementById("email").value.trim();
//     const mobile_no = document.getElementById("mobile").value.trim();
//     const passwordVal = document.getElementById("password").value.trim();

//     if (!full_name || !emailVal || !mobile_no || !passwordVal) {
//         showNotification("Please fill all fields!", "error");
//         return;
//     }

//     try {
//         const res = await fetch(`${API_BASE_URL}/auth/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 full_name,
//                 email: emailVal,
//                 mobile_no,
//                 password: passwordVal
//             })
//         });

//         const text = await res.text();
//         const data = JSON.parse(text);

//         if (!res.ok) throw new Error(data.message);

//         showNotification(data.message, "success");

//         // Move to OTP verify screen
//         showOtpLogin();
//         document.getElementById("otpEmail").value = emailVal;

//         // Change OTP button behavior for register
//         document.querySelector("#otpForm .btn-primary").onclick = verifyRegisterOtp;

//     } catch (err) {
//         showNotification(err.message || "Registration failed", "error");
//     }
// }


// function showOtpVerifyForRegister(emailVal) {
//     showOtpLogin();
//     otpEmail.value = emailVal;
//     document.querySelector("#otpForm .btn-primary").onclick = verifyRegisterOtp;
// }

// async function verifyRegisterOtp() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/auth/verify-register-otp`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: otpEmail.value, otp: otpCode.value })
//         });

//         const data = await safeJsonParse(res);
//         if (!res.ok) throw new Error(data.message);

//         showNotification("Registration successful", "success");
//         showLogin();

//     } catch (e) {
//         showNotification(e.message, "error");
//     }
// }

// /* ================================
//    LOGIN PASSWORD
// ================================ */
// // async function submitEmailPass() {
// //     const email = document.getElementById("loginEmail").value.trim();
// //     const password = document.getElementById("loginPassword").value.trim();

// //     if (!email || !password) {
// //         showNotification("Please enter email and password!", "error");
// //         return;
// //     }

// //     try {
// //         const res = await fetch(`${API_BASE_URL}/auth/login-password`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ email, password })
// //         });

// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.message);

// //         // save user id or token
// //         localStorage.setItem("user_id", data.user_id);
// //         localStorage.setItem("user_name", data.full_name); 
// //         localStorage.setItem("user_email", email);

// //         showNotification("Login successful!", "success");

// //         closeLogin();
// //         window.location.href = "chat.html";

// //     } catch (err) {
// //         showNotification(err.message || "Login failed", "error");
// //     }
// // }

// async function submitEmailPass() {
//     const email = document.getElementById("loginEmail").value.trim();
//     const password = document.getElementById("loginPassword").value.trim();

//     if (!email || !password) {
//         showNotification("Please enter email and password!", "error");
//         return;
//     }

//     try {
//         const res = await fetch(`${API_BASE_URL}/auth/login-password`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);

//         // ✅ STORE REAL USER DATA
//         localStorage.setItem("user_id", data.user_id);
//         localStorage.setItem("user_name", data.full_name);
//         localStorage.setItem("user_email", email);

//         showNotification("Login successful!", "success");

//         closeLogin();
//         window.location.href = "chat.html";

//     } catch (err) {
//         showNotification(err.message || "Login failed", "error");
//     }
// }



// /* ================================
//    LOGIN OTP
// ================================ */
// async function sendOtp() {
//     const email = otpEmail.value.trim();
//     if (!email) {
//         showNotification("Enter email first", "error");
//         return;
//     }

//     try {
//         const res = await fetch(`${API_BASE_URL}/auth/login-otp`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email })
//         });

//         const data = await safeJsonParse(res);
//         if (!res.ok) throw new Error(data.message);

//         // ✅ ONLY store email
//         localStorage.setItem("user_email", email);

//         showNotification("OTP sent to email", "success");

//     } catch (e) {
//         showNotification(e.message, "error");
//     }
// }

// // async function submitOtp() {
// //     try {
// //         const res = await fetch(`${API_BASE_URL}/auth/verify-login-otp`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ email: otpEmail.value.trim(), otp: otpCode.value.trim() })
// //         });

// //         const data = await safeJsonParse(res);
// //         if (!res.ok) throw new Error(data.message);

// //         localStorage.setItem("user_id", data.user_id);
// //         localStorage.setItem("user_name", data.full_name); 
// //         localStorage.setItem("user_email", email);

// //         closeLogin();
// //         window.location.href = "chat.html";

// //     } catch (e) {
// //         showNotification(e.message, "error");
// //     }
// // }
// async function submitOtp() {
//     const email = otpEmail.value.trim();
//     const otp = otpCode.value.trim();

//     if (!email || !otp) {
//         showNotification("Enter email and OTP", "error");
//         return;
//     }

//     try {
//         const res = await fetch(`${API_BASE_URL}/auth/verify-login-otp`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, otp })
//         });

//         const data = await safeJsonParse(res);
//         if (!res.ok) throw new Error(data.message);

//         // ✅ STORE REAL USER DATA
//         localStorage.setItem("user_id", data.user_id);
//         localStorage.setItem("user_name", data.full_name);
//         localStorage.setItem("user_email", email);

//         closeLogin();
//         window.location.href = "chat.html";

//     } catch (e) {
//         showNotification(e.message, "error");
//     }
// }

// /* ================================
//    NOTIFICATION
// ================================ */
// function showNotification(msg) {
//     alert(msg);
// }
// // function showNotification(message, type = "error") {
// //     const box = document.getElementById("notification");
// //     if (!box) return;

// //     box.textContent = message;
// //     box.classList.remove("success", "error");
// //     box.classList.add(type, "show");

// //     setTimeout(() => {
// //         box.classList.remove("show");
// //     }, 3000);
// // }


const API_BASE_URL = "http://localhost:5000";

/* ================================
   INITIALIZATION & VISUAL EFFECTS
================================ */
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    createNeuralNetwork();
    initReflectionPreview();

    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
});

/* ================================
   PARTICLES
================================ */
function createParticles() {
    const container = document.getElementById("particles");
    for (let i = 0; i < 80; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.width = p.style.height = Math.random() * 3 + 1 + "px";
        container.appendChild(p);
    }
}

/* ================================
   NEURAL NETWORK
================================ */
function createNeuralNetwork() {
    const container = document.getElementById("neuralNetwork");
    const nodes = [];

    for (let i = 0; i < 15; i++) {
        const n = document.createElement("div");
        n.className = "node";

        const angle = (i / 15) * Math.PI * 2;
        const r = 200;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);

        n.style.left = `calc(50% + ${x}px)`;
        n.style.top = `calc(50% + ${y}px)`;

        container.appendChild(n);
        nodes.push({ x, y });
    }

    nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
            if (Math.random() > 0.7) {
                const c = document.createElement("div");
                c.className = "connection";
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                c.style.width = Math.hypot(dx, dy) + "px";
                c.style.left = `calc(50% + ${a.x}px)`;
                c.style.top = `calc(50% + ${a.y}px)`;
                c.style.transform = `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`;
                container.appendChild(c);
            }
        });
    });
}

/* ================================
   REFLECTION PREVIEW
================================ */
function initReflectionPreview() {
    const input = document.getElementById("previewInput");
    const response = document.getElementById("previewResponse");
    if (!input || !response) return;

    input.addEventListener("input", () => {
        const v = input.value.trim();
        response.textContent = !v
            ? ""
            : v.length < 10
            ? "Would you like to share more?"
            : v.length < 30
            ? "This seems important."
            : "The AI therapist can help you explore this further.";
        response.classList.toggle("active", !!v);
    });
}

/* ================================
   LOGIN POPUP
================================ */
function openLogin() {
    document.getElementById("loginPopup").style.display = "flex";
    showLogin();
}
function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
    resetForms();
}
function showLogin() { toggleView("loginForm"); }
function showSignup() { toggleView("signupForm"); }
function showEmailPassLogin() { toggleView("emailPassForm"); }
function showOtpLogin() { toggleView("otpForm"); }

function toggleView(id) {
    ["loginForm", "signupForm", "emailPassForm", "otpForm"].forEach(v => {
        document.getElementById(v).style.display = v === id ? "block" : "none";
    });
}

/* ================================
   RESET
================================ */
function resetForms() {
    document.querySelectorAll("input").forEach(i => (i.value = ""));
}

/* ================================
   SAFE JSON PARSE
================================ */
async function safeJsonParse(res) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error("Server error. Please try again.");
    }
}

/* ================================
   REGISTER
================================ */
async function submitSignup() {
    const full_name = document.getElementById("name").value.trim();
    const emailVal = document.getElementById("email").value.trim();
    const mobile_no = document.getElementById("mobile").value.trim();
    const passwordVal = document.getElementById("password").value.trim();

    if (!full_name || !emailVal || !mobile_no || !passwordVal) {
        showNotification("Please fill all fields!", "error");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name,
                email: emailVal,
                mobile_no,
                password: passwordVal
            })
        });

        const data = await safeJsonParse(res);
        if (!res.ok) throw new Error(data.message);

        showNotification(
            "We’ve sent a verification code to your email. Please check your inbox.",
            "success"
        );

        // Move to OTP verification
        showOtpLogin();
        document.getElementById("otpEmail").value = emailVal;

        // Switch OTP button to REGISTER verification
        document.querySelector("#otpForm .btn-primary").onclick = verifyRegisterOtp;

    } catch (err) {
        showNotification(err.message || "Registration failed", "error");
    }
}


async function verifyRegisterOtp() {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/verify-register-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: otpEmail.value.trim(),
                otp: otpCode.value.trim()
            })
        });

        const data = await safeJsonParse(res);
        if (!res.ok) throw new Error(data.message);

        showNotification(
            "Your account is verified. A welcome message is waiting for you in your email 🌱",
            "success"
        );

        showLogin();

    } catch (e) {
        showNotification(e.message, "error");
    }
}

/* ================================
   LOGIN WITH PASSWORD
================================ */
async function submitEmailPass() {
    const emailVal = loginEmail.value.trim();
    const passwordVal = loginPassword.value.trim();

    if (!emailVal || !passwordVal) {
        showNotification("Please enter email and password!", "error");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/login-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailVal, password: passwordVal })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem(
            "user_name",
            data.full_name || emailVal.split("@")[0]
        );
        localStorage.setItem("user_email", emailVal);

        showNotification("Login successful!", "success");
        closeLogin();
        window.location.href = "chat.html";

    } catch (err) {
        showNotification(err.message || "Login failed", "error");
    }
}

/* ================================
   LOGIN WITH OTP
================================ */
async function sendOtp() {
    const emailVal = otpEmail.value.trim();
    if (!emailVal) {
        showNotification("Enter email first", "error");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/login-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailVal })
        });

        const data = await safeJsonParse(res);
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("user_email", emailVal);

        showNotification(
            "We’ve sent a verification code to your email. Please check your inbox.",
            "success"
        );

    } catch (e) {
        showNotification(e.message, "error");
    }
}

async function submitOtp() {
    const emailVal = otpEmail.value.trim();
    const otpVal = otpCode.value.trim();

    if (!emailVal || !otpVal) {
        showNotification("Enter email and OTP", "error");
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/verify-login-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailVal, otp: otpVal })
        });

        const data = await safeJsonParse(res);
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem(
            "user_name",
            data.full_name || emailVal.split("@")[0]
        );
        localStorage.setItem("user_email", emailVal);

        closeLogin();
        window.location.href = "chat.html";

    } catch (e) {
        showNotification(e.message, "error");
    }
}

/* ================================
   NOTIFICATION (TEMP SIMPLE)
================================ */
function showNotification(msg) {
    alert(msg);
}
