"use strict";
{
  // Call function fn when the DOM is loaded and ready. If it is already
  // loaded, call the function now.
  // http://youmightnotneedjquery.com/#ready
  function ready(fn) {
    htmx.onLoad(fn);
    document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    function handleClick(event) {
      event.preventDefault();
      const params = new URLSearchParams(window.location.search);
      if (params.has("_popup")) {
        window.close(); // Close the popup.
      } else {
        window.location.href = document.referrer; // Otherwise, go back.
      }
    }

    document.querySelectorAll(".cancel-link").forEach(function (el) {
      el.addEventListener("click", handleClick);
    });
  });
}
