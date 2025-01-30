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
    _handleStart(event) {
        this.startPositionX = event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX;
    }
    _handleEnd(event) {
        this.endPositionX = event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX;
        if (this.endPositionX - this.startPositionX > 100) this.prevHandler();
        else if (this.endPositionX - this.startPositionX < -100) this.nextHandler();
    }
}

export default SwipeCarousel;