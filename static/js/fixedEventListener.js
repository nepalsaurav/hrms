const originalAddEventListener = window.addEventListener;

window.addEventListener = function(event, listener, options) {
  if (event === 'load') {
    originalAddEventListener.call(this, 'turbo:render', listener, options);
  }

  originalAddEventListener.call(this, event, listener, options);
};


const originalDocAddEventListener = document.addEventListener;

document.addEventListener = function(event, listener, options) {
  if (event === 'DOMContentLoaded') {
    originalDocAddEventListener.call(this, 'turbo:render', listener, options);
  }

  originalDocAddEventListener.call(this, event, listener, options);
};