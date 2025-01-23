const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const PAUSE_ICON = "<i class=\"fa-solid fa-pause\"></i>";
const PLAY_ICON = "<i class=\"fa-solid fa-play\"></i>";

let currentSlide = 0;
let slideInterval = setInterval(goToNext, 3000);
let playing = true;
let pauseButton = document.querySelector("#pause");

function pauseSlideShow() {
    pauseButton.innerHTML = PLAY_ICON;
    playing = false;
    clearInterval(slideInterval);
}

function playSlideShow() {
    pauseButton.innerHTML = PAUSE_ICON;
    playing = true;
    slideInterval = setInterval(goToNext, 3000);
}

function goToNext() {
    goToSlide(currentSlide + 1);
}

function goToPrevious() {
    goToSlide(currentSlide - 1);
}

function goToSlide(n) {
    slides[currentSlide].classList = "slide";
    indicators[currentSlide].classList = "indicator";
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList = "slide active";
    indicators[currentSlide].classList = "indicator active";
}

pauseButton.addEventListener("click", () => {
    playing ? pauseSlideShow() : playSlideShow();
})

prevButton.addEventListener("click", () => {
    pauseSlideShow();
    goToPrevious()
})

nextButton.addEventListener("click", () => {
    pauseSlideShow();
    goToNext()
})

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        pauseSlideShow();
        goToSlide(index);
    })
})