// images for image separators
let imageSeparators = document.querySelectorAll('.image-separator');
Array.from(imageSeparators).forEach(imageSeparator => imageSeparator.style.backgroundImage = `url('${imageSeparator.dataset.src}')`);

// lazy load images
let images = document.querySelectorAll('img');
Array.from(images).forEach(image => image.src = image.dataset.src);

// set size of first jumbotron to window height (and resize when window resized)
// resize image separators
let firstJumbotron = document.querySelector('#main-jumbotron');
let videoSeparator = document.querySelector('.video-separator');
let videoPlaceholder = document.querySelector('.video-placeholder');
let oldWidth = 0;
let videoAspectRatio = 1;
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
    let windowAspectRatio = windowWidth / windowHeight;
    // too narrow / tall
    if(videoAspectRatio < windowAspectRatio) {
      videoSeparator.style.width = '100%';
      videoSeparator.style.height = 'auto';
      videoSeparator.style.marginLeft = '0';
    }
    // too wide
    else {
      videoSeparator.style.height = windowHeight + 'px';
      videoSeparator.style.width = 'auto';
      videoSeparator.style.marginLeft = ((windowWidth - videoSeparator.offsetWidth) / 2) + 'px';
    }
    videoPlaceholder.style.height = videoSeparator.offsetHeight + 'px';
  }
};
resizeHandler();
window.addEventListener('resize', resizeHandler);
videoSeparator.addEventListener('loadedmetadata', () => {
  videoAspectRatio = videoSeparator.videoWidth / videoSeparator.videoHeight;
  resizeHandler();
});


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