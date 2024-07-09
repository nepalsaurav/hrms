import "../node_modules/awesomplete/awesomplete";
import "../node_modules/awesomplete/awesomplete.css";

window.InitAwesomeComplete = function InitAwesomeComplete(
  inputSelector,
  apiUrl
) {
  window.addEventListener("load", () => {
    const input = document.querySelector(inputSelector);
    const awesocomplete = new Awesomplete(input);

    input.addEventListener("keypress", async (event) => {
      const value = event.target.value;
      const resp = await fetch(`${apiUrl}?q=${value}`);
      const data = await resp.text();
      console.log(data);
      awesocomplete.list = JSON.parse(data);
    });
  });
};
