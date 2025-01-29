class Carousel {
    constructor(props) {
        const settings = {...{containerId: '#carousel', mainId: "#main", slideClass: '.slide', interval: 4000, isPlaying: true}, ...props};

        this.mainContainer = document.querySelector(settings.mainId);
        this.container = document.querySelector(settings.containerId);
        this.SLIDES = document.querySelectorAll(settings.slideClass);
        this.slidesItems = this.container.querySelectorAll(settings.slideClass);
        this.TIMER_INTERVAL = settings.interval;
        this.isPlaying = settings.isPlaying;
    }
    _initProps() {
        this.currentSlide = 0;
        this.SIZE = this.SLIDES.length;

        this.CODE_SPACE = 'Space';
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.FA_PAUSE = "<i class=\"fa-solid fa-pause\"></i>";
        this.FA_PLAY = "<i class=\"fa-solid fa-play\"></i>";
        this.FA_PREV = "<i class=\"fa-solid fa-chevron-left\"></i>";
        this.FA_NEXT = "<i class=\"fa-solid fa-chevron-right\"></i>";
    }

    _initControls() {
        let controls = document.createElement("div");
        const PAUSE_PLAY = `<div id="pause" class="control__pause-btn">
                            <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                            <span id="fa-play-icon" style="display:none;">${this.FA_PLAY}</span>
                        </div>`;
        const PREV = `<div id="prev" class="control__prev-btn">${this.FA_PREV}</div>`;
        const NEXT = `<div id="next" class="control__next-btn">${this.FA_NEXT}</div>`;

        controls.setAttribute("class", "control__container");
        controls.innerHTML = PREV + PAUSE_PLAY + NEXT;

        this.container.appendChild(controls);
        this.pauseButton = this.container.querySelector("#pause");
        this.nextButton = this.container.querySelector("#next");
        this.prevButton = this.container.querySelector("#prev");

        this.pauseIcon = this.container.querySelector("#fa-pause-icon");
        this.playIcon = this.container.querySelector("#fa-play-icon");

        this.isPlaying ? this._pauseVisible() : this._playVisible();
    }
    _initIndicators() {
        let indicators = document.createElement("div");
        indicators.setAttribute("class", "indicators__container");

        for(let i=0; i < this.SIZE; i++) {
            let indicator = document.createElement("div");
            indicator.setAttribute("class", i === 0 ? "indicator active" : "indicator");
            indicator.dataset.slideTo = `${i}`;
            indicators.appendChild(indicator);
        }

        this.mainContainer.appendChild(indicators);
        this.indicatorsContainer = this.mainContainer.querySelector(".indicators__container");
        this.indicatorItems = this.mainContainer.querySelectorAll(".indicator");
    }
    _initListeners() {
        document.addEventListener("keydown", this.keyHandler.bind(this));
        this.pauseButton.addEventListener("click", this.pauseHandler.bind(this));
        this.prevButton.addEventListener("click", this.prevHandler.bind(this));
        this.nextButton.addEventListener("click", this.nextHandler.bind(this));
        this.indicatorsContainer.addEventListener("click", this.indicatorHandler.bind(this));
        this.container.addEventListener("mouseenter", this.pause.bind(this));
        this.container.addEventListener("mouseleave", this.play.bind(this));
    }
    indicatorHandler(e) {
        let target = e.target;

        if (target && target.matches("div.indicator")) {
            this.pause();
            this.goToSlide(parseInt(target.dataset.slideTo));
        }
    }
    _pauseVisible(isVisible = true) {
        this.pauseIcon.style.display = isVisible ? 'inline' : 'none';
        this.playIcon.style.display = isVisible ? 'none' : 'inline';
    }
    _playVisible() {
        this._pauseVisible(false);
    }
    keyHandler(e) {
        e.preventDefault();
        if (e.code === this.CODE_LEFT_ARROW) {this.goToPrevious()}
        else if (e.code === this.CODE_RIGHT_ARROW) {this.goToNext()}
        else if (e.code === this.CODE_SPACE) {this.pauseHandler()}
    }
    pauseHandler = () => {
        this.isPlaying ? this.pause() : this.play();
    }
    play() {
        if (this.isPlaying) return;
        console.log("Playing... Setting isPlaying to true");
        this._pauseVisible();
        this.isPlaying = true;
        this._tick();
    }
    pause() {
        if (!this.isPlaying) return;
        console.log("Pausing... Setting isPlaying to false");
        this._playVisible();
        this.isPlaying = false;
        clearInterval(this.timerId);
        this.timerId = null;
    }
    goToNext = () => {
        this.goToSlide(this.currentSlide + 1);
    }
    goToPrevious = () => {
        this.goToSlide(this.currentSlide - 1);
    }
    goToSlide(n) {
        const currentSlide = this.SLIDES[this.currentSlide];
        const currentIndicator = this.indicatorItems[this.currentSlide];
        currentSlide.classList.remove("active");
        currentIndicator.classList.remove("active");
        this.currentSlide = (n + this.SIZE) % this.SIZE;
        const newSlide = this.SLIDES[this.currentSlide];
        const newIndicator = this.indicatorItems[this.currentSlide];
        newSlide.classList.add("active");
        newIndicator.classList.add("active");
    }
    prevHandler() {
        this.pause();
        this.goToPrevious()
    }
    nextHandler()  {
        this.pause();
        this.goToNext()
    }
    _tick() {
        if(!this.isPlaying) return;
        clearInterval(this.timerId);
        this.timerId = setInterval(this.goToNext, this.TIMER_INTERVAL);
    }
    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        if (this.isPlaying) this.play();
        this._tick();
        this._initListeners();
    }
}

export default Carousel;








