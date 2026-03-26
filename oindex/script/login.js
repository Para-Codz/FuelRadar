// Redirect logged-in users automatically
if(localStorage.getItem("loggedIn") === "true"){
    window.location.href = "../pages/dashboard.html";
}

const form = document.getElementById("loginForm");

if(form){

form.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        alert("Please enter your email and password.");
        return;
    }

    let storedUser = null;

    try{
        storedUser = JSON.parse(localStorage.getItem("fuelUser"));
    }catch{
        storedUser = null;
    }

    if(!storedUser){
        alert("No account found. Please sign up first.");
        return;
    }

    if(email === storedUser.email && password === storedUser.password){
        alert("Login successful!");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "../pages/dashboard.html";
    }else{
        alert("Invalid email or password");
    }

});

}