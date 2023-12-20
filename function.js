
export function classManager(element, className, options = {}, callback) {
    
    /**
     * Manages the manipulation of CSS classes on an HTML element based on various triggers.
     * Supports adding, removing, and toggling a specified class, along with optional features
     * such as keyboard shortcuts, time delays, and outside click detection.
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

    const {
        classAddingElement = null,
        classRemovingElement = null,
        classTogglingElement = null,
        withOutsideClick = false,
        timeDelay = null,
        shortKey = null,
    } = options;

    let timeout;

    const addClass = () => element.classList.add(className);

    const removeClass = () => element.classList.remove(className);

    const toggleClass = () => element.classList.toggle(className);

    const onKeyDown = (event) => {
        if (event.keyCode === shortKey && event.altKey) {
            toggleClass();
        }
    };

    const outsideClick = (event) => {
        if (!classRemovingElement.contains(event.target) && !element.contains(event.target)) {
            removeClass();
        }
    };


    const timeDelayAddClass = () => {
        timeout = setTimeout(() => {
            addClass();
        }, timeDelay);
    };
    const timeDelayRemoveClass = () => {
        timeout = setTimeout(() => {
            removeClass();
        }, timeDelay);
    };
    const timeDelayToggleClass = () => {
        timeout = setTimeout(() => {
            toggleClass();
        }, timeDelay);
    };

    // Add event listeners based on provided elements and options

    if (classAddingElement && classTogglingElement === null) {
        if (timeDelay === null) {
            classAddingElement.addEventListener('click', addClass);
        } else {
            classAddingElement .addEventListener('click', timeDelayAddClass);
        }
    }

    if (classRemovingElement && classTogglingElement === null) {
        if (timeDelay === null) {
            classRemovingElement.addEventListener('click', removeClass);
        } else {
            classRemovingElement.addEventListener('click', timeDelayRemoveClass);
        }
    }

    if (classTogglingElement && classAddingElement === null && classRemovingElement === null) {
        if (timeDelay === null) {
            classTogglingElement.addEventListener('click', toggleClass);
        } else {
            classTogglingElement.addEventListener('click', timeDelayToggleClass);
        }
    }

    if (shortKey !== null) {
        document.addEventListener('keydown', onKeyDown);
    }

    if (withOutsideClick) {
        document.addEventListener('click', outsideClick);
    }

    if (callback && typeof callback === "function") {
        callback(element)
    }
}
