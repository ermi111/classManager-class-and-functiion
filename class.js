
export class ClassManager {
    
    /**
     * Creates an instance of the ClassManager.
     * 
     * @param {HTMLElement} element - The HTML element to manage classes on.
     * @param {string} className - The name of the CSS class to manipulate.
     * @param {Object} options - Optional configuration options.
     * @param {HTMLElement} options.classAddingElement - The element triggering class addition.
     * @param {HTMLElement} options.classRemovingElement - The element triggering class removal.
     * @param {HTMLElement} options.classTogglingElement - The element triggering class toggling.
     * @param {boolean} options.withOutsideClick - Enable class removal on outside click.
     * @param {number} options.timeDelay - Time delay (in milliseconds) for toggling the class.
     * @param {number} options.shortKey - Key code for a shortcut to toggle the class.
     * @param {function} callback - Optional callback function for further use.
     */

    constructor(element, className, options = {}, callback) {
        this.element = element;
        this.className = className;
        this.options = options;

        this.classAddingElement = options.classAddingElement || null;
        this.classRemovingElement = options.classRemovingElement || null;
        this.classTogglingElement = options.classTogglingElement || null;
        this.withOutsideClick = options.withOutsideClick || false;
        this.timeDelay = options.timeDelay || null;
        this.shortKey = options.shortKey || null;
        
        this.callback = callback;

        this.timeout;

        // Bind the methods to the current instance
        this.addClass = this.addClass.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.timeDelayAddClass = this.timeDelayAddClass.bind(this);
        this.timeDelayRemoveClass = this.timeDelayRemoveClass.bind(this);
        this.timeDelayToggleClass = this.timeDelayToggleClass.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.outsideClick = this.outsideClick.bind(this);

        // Initialize the ClassManager instance
        this.#init();
    }

    /**
     * Initializes the ClassManager by adding event listeners and handling options.
     * Private method (denoted by the # prefix).
     */
    #init() {
        
        if (this.classAddingElement && this.classTogglingElement === null) {
            if (this.timeDelay === null) {
                this.classAddingElement.addEventListener('click', this.addClass);
            } else {
                this.classAddingElement.addEventListener('click', this.timeDelayAddClass);
            }
        }

        if (this.classRemovingElement && this.classTogglingElement === null) {
            if (this.timeDelay === null) {
                this.classRemovingElement.addEventListener('click', this.removeClass);
            } else {
                this.classRemovingElement.addEventListener('click', this.timeDelayRemoveClass);
            }
        }

        if (this.classTogglingElement && this.classAddingElement === null && this.classRemovingElement === null) {
            if (this.timeDelay === null) {
                this.classTogglingElement.addEventListener('click', this.toggleClass);
            } else {
                this.classTogglingElement.addEventListener('click', this.timeDelayToggleClass);
            }
        }

        if (this.shortKey !== null) {
            document.addEventListener('keydown', this.onKeyDown);
        }

        if (this.withOutsideClick) {
            document.addEventListener('click', this.outsideClick);
        }

        if (this.callback && typeof this.callback === "function") {
            this.callback(this.element);
        }
    }

    // Functions providing element options

    addClass() {
        this.element.classList.add(this.className);
    }

    removeClass() {
        this.element.classList.remove(this.className);
    }

    toggleClass() {
        this.element.classList.toggle(this.className);
    }

    onKeyDown(event) {
        if (event.keyCode === this.shortKey && event.altKey) {
            this.toggleClass();
        }
    }

    outsideClick(event) {
        if (!this.classRemovingElement.contains(event.target) && !this.element.contains(event.target)) {
            this.removeClass();
        }
    }

    timeDelayAddClass() {
        this.timeout = setTimeout(() => {
            this.addClass();
        }, this.timeDelay);
    }

    timeDelayRemoveClass() {
        this.timeout = setTimeout(() => {
            this.removeClass();
        }, this.timeDelay);
    }

    timeDelayToggleClass() {
        this.timeout = setTimeout(() => {
            this.toggleClass();
        }, this.timeDelay);
    }
}
