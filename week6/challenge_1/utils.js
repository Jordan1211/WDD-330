// like a back end... this is our model

export function qs(selectorName) {
    return document.querySelector(selectorName);
}

export function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function writesToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function bindTouch(selector, callback) {
    const element = qs(selector);
    element.addEventListener("click", callback);
}