 /*DELAYING MENU BOUNCE ANIMATION*/
/*window.addEventListener("load", () => {
    document.getElementById("nav-btn").classList.add("animate");
});*/



/* HEADER BUG WHERE WHEN YOU OPEN NAV MENU THE HEDARE STILL DISAPPEARS WHEN IT SHOULDNT*/
/* REVAMP HOW HEADER WORKS ENTIRELY AS IT SHOULD STICK WHEN AT TOP*/


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
 /* HERO CALL BUTTON */
 
const callBtn = document.querySelector('.hero-call-btn');
const callSlideInfo = document.querySelector('.hero-call-btn-number-slide');

// Open when hovering button
callBtn.addEventListener('mouseenter', () => {
  callSlideInfo.classList.add('open');
});

// Keep open when hovering slide
callSlideInfo.addEventListener('mouseenter', () => {
  callSlideInfo.classList.add('open');
});

// Close when leaving BOTH elements
function closeIfOutside(e) {
  // If the mouse is not over either element, close
  if (!callBtn.contains(e.relatedTarget) && 
      !callSlideInfo.contains(e.relatedTarget)) {
    callSlideInfo.classList.remove('open');
  }
}
callBtn.addEventListener('mouseleave', closeIfOutside);
callSlideInfo.addEventListener('mouseleave', closeIfOutside);

  
  



  
/* HEADER STICKY */
document.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector('.primary-nav-header');
const navBtn = document.querySelector('.nav-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');
const navFlexContainer = document.querySelector('.nav-flex-container');
const navLinkPressClose = document.querySelectorAll('#primary-nav-links li a');
const pageOverlay = document.querySelector('.page-overlay');

if (!header) return;

let lastScrollY = window.scrollY;
let hideTimer = null;
let isHovering = false;
let isHeaderVisible = true;
let isMenuOpen = false;

// --------------------
// Header visibility
// --------------------

function showHeader() {
if (!isHeaderVisible) {
header.classList.remove('header-hidden');
isHeaderVisible = true;
}
}

function hideHeader() {
if (isHeaderVisible && !isMenuOpen) {
header.classList.add('header-hidden');
isHeaderVisible = false;
}
}

function startHideTimer() {
clearTimeout(hideTimer);

if (isMenuOpen) return;

hideTimer = setTimeout(() => {
  if (!isHovering && !isMenuOpen && window.scrollY > 0) {
    hideHeader();
  }
}, 800);

}

// --------------------
// Hover behavior
// --------------------

header.addEventListener('mouseenter', () => {
isHovering = true;
showHeader();
clearTimeout(hideTimer);
});

header.addEventListener('mouseleave', () => {
isHovering = false;
startHideTimer();
});

// --------------------
// Scroll behavior
// --------------------

window.addEventListener('scroll', () => {
const currentY = window.scrollY;

// Always visible at top
if (currentY === 0) {
  clearTimeout(hideTimer);
  showHeader();
  lastScrollY = 0;
  return;
}

const scrollingDown = currentY > lastScrollY;
const scrollingUp = currentY < lastScrollY;

if (scrollingDown) {
  showHeader();
  startHideTimer();
}

if (scrollingUp && !isHovering && !isMenuOpen) {
  hideHeader();
}

lastScrollY = currentY;

});

// --------------------
// Navigation menu
// --------------------

function updateHeaderShadow() {
header.classList.toggle(
'nav-open',
navFlexContainer.classList.contains('open')
);
}

function openMenu() {
navFlexContainer.classList.add('open');
isMenuOpen = true;
clearTimeout(hideTimer);
showHeader();
updateHeaderShadow();
}

function closeMenu() {
navFlexContainer.classList.remove('open');
isMenuOpen = false;
showHeader();
updateHeaderShadow();
startHideTimer();
}

navBtn?.addEventListener('click', (e) => {
e.stopPropagation();
isMenuOpen ? closeMenu() : openMenu();
});

navCloseBtn?.addEventListener('click', closeMenu);
pageOverlay?.addEventListener('click', closeMenu);

navLinkPressClose.forEach(link => {
link.addEventListener('click', closeMenu);
});

// --------------------
// Initial state
// --------------------

showHeader();
startHideTimer();
});
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


  
/* FAQ HOVER OPEN */
const faqQuestion = document.querySelectorAll('.faq-question');

faqQuestion.forEach(question => {
  question.addEventListener('mouseenter', () => {
    const container = question.closest('.faq-answer-container');
    container.open = true;
  });
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




