import {
  VIDEO,
  openVideoTab,
  closeVideoTab,
  findVideos,
  stepForward,
  stepBack,
  closeVideoHover,
} from "./video-section.js";
import { onMouseDown, onMouseUp, onMouseMove, SLIDER } from "./touch-slider.js";
import { showHideCard, forBeginnersCard } from "./show-hide-card.js";
import { cleanForm, FORM } from "./clean-form.js";

VIDEO.videoContent.addEventListener("click", openVideoTab);

VIDEO.videoCloseButton.forEach((item) => {
  item.addEventListener("click", closeVideoTab);
});

findVideos();

VIDEO.buttonNext.addEventListener("click", stepForward);
VIDEO.buttonPrevious.addEventListener("click", stepBack);

VIDEO.videoSliderButtonsWrapper.addEventListener("click", (event) => {
  event.stopPropagation();
});

VIDEO.videoSection.addEventListener("click", closeVideoHover);



//touch slider speakers

const speakerSlider = document.querySelector(".our-speakers__list");
const photoGalleySlider = document.querySelector(".photo-gallery__list");
const descCardSlider = document.querySelector(".our-mission__desc-cards");

document.addEventListener("DOMContentLoaded", () => {
  descCardSlider.scrollLeft = descCardSlider.scrollWidth;
  photoGalleySlider.scrollLeft = photoGalleySlider.scrollWidth;
});

speakerSlider.addEventListener("mousedown", (event) => {
  onMouseDown(event, speakerSlider);
});

speakerSlider.addEventListener("mouseleave", () => {
  SLIDER.isDown = false;
});

speakerSlider.addEventListener("mouseup", () => {
  onMouseUp(speakerSlider);
});

speakerSlider.addEventListener("mousemove", (event) => {
  onMouseMove(event, speakerSlider);
});

// photo gallery slider

photoGalleySlider.addEventListener("mousedown", (event) => {
  onMouseDown(event, photoGalleySlider);
});

photoGalleySlider.addEventListener("mouseleave", () => {
  SLIDER.isDown = false;
});

photoGalleySlider.addEventListener("mouseup", () => {
  onMouseUp(photoGalleySlider);
});

photoGalleySlider.addEventListener("mousemove", (event) => {
  onMouseMove(event, photoGalleySlider);
});

//show and hide speakers cards
forBeginnersCard.addEventListener("click", () => {
  showHideCard(speakerSlider);
});

//speakers timetable

const scheduleEvents = document.querySelectorAll(".schedule__item--speaker");
const tabletWidth = 899;

if (document.documentElement.clientWidth >= tabletWidth) {
  scheduleEvents.forEach((item) => {
    const itemId = item.getAttribute("id");
    const currentSpeaker = document.querySelector(`[data-speaker = ${itemId}]`);

    item.addEventListener("mouseenter", () => {
      currentSpeaker.classList.remove("none");
    });
    item.addEventListener("mouseleave", () => {
      currentSpeaker.classList.add("none");
    });
  });
}

// take part

FORM.takePartForm.addEventListener("submit", (event) => {
  event.preventDefault();
  cleanForm();
});

//scroll show-hide elements
const speakersDescription = document.querySelector(".our-speakers__annotation");
const forWhomDescription = document.querySelector(".for-whom__annotation");

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.remove("scroll-hidden");
      if (!document.querySelector(".for-whom__list.scroll-hidden")) {
        forWhomDescription.classList.add("scroll-hidden");
      }
      if (
        !document.querySelector(".our-speakers__product-cards.scroll-hidden")
      ) {
        speakersDescription.classList.add("scroll-hidden");
      }
    }
  });
}

let options = {
  threshold: [0.5],
};

let observer = new IntersectionObserver(onEntry, {
  rootMargin: "0px",
  threshold: 0.25,
});
let elements = document.querySelectorAll(".scroll-show-cards");

for (let elm of elements) {
  observer.observe(elm);
}

//modal
const MODAL = {
  modalMenu: document.querySelector(".modal-menu"),
  modalButton: document.querySelector(".menu"),
  modalButtonClose: document.querySelector(".button-close-modal"),
  modalLinks: document.querySelectorAll(".modal-menu-link"),
};

MODAL.modalButton.addEventListener("click", () => {
  MODAL.modalMenu.classList.add("modal-menu--active");
});
MODAL.modalButtonClose.addEventListener("click", () => {
  MODAL.modalMenu.classList.remove("modal-menu--active");
});

MODAL.modalLinks.forEach((item) => {
  item.addEventListener("click", () => {
    MODAL.modalMenu.classList.remove("modal-menu--active");
  });
});

// scroll
gsap.registerPlugin(ScrollTrigger);

const desCards = gsap.utils.toArray(
  ".our-mission__desc-cards .description-card"
);

let media = gsap.matchMedia();

media.add("(max-width: 599px)", () => {
  gsap.from(desCards, {
    scrollTrigger: {
      trigger: ".our-mission__desc-cards",
      start: "center center",
      end: ".bottom top",
      scrub: true,
      markers: false,
      pin: true,
      toggleAction: "restart pause reverse pause",
    },
    x: -(descCardSlider.scrollWidth - document.documentElement.clientWidth),
    duration: 50,
  });
});

function scrollCards(direction) {
  gsap.timeline({
    scrollTrigger: {
      trigger:".for-whom__wrapper",
      start: "center center",
      end: "bottom top",
      scrub: true,
      markers: false,
      pin: true, 
    }
  })
  .to(".for-whom .product-card--ant", {...direction, opacity: 0.2, duration:50})
  .to(".for-whom .product-card-alien--pipe", {...direction, opacity: 0.2, duration:50})
  .to(".for-whom .product-card-robo--alien", {...direction, opacity: 0.2, duration:50})
}

if(document.documentElement.clientWidth >=599) {
  scrollCards({x: innerWidth*1})
} else {
  scrollCards({y: innerHeight*1})
}



const photoItems = gsap.utils.toArray(".photo-gallery__item");
gsap.from(photoItems, {
  scrollTrigger: {
    trigger: ".photo-gallery__list",
    start: "center center",
    end: "bottom top",
    scrub: true,
    markers: false,
    pin: true,
    toggleAction: "restart pause reverse pause",
  },
  x: -(photoGalleySlider.scrollWidth - document.documentElement.clientWidth), //scrollLeft
  duration: 5,
});
