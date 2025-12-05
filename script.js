 /*DELAYING MENU BOUNCE ANIMATION*/
/*window.addEventListener("load", () => {
    document.getElementById("nav-btn").classList.add("animate");
});*/

/* CTA TEL SCROLL */
const ctaTel = document.getElementById('cta-tel');
const ctaTelBtn = document.getElementById('cta-tel-btn')

window.addEventListener('scroll', () => {
  if(window.scrollY > 800) {
    ctaTel.classList.add('scrolled');
}
  else {
    ctaTel.classList.remove('scrolled');
  }});
    
  ctaTelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ctaTel.classList.toggle('open')
  });

  document.addEventListener('click', (e) => {
    if(!ctaTel.contains(e.target)){
      ctaTel.classList.remove('open');
    }
  });
 
 
  

 
 /* HEADER STICKY */
const header = document.querySelector('.primary-nav-header');
let scrollTimeout;
let lastScrollY = window.scrollY;
let isHovering = false;
let suppressScrollShow = false;

// Track hover state (prevents hiding)
header.addEventListener('mouseenter', () => {
  isHovering = true;
  clearTimeout(scrollTimeout);
});

header.addEventListener('mouseleave', () => {
  isHovering = false;
});

// Scroll logic
window.addEventListener('scroll', () => {
  if (suppressScrollShow) return;  // ← prevents header from re-showing

  const currentY = window.scrollY;

  // If scrolling UP → show header
  if (currentY < lastScrollY) {
    header.classList.add('scrolled');
  }

  // If scrolling DOWN → show but allow hide-on-stop
  if (currentY > lastScrollY) {
    header.classList.add('scrolled');
  }

  if (window.scrollY === 0) {
    header.classList.remove('scrolled');
  }

  lastScrollY = currentY;

  clearTimeout(scrollTimeout);

  // Hide after 3s if user stops scrolling AND not hovering
  scrollTimeout = setTimeout(() => {
    if (!isHovering && currentY > 0) {
      header.classList.remove('scrolled');
    }
  }, 3000);
});


// Instantly hide header on nav-link click
document.querySelectorAll('.nav-link').forEach(navLink => {
  navLink.addEventListener('click', () => {
    suppressScrollShow = true;            // block scroll logic
    clearTimeout(scrollTimeout);

    header.classList.remove('scrolled');  // instantly hide

    // Release lock after enough time for scroll jump to finish
    setTimeout(() => {
      suppressScrollShow = false;
    }, 1500); // you can adjust this if needed
  });
});


/* disappears when user stops scrolling and starts when they start scrolling again */


 /* HERO */
const navBtn = document.getElementById('nav-btn');
const navcloseBtn = document.getElementById('nav-close-btn');
const navFlexContainer = document.getElementById('nav-flex-container');
const navLinkPressClose = document.querySelectorAll('.primary-nav-links li a');


// Toggle menu when clicking the button
navBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent click from reaching document
  navFlexContainer.classList.toggle('open');
});
 navcloseBtn.addEventListener('click', () =>{
    navFlexContainer.classList.remove('open');
  });
// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const clickedOutside =
    !navFlexContainer.contains(e.target) &&
    !navBtn.contains(e.target) && !navLinkPressClose.contains(e.target);


  if (clickedOutside) {
    navFlexContainer.classList.remove('open');
  }
});
 
navLinkPressClose.forEach(link => {
  link.addEventListener('click', () => {
    navFlexContainer.classList.remove('open');
    
  })
})


/*const servicesTrack = document.querySelector('.services-flex-container');
const servicesSlide = document.querySelectorAll('.servicesSlide');
const prevServiceBtn = document.querySelector('.prevServiceBtn');
const nextServiceBtn = document.querySelector('.nextServiceBtn');

let currentservicesSlide = 0;

function updateSlider() {
    const offset = currentservicesSlide * -100;
    servicesTrack.style.transform = `translateX(${offset}%)`;
}

nextServiceBtn.addEventListener('click', () => {
    currentservicesSlide = (currentservicesSlide + 1) % servicesSlide.length;
    updateSlider();
});

prevServiceBtn.addEventListener('click', () => {
    currentservicesSlide = (currentservicesSlide - 1 + servicesSlide.length) % servicesSlide.length;
    updateSlider();
});*/

 /* SERVICES */


/* TESTIMONIALS */
const track = document.querySelector('.testimonial-track');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));

const prevBtn = document.querySelector('.prevTestimonial');
const nextBtn = document.querySelector('.nextTestimonial');
const dotsContainer = document.querySelector('.testimonial-alt-btn-flex-container');

function itemsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function getGroupsCount() {
    return Math.ceil(testimonials.length / itemsPerView());
}

function getItemWidth() {
    const first = document.querySelector('.testimonial');
    return first ? first.offsetWidth : 0;
}

function createDots() {
    dotsContainer.innerHTML = "";
    const groups = getGroupsCount();
    
    for (let i = 0; i < groups; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-alt-btn');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => scrollToGroup(i));

        dotsContainer.appendChild(dot);
    }
}

function scrollToGroup(groupIndex) {
    const width = getItemWidth();
    const perView = itemsPerView();
    const target = width * perView * groupIndex;

    track.scrollTo({
        left: target,
        behavior: 'smooth'
    });
}

function updateDots() {
    const width = getItemWidth();
    const perView = itemsPerView();

    const groupIndex = Math.round(track.scrollLeft / (width * perView));

    const dots = document.querySelectorAll('.testimonial-alt-btn');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[groupIndex]) dots[groupIndex].classList.add('active');
}

function goNext() {
    const perView = itemsPerView();
    const width = getItemWidth();
    track.scrollBy({ left: width * perView, behavior: 'smooth' });
}

function goPrev() {
    const perView = itemsPerView();
    const width = getItemWidth();
    track.scrollBy({ left: -width * perView, behavior: 'smooth' });
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

// Update dots when user swipes / scrolls
track.addEventListener('scroll', () => {
    clearTimeout(track._scrollEndTimer);
    track._scrollEndTimer = setTimeout(updateDots, 100);
});

window.addEventListener('resize', () => {
    createDots();
    updateDots();
});

// Initialize everything
createDots();
  // Optional: auto-slide every 5 seconds
  
 


  /* CTA FORM */
 // Array of data
  const services = ["Broken taps", "Leaky pipes", "Installing toilets", "Installing shower pumps", "Fixing sinks", "Unblocking drains"];

  // Get the <select> element
  const select = document.getElementById("slct-service");

  // Loop through the array and create <option> tags
  services.forEach(service => {
    const option = document.createElement("option"); // create <option>
    option.value = service.toLowerCase();              // set the value
    option.textContent = service;                      // set visible text
    select.appendChild(option);                      // add to <select>
  });


  


/* REMOVE BTN HOVER EFFECT MOBILE */
const btnHoverRemove = document.querySelectorAll('.btn-arrow')
const mediaQuery = window.matchMedia("(max-width: 1200px)");

function handleScreenChange(e) {
  if (e.matches) {
    // Screen is 1200px or smaller
    btnArrowRemove.remove('btn-arrow')
  } else {
    // Screen is larger than 1200px
    btnArrowRemove.add('btn-arrow')
  }
}

mediaQuery.addEventListener("change", handleScreenChange);

// Run on load as well
handleScreenChange(mediaQuery);




