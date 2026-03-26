// ================== AUTH CHECK ==================
if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}

// ================== STORAGE ==================
let fuelPrices = JSON.parse(localStorage.getItem("fuelPrices")) || {};

// ================== WELCOME ==================
const storedUser = JSON.parse(localStorage.getItem("fuelUser"));
const welcome = document.getElementById("welcomeMessage");

if (welcome){
    if (storedUser && storedUser.name) {
        let name = storedUser.name;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        welcome.innerHTML = `Hello <span class="user-name" style="color:#3b82f6">${name}</span>, 👋 welcome to FuelRadar`;
    } else {
        welcome.innerText = "Welcome to FuelRadar";
    }
}

// ================== SIDEBAR ==================
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if(menuBtn && sidebar && overlay){
    menuBtn.addEventListener("click",(e)=>{
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
        e.stopPropagation();
    });

    overlay.addEventListener("click",()=>{
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    document.querySelectorAll(".sidebar a").forEach(link=>{
        link.addEventListener("click",()=>{
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    });
}

// ================== MAP ==================
let map = L.map('map').setView([4.8156,7.0498],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap'
}).addTo(map);

// ================== SELECT STATION ==================
function selectStation(name){
    document.getElementById("stationName").value = name;
    window.scrollTo({
        top: document.querySelector(".submit-section").offsetTop,
        behavior: "smooth"
    });
}

// ================== MARKER COLOR ==================
function getMarkerColor(price){
    if(price === undefined) return "gray";
    if(price <= 620) return "green";
    if(price <= 640) return "orange";
    return "red";
}

// ================== LOCATION + FETCH ==================
navigator.geolocation.getCurrentPosition(position =>{
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    map.setView([lat,lng],14);

    L.marker([lat,lng]).addTo(map)
        .bindPopup("You are here")
        .openPopup();

    const query = `
    [out:json];
    (
        node["amenity"="fuel"](around:5000,${lat},${lng});
    );
    out;
    `;

    fetch("https://overpass-api.de/api/interpreter",{
        method:"POST",
        body:query
    })
    .then(res=>res.json())
    .then(data=>{
        let count = 0;

        data.elements.forEach(station=>{
            let stationName = station.tags.name || "Fuel Station";
            let price = fuelPrices[stationName];
            let displayPrice = price ? `₦${price}/L` : "Price not submitted";

            let color = getMarkerColor(price);

            let marker = L.circleMarker([station.lat, station.lon], {
                radius: 8,
                color: color,
                fillColor: color,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`
                <b>${stationName}</b><br>
                Price: ${displayPrice}<br><br>
                <button onclick="selectStation('${stationName}')">
                Submit Price
                </button>
            `);

            count++;
        });

        document.getElementById("stationCount").innerText = count;
    });
});

// ================== SUBMIT PRICE ==================
const priceForm = document.getElementById("priceForm");

if(priceForm){
    priceForm.addEventListener("submit",function(e){
        e.preventDefault();

        let name = document.getElementById("stationName").value;
        let price = Number(document.getElementById("fuelPrice").value);

        fuelPrices[name] = price;
        localStorage.setItem("fuelPrices",JSON.stringify(fuelPrices));

        showToast("✅ Price submitted successfully!", () => {
            location.reload();
        });
    });
}

// ================== LOGOUT ==================
const logoutBtn = document.querySelector(".logout");

if(logoutBtn){
    logoutBtn.addEventListener("click",()=>{
        localStorage.removeItem("fuelUser");
        localStorage.removeItem("loggedIn");
        window.location.href="login.html";
    });
}

// ================== MODAL ==================
const clearBtn = document.getElementById("clearPricesBtn");
const modal = document.getElementById("clearModal");
const confirmClear = document.getElementById("confirmClear");
const cancelClear = document.getElementById("cancelClear");

if(clearBtn && modal){

    clearBtn.addEventListener("click", ()=>{
        modal.classList.add("show");
    });

    cancelClear.addEventListener("click", ()=>{
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e)=>{
        if(e.target === modal){
            modal.classList.remove("show");
        }
    });

    confirmClear.addEventListener("click", ()=>{
        localStorage.removeItem("fuelPrices");
        modal.classList.remove("show");

        showToast("🎉 All fuel prices cleared!", ()=>{
            location.reload();
        });
    });
}

// ================== TOAST ==================
function showToast(message, callback){
    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        if(callback) callback();
    }, 3000);
}