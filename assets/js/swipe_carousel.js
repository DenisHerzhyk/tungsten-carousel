import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
    _initProps() {
        super._initProps();
        this.slideContainer = this.slidesItems[0]?.parentElement;
    }
    _initListeners() {
        super._initListeners();
        this.slideContainer.addEventListener('touchstart', this._handleStart.bind(this), { passive: true });
        this.slideContainer.addEventListener('touchend', this._handleEnd.bind(this));

        this.slideContainer.addEventListener('mousedown', this._handleStart.bind(this));
        this.slideContainer.addEventListener('mouseup', this._handleEnd.bind(this));
    }
    _handleStart(e) {
        e.preventDefault();
        this.startPosX = e instanceof MouseEvent
            ? e.pageX
            : e.changedTouches[0].pageX;
    }
    _handleEnd(e) {
        this.endPosX = e instanceof MouseEvent
            ? e.pageX
            : e.changedTouches[0].pageX;

        if (this.startPosX - this.endPosX > 100) this.nextHandler();
        if (this.startPosX - this.endPosX < -100) this.prevHandler();
    }
}

export default SwipeCarousel;