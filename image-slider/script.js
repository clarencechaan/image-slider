const image = document.querySelector('.image');
let currentImageIndex = 0;
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const frame = document.querySelector('.frame')


function next() {
    if (isLastImage()) return;

    currentImageIndex += 1;
    frame.scroll(frame.clientWidth*currentImageIndex, 0);
    updateHighlightedDot();
    resetSlideTimer();
    updateArrowsClickable();
}

function previous() {
    if (isFirstImage()) return;

    currentImageIndex -= 1;
    frame.scroll(frame.clientWidth*currentImageIndex, 0);
    updateHighlightedDot();
    resetSlideTimer();
    updateArrowsClickable();
}

function updateHighlightedDot() {
    const dots = document.querySelectorAll('.dot');
    for (let i = 0; i < dots.length; i++) {
        if (i === currentImageIndex) {
            dots[i].classList.add('highlighted');
        } else {
            dots[i].classList.remove('highlighted');
        }
    }
}


function isLastImage() {
    return (currentImageIndex >= 5)
}

function isFirstImage() {
    return (currentImageIndex <= 0)
}

function resetSlideTimer() {
    clearInterval(advanceSlideTimer);
    advanceSlideTimer = window.setInterval(function(){
        next();
    }, 5000);
}

function goToSlide(index) {
    currentImageIndex = index;
    frame.scroll(frame.clientWidth*currentImageIndex, 0);
    updateHighlightedDot();
    resetSlideTimer();
    updateArrowsClickable();
}

function updateArrowsClickable() {
    if (isLastImage()) {
        rightArrow.classList.add('disabled');
    }

    if (isFirstImage()) {
        leftArrow.classList.add('disabled');
    }

    if (!isLastImage()) {
        rightArrow.classList.remove('disabled');
    }

    if (!isFirstImage()) {
        leftArrow.classList.remove('disabled');
    }
}

let advanceSlideTimer = window.setInterval(function(){
    next();
}, 5000);



// add event listeners to navigation buttons
const dots = document.querySelectorAll('.dot')
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => goToSlide(i));
}