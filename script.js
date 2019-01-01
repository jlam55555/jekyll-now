// lazy-load images backgrounds
let imageSeparators = document.querySelectorAll('.image-separator');
let imageBackgrounds = document.querySelectorAll('[data-src]:not(img)');
Array.from(imageBackgrounds).forEach(imageSeparator => imageSeparator.style.backgroundImage = `url('${imageSeparator.dataset.src}')`);

// lazy load images
let images = document.querySelectorAll('img');
Array.from(images).forEach(image => image.src = image.dataset.src);

// set size of first jumbotron to window height (and resize when window resized)
// resize image separators
let firstJumbotron = document.querySelector('#main-jumbotron');
let oldWidth = 0;
let desktopNavbar = document.querySelector('#nav-bar .desktop');
let resizeHandler = () => {
  let windowWidth, windowHeight;
  if(window.visualViewport) {
    windowWidth = window.visualViewport.width;
    windowHeight = window.visualViewport.height;
  } else {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }
  firstJumbotron.style.height = windowHeight + 'px';
  // prevent constant refreshing on mobile on vertical resize
  if(oldWidth !== windowWidth) {
    oldWidth = windowWidth;
    [].forEach.call(imageSeparators, imageSeparator => {
      imageSeparator.style.height = windowHeight + 'px';
    });
  }
  desktopNavbar.style.height = windowHeight + 'px';
};
resizeHandler();
window.addEventListener('resize', resizeHandler);

// dynamic terminal
let actions = ['brother', 'math', 'run', 'blog', 'code', 'build', 'cube', 'bowl', 'teach', 'learn', 'hack', 'eat', 'sleep', 'design'];
let actionsIndex = Math.floor(Math.random() * actions.length);
let wordIndex = 0;
let increasing = true;
let dynamicTerminal = document.querySelector('#codeVisualText');
let dynamicCursor = document.querySelector('#codeVisualCursor');
let t = setInterval(() => {
  dynamicTerminal.textContent = actions[actionsIndex].slice(0, wordIndex);
  if(increasing) {
    wordIndex++;
    if(wordIndex == actions[actionsIndex].length) {
      dynamicCursor.classList.add('blinking');
    }
    if(wordIndex == actions[actionsIndex].length + 15) {
      increasing = false;
    }
  } else {
    wordIndex--;
    if(wordIndex == actions[actionsIndex].length) {
      dynamicCursor.classList.remove('blinking');
    }
    if(wordIndex == 0) {
      increasing = true;
      actionsIndex = Math.floor(Math.random() * actions.length);
    }
  }
}, 150);

// dropdown button
let dropdownButton = document.querySelector('#dropdown-button');
let dropdown = document.querySelector('#dropdown-nav');
let dropdownAs = document.querySelectorAll('#dropdown-nav > a');
let toggleMenu = () => dropdown.classList.toggle('show');
dropdownButton.addEventListener('click', toggleMenu);
Array.from(dropdownAs).forEach(dropdownA => dropdownA.addEventListener('click', toggleMenu));

let navButtons = Array.from(document.querySelectorAll('#nav-bar .desktop a'));
let elements = [
  document.querySelector('#main-jumbotron'),
  document.querySelector('#about'),
  document.querySelector('#projects'),
  document.querySelector('#technologies'),
  document.querySelector('#contact')
];
let scrollHandler = () => {
  let i;
  for(i = 0; i < elements.length; i++) {
    if(elements[i].getBoundingClientRect().top > 1) {
      break;
    }
  }
  i = i == 0 ? 0 : i-1;
  navButtons[i].classList.add('active');
  navButtons.forEach((button, index) => {
    if(index !== i) button.classList.remove('active');
  });
};
document.addEventListener('scroll', scrollHandler);
scrollHandler();
navButtons.forEach((button, id) => {
  button.addEventListener('click', () => window.scroll({
    top: elements[id].getBoundingClientRect().top + window.scrollY,
    behavior: 'smooth'
  }));
});

// START CAROUSEL BEHAVIOR
// scroll animation function adapted from https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
HTMLElement.prototype.animatedScrollTo = function(destination, duration = 200, easing = 'linear', callback) {

  const easings = {
    linear(t) { return t; },
    easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  };

  const start = this.scrollLeft;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  const destinationOffsetToScroll = Math.floor(destination);

  const scroll = () => {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    this.scrollTo(Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start), 0);

    if (this.scrollLeft === destinationOffsetToScroll) {
      if (callback) { callback(); }
      return;
    }
    requestAnimationFrame(scroll);
  }
  scroll();
}

let scrollContainer = document.querySelector('#project-scroller');
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
data.forEach((datum, index) => {
  let div = document.createElement('div');
  div.classList.add('project-icon');
  div.dataset.index = index;
  div.addEventListener('click', function() {
    debounceScrollHandler(this);
  });
  let image = document.createElement('img');
  image.classList.add('unselectable');
  const images = ['./assets/thl.jpg', './assets/bb.jpg', './assets/fs.jpg', './assets/eis.jpg'];
  image.src = images[Math.floor(Math.random() * images.length)];
  div.appendChild(image);
  scrollContainer.appendChild(div);
});

let n = data.length;
let cur = Math.floor(n / 2);

