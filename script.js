const form = document.getElementById("updateForm");
const fuelList = document.getElementById("fuelList");
const topHelpers = document.getElementById("topHelpers");

if(form){

let updates = JSON.parse(localStorage.getItem("fuelUpdates")) || [];
let helpers = JSON.parse(localStorage.getItem("helpers")) || {};

form.addEventListener("submit", function(e){

e.preventDefault();

const station = document.getElementById("station").value;
const location = document.getElementById("location").value;
const fuelType = document.getElementById("fuelType").value;
const price = document.getElementById("price").value;

const update = {
station,
location,
fuelType,
price,
time: new Date().toLocaleTimeString(),
helper:"Anonymous"
};

updates.unshift(update);

helpers["Anonymous"] = (helpers["Anonymous"] || 0) + 1;

localStorage.setItem("fuelUpdates", JSON.stringify(updates));
localStorage.setItem("helpers", JSON.stringify(helpers));

});

}


const reveals = document.querySelectorAll(".reveal");

function revealSections() {

reveals.forEach(section => {

const windowHeight = window.innerHeight;
const revealTop = section.getBoundingClientRect().top;
const revealPoint = 120;

if(revealTop < windowHeight - revealPoint){
section.classList.add("active");
}

});

}

window.addEventListener("scroll", revealSections);

revealSections();

// Conter

const counters = document.querySelectorAll(".counter");
let counted = false; // ensure it runs only once

function animateCounters() {
  const statsSection = document.querySelector(".problem"); // section with stats
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if(sectionTop < windowHeight - 100 && !counted){ 
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText.replace(/,/g, '');
        const increment = target / 120; // speed

        if(current < target){
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 20);
        }else{
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
    counted = true; // prevent running again
  }
}

// Listen for scroll
window.addEventListener("scroll", animateCounters);

// SCROLL PROGRESS BAR
const scrollBar = document.getElementById("scroll-bar");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollBar.style.width = scrollPercent + "%";
});



const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const links = navLinks.querySelectorAll("a");

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Animate links
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
    }
  });
});

// Close menu when clicking a link
links.forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      links.forEach(link => (link.style.animation = ""));
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    links.forEach(link => (link.style.animation = ""));
  }
});


// Accordion + single open behavior
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {

    // Close all other items
    faqItems.forEach(otherItem => {
      if(otherItem !== item) {
        otherItem.querySelector(".faq-question").classList.remove("active");
        otherItem.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    // Toggle current
    question.classList.toggle("active");
    const answer = item.querySelector(".faq-answer");
    if(question.classList.contains("active")){
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

// Reveal on scroll
const faqReveal = document.querySelector(".faq.reveal");

function revealFAQ() {
  const windowHeight = window.innerHeight;
  const revealTop = faqReveal.getBoundingClientRect().top;
  const revealPoint = 120;

  if(revealTop < windowHeight - revealPoint){
    faqReveal.classList.add("active");
  }
}

window.addEventListener("scroll", revealFAQ);
revealFAQ();


const track = document.querySelector(".testimonial-track")
const slides = document.querySelectorAll(".testimonial")
const dotsContainer = document.querySelector(".testimonial-dots")

let index = 0

// create dots
slides.forEach((_,i)=>{
const dot = document.createElement("span")
if(i===0) dot.classList.add("active")

dot.addEventListener("click",()=>{
index = i
updateSlider()
})

dotsContainer.appendChild(dot)
})

const dots = document.querySelectorAll(".testimonial-dots span")

function updateSlider(){
track.style.transform = `translateX(-${index * 100}%)`

dots.forEach(dot=>dot.classList.remove("active"))
dots[index].classList.add("active")
}

// auto slide
setInterval(()=>{
index++

if(index >= slides.length){
index = 0
}

updateSlider()

},3000)


// mobile swipe support

let startX = 0

track.addEventListener("touchstart",(e)=>{
startX = e.touches[0].clientX
})

track.addEventListener("touchend",(e)=>{

let endX = e.changedTouches[0].clientX

if(startX - endX > 50){
index++
}

if(endX - startX > 50){
index--
}

if(index < 0) index = 0
if(index >= slides.length) index = slides.length - 1

updateSlider()

})


const News = document.querySelector("#newsletter-form")
const success = document.getElementById("success-message")

News.addEventListener("submit", function(e){

e.preventDefault()

fetch("https://script.google.com/macros/s/AKfycbxRcqpjyUm-B6WNXF8CXXlsDB-s51u8I4s-DDe7AeI4KYVfuvs8KS4KPgHIOUXjGIXUXA/exec", {
method: "POST",
body: new FormData(News)
})

.then(response => {
success.innerHTML = "✅ Thanks! You'll get fuel alerts soon."
News.reset()
})

.catch(error => {
success.innerHTML = "❌ Something went wrong."
})

})

