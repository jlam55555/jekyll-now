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
let projectLightboxElem = document.querySelector('#project-lightbox');
let resizeHandler = () => {
  let windowWidth, windowHeight;
  if(window.visualViewport) {
    windowWidth = window.visualViewport.width;
    windowHeight = window.visualViewport.height;
  } else {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }
  // prevent constant refreshing on mobile on vertical resize
  if(oldWidth !== windowWidth || (windowWidth > 500 && windowHeight > 500)) {
    firstJumbotron.style.height = windowHeight + 'px';
    projectLightboxElem.style.minHeight = windowHeight + 'px';
    [].forEach.call(imageSeparators, imageSeparator => {
      imageSeparator.style.minHeight = windowHeight + 'px';
    });
  }
  oldWidth = windowWidth;
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
let projects = [
  {
    image: './assets/eis.jpg',
    background: './assets/eis-full.jpg',
    title: 'Everything is Sheep',
    description: 'Everything is Sheep (EiS) is a blog comprising of essays about high school and programming, and is the successor to The Homework Life (THL). While THL was written in 2015 in response to academic-literary dread, this one was written on a whim. All of the posts from THL were migrated over. A major goal of EiS was to create a sleeker blog interface and move the tech stack over from PHP (LAMP) to JavaScript (Node.js back-end).',
    active: '2017-2018',
    stack: [ 'JavaScript', 'HTML5', 'CSS3', 'Node.JS', 'PostgreSQL' ],
    links: [
      { title: 'See it', url: 'https://everything-is-sheep.herokuapp.com' }
    ]
  },
  {
    image: './assets/thl.jpg',
    background: './assets/thl-full.jpg',
    title: 'The Homework Life',
    description: 'The earliest of multiple blogs! The fear of fluncking Advanced English drove me to create this collection of babbling adolescent blurbs. For a while, this also was the hub of my programming projects before switching over to using GitHub sites for hosting.',
    active: '2015-2016',
    stack: [ 'JavaScript', 'HTML5', 'CSS3', 'PHP', 'MySQL' ],
    links: [
      { title: 'See it', url: 'http://www.thehomeworklife.co.nf' }
    ]
  },
  {
    image: './assets/srre.jpg',
    background: './assets/srre-full.jpg',
    title: 'Safe Rides of Redding and Easton',
    description: 'The official web-app for the Safe Rides service for the ER9 region! The service provides high schoolers with a trusted, reliable way home on late Friday and Saturday nights. The web-app is a website which can easily be saved as a web-app on iOS for easy access, and offers anything a volunteer or ride-requester needs to use the service. (Currently not in use by the service, although that may change.)',
    active: '2017-2018',
    stack: [ 'JavaScript', 'HTML5', 'CSS3', 'Node.JS', 'PostgreSQL', 'Bootstrap', 'Socket.io' ],
    links: [
      { title: 'See it', url: 'https://safe-rides-redding-easton.herokuapp.com' }
    ]
  },
  {
    image: './assets/fs.jpg',
    background: './assets/fs-full.jpg',
    title: 'Fruit Sensei',
    description: `Slice that fruit with your ... phone! This website uses JavaScript's deviceorientationevent on a mobile device to control a virtual katana. Created during MLH StuyHacks LHD 2017 with <a href='https://prathgan.github.io/' target='_blank'>Pratham Gandhi</a> and <a href='https://navidmx.com/' target='_blank'>Navid Mamoon</a>.`,
    active: '2017',
    stack: [ 'JavaScript', 'HTML5', 'THREE.JS', 'Socket.io' ],
    links: [
      { title: 'See it', url: 'https://fruit-sensei.herokuapp.com/' },
      { title: 'Devpost', url: 'https://devpost.com/software/fruit-sensei' },
      { title: 'GitHub', url: 'https://github.com/FruitSensei/fruitsensei.github.io' }
    ]
  },
  {
    image: './assets/mrg.jpg',
    background: './assets/mrg-full.jpg',
    title: 'Multiracer Game',
    description: `Use your phone to steer a car on the screen. Play with up to three of your friends. This uses JavaScript's deviceorientation event to track your phone's orientation. Created for the AP CSP Create Performance Task with <a href='https://github.com/rdk750' target='_blank'>Rahul Kiefer</a>.`,
    active: '2018',
    stack: [ 'JavaScript', 'HTML5', 'THREE.JS', 'Socket.io' ],
    links: [
      { title: 'See it', url: 'https://racing-game-csp.herokuapp.com' },
      { title: 'GitHub', url: 'https://github.com/jlam55555/racing-game' }
    ]
  },
  {
    imageText: 'WV',
    background: './assets/wv.jpg',
    title: 'Word Visualizer',
    description: 'Word visualizer is a fun little app to save text as an image.'
  },
  {
    imageText: 'A.Io',
    background: './assets/ar.jpg',
    title: 'Agar.io Imitation',
    description: 'Imitation game for Agar.io.'
  },
  {
    imageText: 'RT',
    background: './assets/rt.jpg',
    title: 'RingTune',
    description: 'Make a little melody with RingTune!'
  },
  {
    imageText: 'jkcd',
    background: './assets/jkcd.jpg',
    title: 'jkcd',
    description: 'Java-based desktop GUI for viewing xkcd comics.'
  },
  {
    imageText: '<span>xkcd</span><span>term</span>',
    background: './assets/xkcd-term.jpg',
    title: 'xkcd (Terminal)',
    description: 'Terminal-based xkcd viewer for Linux.'
  },
  {
    imageText: '<span>Pop</span><span>the</span><span>Lock</span>',
    background: './assets/ptl.jpg',
    title: 'Pop the Lock',
    description: 'Simple implementation of Pop the Lock'
  },
  {
    imageText: 'Noted',
    background: './assets/noted.jpg',
    title: 'Noted: A Chrome Extension',
    description: 'Keep tabs on your shopping list or whatever.'
  },
  {
    imageText: '<span>uns</span><span>cram</span><span>ble</span>',
    background: './assets/unscrambler.jpg',
    title: 'Word Unscrambler',
    description: 'Look up anagrams of a word, or play a game to find them yourself!'
  },
  {
    imageText: '<span>Simple</span><span>New</span><span>Tab</span>',
    background: './assets/snt.jpg',
    title: 'Simple New Tab: A Chrome Extension',
    description: 'Tired of the new tab page? Make it blank.'
  },
  {
    image: './assets/bb.jpg',
    background: './assets/bb-full.jpg',
    title: 'JBHS Bowling Website',
    description: 'Statistics for the JBHS CIBL Bowling Team of the 2017-2018 season.'
  },
];
projects.forEach((project, index) => {
  let div = document.createElement('div');
  div.classList.add('project-icon');
  div.dataset.index = index;
  div.addEventListener('click', function() {
    debounceScrollHandler(this);
  });
  if(project.imageText) {
    let imageText = document.createElement('div');
    imageText.classList.add('unselectable', 'image-text');
    if(project.imageText.length < 5) imageText.classList.add('large-text');
    imageText.innerHTML = project.imageText;
    div.appendChild(imageText);
  } else {
    let image = document.createElement('img');
    image.classList.add('unselectable');
    image.src = project.image;
    div.appendChild(image);
  }
  scrollContainer.appendChild(div);
  
  // preload backgrounds
  let lazyLoadedImage = new Image();
  lazyLoadedImage.src = project.background;
});

let n = projects.length;
let cur = Math.floor(n / 2);

// set to center
let sampleElement = scrollContainer.firstChild;
let sampleElementWidth = _ => sampleElement.getBoundingClientRect().width + parseInt(getComputedStyle(sampleElement).marginLeft.slice(0, -2)) * 2;

scrollContainer.scrollLeft = Math.floor((sampleElementWidth() * (n - (n % 2 - 1)) - scrollContainer.getBoundingClientRect().width) / 2);

// hardcoded for now bc of ff problem: https://stackoverflow.com/questions/53992531/
//sampleElementWidth = 258;

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

// update DOM with details
let projectTitleElem = document.querySelector('#project-title');
let projectDescriptionElem = document.querySelector('#project-description');
let projectActiveElem = document.querySelector('#project-active');
let projectStackElem = document.querySelector('#project-stack');
let projectLinksElem = document.querySelector('#project-links');
const faClassMap = {
  'CSS3': 'fab fa-css3',
  'HTML5': 'fab fa-html5',
  'JavaScript': 'fab fa-js',
  'MySQL': 'fas fa-database',
  'Node.JS': 'fab fa-node-js',
  'PostgreSQL': 'fas fa-database',
  'PHP': 'fab fa-php',
};
let changeProjectBox = index => {
  let project = projects[index];
  projectTitleElem.textContent = project.title;
  projectDescriptionElem.innerHTML = project.description;
  projectLightboxElem.style.background = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${project.background}')`;

  projectActiveElem.textContent = project.active;
  projectStackElem.innerHTML = (project.stack || []).map(projectTechnology => `<span class='stack-card unselectable'><i class='${faClassMap[projectTechnology] || 'fas fa-code'}'></i> <span>${projectTechnology}</span></span>`).join('');
  projectLinksElem.innerHTML = (project.links || []).map(projectLink => `<a href='${projectLink.url}' target='_blank'>${projectLink.title} <i class='fas fa-external-link-square-alt'></i></a>`).join(' | ');
};
changeProjectBox(cur);

// debouncing
let debounceTimeout;
let autoplayInterval;
debounceScrollHandler = elem => {
  if(throttleLock) return;
  let closestElem = (elem === 'resize') ? currentElem : elem || getCenterItem().elem;
  if(closestElem.dataset.index != cur) {
    cur = closestElem.dataset.index;
    currentElem = closestElem;
    changeProjectBox(cur);
  }
  throttleLock = true;
  let scrollToPos = Math.floor(closestElem.offsetLeft + (sampleElementWidth() - scrollContainer.getBoundingClientRect().width) / 2);
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
  scrollContainer.animatedScrollTo(scrollContainer.scrollLeft + sampleElementWidth(), 200, 'easeInOutQuad', _ => {
    throttleLock = false;
    carouselScrollHandler();
  });
}, 5000);

// scroll left and right
// scroll by 3s
// scroll by full screen is too much
let scrollAmount = 3 * sampleElementWidth();
//let scrollAmount = Math.round(scrollContainer.getBoundingClientRect().width / sampleElementWidth()) * sampleElementWidth();
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
