

document.addEventListener("DOMContentLoaded", function () {

    console.log("FuelRadar Signup Loaded 🚀");

    // ================= PASSWORD MATCH =================
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const error = document.getElementById("password-error");

    function checkPasswordMatch() {
        if (confirmPassword.value === "") {
            error.style.display = "none";
            return;
        }

        if (password.value !== confirmPassword.value) {
            error.style.display = "block";
            error.style.color = "#ef4444";
            error.textContent = "❌ Passwords do not match";
        } else {
            error.style.display = "block";
            error.style.color = "#10b981";
            error.textContent = "✓ Passwords match";
        }
    }

    password.addEventListener("input", checkPasswordMatch);
    confirmPassword.addEventListener("input", checkPasswordMatch);

    // ================= PASSWORD STRENGTH =================
    const strengthBox = document.getElementById("passwordStrength");
    const strengthFill = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    password.addEventListener("input", function () {
        const value = this.value;

        if (value.length === 0) {
            strengthBox.style.display = "none";
            return;
        }

        strengthBox.style.display = "block";

        let strength = 0;
        if (value.length >= 8) strength++;
        if (/[a-z]/.test(value)) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^a-zA-Z0-9]/.test(value)) strength++;

        if (strength <= 2) {
            strengthFill.style.width = "30%";
            strengthFill.style.background = "#ef4444";
            strengthText.textContent = "⚠️ Weak password";
        } else if (strength <= 4) {
            strengthFill.style.width = "60%";
            strengthFill.style.background = "#f59e0b";
            strengthText.textContent = "✓ Medium strength";
        } else {
            strengthFill.style.width = "100%";
            strengthFill.style.background = "#10b981";
            strengthText.textContent = "✓ Strong password";
        }
    });

    // ================= EYE TOGGLE =================
    const toggles = document.querySelectorAll(".toggle-eye");
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const target = document.getElementById(toggle.dataset.target);
            if (target.type === "password") {
                target.type = "text";
                toggle.classList.replace("ph-eye", "ph-eye-slash");
            } else {
                target.type = "password";
                toggle.classList.replace("ph-eye-slash", "ph-eye");
            }
        });
    });

    

    // ================= FORM SUBMIT =================
    const form = document.getElementById("signupForm");
const pageLoader = document.getElementById("pageLoader");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector(".signup-btn");

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = password.value;
    const confirm = confirmPassword.value;
    const terms = document.getElementById("termsCheckbox");

    // ===== VALIDATIONS =====
    if (name.length < 2) {
        showNotification("❌ Please enter your full name", "error");
        return;
    }

    if (!validateEmail(email)) {
        showNotification("❌ Please enter a valid email", "error");
        return;
    }

    if (pass.length < 8) {
        showNotification("❌ Password must be at least 8 characters", "error");
        return;
    }

    if (pass !== confirm) {
        showNotification("❌ Passwords do not match", "error");
        return;
    }

    if (!terms.checked) {
        showNotification("❌ Accept Terms & Conditions", "error");
        return;
    }

    // ✅ ACTIVATE BUTTON LOADER (CSS CONTROLLED)
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // ✅ SHOW FULLSCREEN LOADER
    pageLoader.classList.add("active");

    // ===== SAVE USER =====
    let users = JSON.parse(localStorage.getItem("fuelUsers")) || [];

    if (users.some(u => u.email === email)) {
        showNotification("❌ Email already registered", "error");

        // ❌ RESET STATE
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        pageLoader.classList.remove("active");

        return;
    }

    function hashPassword(password) {
        return btoa(password);
    }

    const newUser = { name, email, password: hashPassword(pass) };

    users.push(newUser);
    localStorage.setItem("fuelUsers", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("loggedIn", "true");

    setTimeout(() => {
        showNotification("🎉 Account created successfully!", "success");

        // ✅ RESET LOADER STATES
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        pageLoader.classList.remove("active");

        window.location.href = "login.html";
    }, 1500);
});

    // ================= EMAIL VALIDATION =================
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ================= NOTIFICATION =================
    function showNotification(message, type) {
        const existing = document.querySelector(".notification");
        if (existing) existing.remove();

        const note = document.createElement("div");
        note.className = "notification";
        note.textContent = message;

        note.style.position = "fixed";
        note.style.top = "20px";
        note.style.right = "20px";
        note.style.padding = "12px 18px";
        note.style.color = "#fff";
        note.style.borderRadius = "6px";
        note.style.zIndex = "9999";
        note.style.fontWeight = "500";
        note.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
        note.style.background = type === "success" ? "#10b981" : "#ef4444";

        document.body.appendChild(note);

        setTimeout(() => note.remove(), 3000);
    }

    

});

const signin = document.getElementById("btn")