// set to center
let sampleElement = scrollContainer.firstChild;
let sampleElementWidth = sampleElement.getBoundingClientRect().width + parseInt(getComputedStyle(sampleElement).marginLeft.slice(0, -2)) * 2;
scrollContainer.scrollLeft = Math.floor((sampleElementWidth * (n - (n % 2 - 1)) - scrollContainer.getBoundingClientRect().width) / 2);

// hardcoded for now bc of ff problem: https://stackoverflow.com/questions/53992531/
sampleElementWidth = 258;

let getCenterItem = _ => {
  let scrollPos = scrollContainer.scrollLeft;
  let containerCenter = scrollContainer.getBoundingClientRect().width / 2;
  let sampleElement = scrollContainer.firstChild;
  let elementWidth = sampleElement.getBoundingClientRect().width;
  let elementMargin = parseInt(getComputedStyle(sampleElement).marginLeft.slice(0, -2));
  let closest, closestElem;
  document.querySelectorAll('.project-icon').forEach((icon, index) => {
    let iconOffset = icon.offsetLeft + elementWidth / 2 - scrollPos;
    if(Math.abs(iconOffset - containerCenter) <= elementWidth / 2 + elementMargin) {
      // closest to center!
      icon.classList.add('centered');
      closest = index;
      closestElem = icon;
    } else {
      // not closest to center
      icon.classList.remove('centered');
    }
  });
  return {
    index: closest,
    elem: closestElem
  };
};

// debouncing
let debounceTimeout;
let autoplayInterval;
debounceScrollHandler = elem => {
  if(throttleLock) return;
  let closestElem = (elem === 'resize') ? currentElem : elem || getCenterItem().elem;
  if(closestElem.dataset.index != cur) {
    cur = closestElem.dataset.index;
    currentElem = closestElem;
    console.log('changed! cur = ' + cur);
  }
  throttleLock = true;
  let scrollToPos = Math.floor(closestElem.offsetLeft + (sampleElementWidth - scrollContainer.getBoundingClientRect().width) / 2);
  if(scrollToPos != scrollContainer.scrollLeft) {
    clearInterval(autoplayInterval);
    scrollContainer.animatedScrollTo(scrollToPos, 200, 'easeInOutQuad', _ => {
      throttleLock = false;
    });
  } else {
    throttleLock = false;
  }
};
window.addEventListener('resize', _ => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(debounceScrollHandler.bind(null, 'resize'), 100);
});

// main scroll handler
let currentElem = getCenterItem().elem;
let throttleLock = false;
let carouselScrollHandler = _ => {
  if(throttleLock) return;
  throttleLock = true;

  let closest = getCenterItem();
  let ind = closest.index;
  
  let left = ind;
  let right = n - 1 - ind;
  let diff = right - left;

  if((n % 2 == 0 && Math.abs(diff) > 2) || (n % 2 == 1 && Math.abs(diff) > 0)) {
    if(diff < 0) {
      // more on left than right
      for(let i = 0; i < -diff / 2; i++) {
        /* maintaining scroll position picked up from https://codepen.io/ArtemGordinsky/pen/CevBD */
        let currentOffset = scrollContainer.lastChild.offsetLeft - scrollContainer.scrollLeft;
        scrollContainer.appendChild(scrollContainer.removeChild(scrollContainer.firstChild));
        scrollContainer.scrollLeft = scrollContainer.lastChild.previousSibling.offsetLeft - currentOffset;
      }
    } else {
      // more on right than left
      for(let i = 0; i < diff / 2; i++) {
        let currentOffset = scrollContainer.firstChild.offsetLeft - scrollContainer.scrollLeft;
        scrollContainer.insertBefore(scrollContainer.removeChild(scrollContainer.lastChild), scrollContainer.firstChild);
        scrollContainer.scrollLeft = scrollContainer.firstChild.nextSibling.offsetLeft - currentOffset;
      }
    }
    
  }

  // switch to this for primitive throttling
  //setTimeout(_ => throttleLock = false, 50);

  throttleLock = false;
};
scrollContainer.addEventListener('scroll', _ => {
  carouselScrollHandler();

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(debounceScrollHandler, 500);
});

// autoplay while pristine
autoplayInterval = setInterval(_ => {
  if(throttleLock) return;
  throttleLock = true;
  scrollContainer.animatedScrollTo(scrollContainer.scrollLeft + sampleElementWidth, 200, 'easeInOutQuad', _ => {
    throttleLock = false;
    carouselScrollHandler();
  });
}, 5000);

// scroll left and right
let scrollAmount = Math.round(scrollContainer.getBoundingClientRect().width / sampleElementWidth) * sampleElementWidth;
let scrollButtonHandler = left => {
  if(throttleLock) return;
  throttleLock = true;
  clearInterval(autoplayInterval);
  scrollContainer.animatedScrollTo(scrollContainer.scrollLeft + scrollAmount * (left ? -1 : 1), 200, 'easeInOutQuad', _ => {
    throttleLock = false;
    carouselScrollHandler();
  });
};
document.querySelector('#scroll-left').addEventListener('click', scrollButtonHandler.bind(null, true));
document.querySelector('#scroll-right').addEventListener('click', scrollButtonHandler.bind(null, false));
// END CAROUSEL BEHAVIOR
