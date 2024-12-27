function setPrintContent(content) {
  localStorage.setItem("print_content", content);
}

function getPrintContent() {
  if (localStorage.getItem("print_content") !== null) {
    return localStorage.getItem("print_content");
  } else {
    return "";
  }
}

export { setPrintContent, getPrintContent };
