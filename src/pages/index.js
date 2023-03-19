import './index.css'

// Slider
function getCardWidth() {
  switch (true) {
    case (screen.width > 1280):
      return 380;
    case (screen.width > 768):
      return 260;
    default:
      return 130;
  }
}

const sliderForward = document.querySelector('.slider__button_type_forward');
const sliderBackward = document.querySelector('.slider__button_type_backward');

let cardWidth = getCardWidth();

function next() {
  document.querySelector('.slider__images').scrollLeft += cardWidth;
}

function prev() {
  document.querySelector('.slider__images').scrollLeft -= cardWidth;
}

sliderForward.addEventListener('click', next)
sliderBackward.addEventListener('click', prev)

let startX,
  scrollLeft,
  x,
  distance;

let isDown = false;
const activeClass = 'slider__images_type_active'
const slider = document.querySelector('.slider__images');

const start = (event) => {
  isDown = true;
  slider.classList.add(activeClass);
  startX = event.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

const move = (event) => {
  if (!isDown) return;
  x = event.pageX - slider.offsetLeft;
  distance = (x - startX);
  slider.scrollLeft = scrollLeft - distance;
}

const end = () => {
  isDown = false;
  slider.classList.remove(activeClass);
}

slider.addEventListener('mousedown', start);
slider.addEventListener('mousemove', move);
slider.addEventListener('mouseleave', end);
slider.addEventListener('mouseup', end);


// Toggle Header
const menuButton = document.querySelector('.header__button');
const headerMenu = document.querySelector('.header__links');
const body = document.querySelector('.body')
const expandMenuButtons = document.querySelectorAll('.header__menu-link_type_expandable')

function toggleOverlay() {
  body.classList.toggle('overlay_type_active')
}

// Accordion
const accordionButtons = document.querySelectorAll('.accordion__item-container');

function toggleExpandableItem(event, item, buttonClass, contentClass) {

  const button = item.parentNode.querySelector(`.${buttonClass}`);
  const content = item.parentNode.querySelector(`.${contentClass}`)

  button.classList.toggle(`${buttonClass}_type_active`)
  button.classList.toggle(`${buttonClass}_type_default`)
  content.classList.toggle(`${contentClass}_type_active`)
}

menuButton.addEventListener('click', () => {
  toggleExpandableItem(event, menuButton, 'header__button', 'header__links')
  toggleOverlay();
})

expandMenuButtons.forEach(item => {
  item.addEventListener('click', (event) => {
    if (screen.width <= 830) {
      toggleExpandableItem(event, item, 'header__dropdown-button', 'header__dropdown-container')
    }
  })
})

accordionButtons.forEach((item) => {
  item.addEventListener('click', (event) => toggleExpandableItem(event, item, 'accordion__button', 'accordion__content-container'))
})


