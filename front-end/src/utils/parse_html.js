/**
 * Description
 * @param {string} htmlString
 * @returns {object} :
 * - {string[]} scriptSrcs
 * - {string} remainingHTML
 */
export function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  // Extract all script tags and collect their src attributes
  const scripts = doc.querySelectorAll("script");
  const styleSheet = doc.querySelectorAll("link");
  const scriptSrcs = [];
  const styleSheetSrc = [];
  styleSheet.forEach((style) => {
    if (style.href) {
      styleSheetSrc.push(style.href);
    }
    style.remove();
  });
  scripts.forEach((script) => {
    if (script.src) {
      scriptSrcs.push(script.src);
    }
    // Remove the script tag from the DOM
    script.remove();
  });

  const remainingHTML = doc.body.innerHTML;
  return {
    scriptSrcs: scriptSrcs,
    remainingHTML: remainingHTML,
    styleSheetSrc: styleSheetSrc,
  };
}
