const API_URL = "https://script.google.com/macros/s/AKfycbw2-LX6E3pyvd1UNUydPtpQ-dkYsUvmN2EFq6ePtrv7RkgwUeq5VyNbMFYuXMNULfoH/exec";

const btn = document.getElementById("submitBtn");
const input = document.getElementById("email");
const msg = document.getElementById("message");
const countEl = document.getElementById("count");

// Countdown
const launchDate = new Date("April 10, 2026").getTime();
setInterval(()=>{
    const now = new Date().getTime();
    const diff = launchDate - now;

    document.getElementById("days").innerText = Math.floor(diff/(1000*60*60*24));
    document.getElementById("hours").innerText = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    document.getElementById("minutes").innerText = Math.floor((diff%(1000*60*60))/(1000*60));
},1000);

// Email validation
function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Confetti
function launchConfetti(){
    for(let i=0;i<80;i++){
        const c = document.createElement("div");
        c.className="confetti";
        c.style.left=Math.random()*100+"vw";
        c.style.background=`hsl(${Math.random()*360},100%,50%)`;
        c.style.animationDuration = (Math.random()*2+2)+"s";
        document.body.appendChild(c);
        setTimeout(()=>c.remove(),3000);
    }
}

// Fetch count
async function getCount(){
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        countEl.innerText = `${data.count} people already joined 🚀`;
    }catch{
        countEl.innerText = "Join the waitlist 🚀";
    }
}
getCount();

// Submit
btn.addEventListener("click", async ()=>{
    const email = input.value.trim();
    msg.innerText="";

    if(!validateEmail(email)){
        msg.style.color="#f87171";
        msg.innerText="Enter a valid email";
        return;
    }

    btn.innerText="Joining...";
    btn.disabled=true;

    try{
        const res = await fetch(API_URL,{
            method:"POST",
            body:JSON.stringify({email})
        });

        const data = await res.json();

        if(data.status==="success"){
            msg.style.color="#3b82f6";
            msg.innerText="You're on the list 🚀";
            launchConfetti();
            input.value="";
            getCount();
        }else if(data.status==="duplicate"){
            msg.style.color="#facc15";
            msg.innerText="You're already on the list 👀";
        }else{
            msg.style.color="#f87171";
            msg.innerText="Unexpected response";
        }

    }catch{
        msg.style.color="#f87171";
        msg.innerText="Error. Try again.";
    }

    btn.innerText="Notify Me";
    btn.disabled=false;
});