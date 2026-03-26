// PASSWORD MATCH INDICATOR

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const error = document.getElementById("password-error");

function checkPassword(){

if(confirmPassword.value === ""){

error.style.display = "none";
return;

}

if(password.value !== confirmPassword.value){

error.style.display = "block";
error.textContent = "Passwords do not match";

}else{

error.style.display = "block";
error.style.color = "green";
error.textContent = "Passwords match";

}

}

password.addEventListener("input", checkPassword);
confirmPassword.addEventListener("input", checkPassword);


// EYE TOGGLE

const toggles = document.querySelectorAll(".toggle-eye");

toggles.forEach(toggle => {

toggle.addEventListener("click", () => {

const target = document.getElementById(toggle.dataset.target);

if(target.type === "password"){

target.type = "text";
toggle.classList.remove("ph-eye");
toggle.classList.add("ph-eye-slash");

}else{

target.type = "password";
toggle.classList.remove("ph-eye-slash");
toggle.classList.add("ph-eye");

}

});

});



const form = document.querySelector("form");

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.querySelector('input[placeholder="Full Name"]').value;
const email = document.querySelector('input[type="email"]').value;
const password = document.getElementById("password").value;

const user = {
name: name,
email: email,
password: password
};

localStorage.setItem("fuelUser", JSON.stringify(user));

alert("Account created successfully!");

window.location.href = "login.html";

});