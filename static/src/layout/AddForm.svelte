<script>
  import { afterUpdate, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import flatpickr from "flatpickr";
  import { parseHTML } from "../utils/parse_html";

  //props
  export let formUrl;
  export let redirectSuccessURL;
  //props

  let loading = true;
  let error = "";
  let parsedForm;
  let isFormSubmitting = false;

  async function fetchForm() {
    try {
      const resp = await fetch(formUrl);
      const formContent = await resp.text();
      parsedForm = parseHTML(formContent);
      loading = false;
    } catch (err) {
      error = err;
    }
  }

  fetchForm();

  function removeErrorMessage() {
    const elements = document.querySelectorAll("input, textarea, select");

    elements.forEach((element) => {
      element.addEventListener("click", () => {
        element.removeAttribute("aria-invalid");
        document.querySelectorAll("#email-helper").forEach((helper) => {
          // @ts-ignore
          helper.style.display = "none";
        });
      });
    });
  }

  function initFlatPicker() {
    document.querySelectorAll(".flatpicker").forEach((e) => {
      console.log(e);
      flatpickr(e, {});
    });
  }
  afterUpdate(() => {
    removeErrorMessage();
    initFlatPicker();
  });

  // Ensure TinyMCE initializes on component mount
  onMount(() => {
    document.addEventListener("trix-change", (event) => {
      // @ts-ignore
      const value = event.target.innerHTML;
      // @ts-ignore
      document.querySelector(".trix_input").value = value;
    });
  });

  /**
   * @param {SubmitEvent} e
   */
  async function handleSubmit(e) {
    isFormSubmitting = true;
    try {
      // @ts-ignore
      const formData = new FormData(e.target);
      const resp = await fetch(formUrl, {
        method: "POST",
        body: formData,
      });
      const data = await resp.text();
      if (data === "success") {
        push(redirectSuccessURL);
      } else {
        parsedForm = parseHTML(data);
      }
    } catch {
      error = "something error occured";
    }
    isFormSubmitting = false;
  }
</script>

{#if loading}
  <article aria-busy="true"></article>
{:else if error}
  <article>
    <p>{error}</p>
  </article>
{:else}
  <form on:submit|preventDefault={handleSubmit} novalidate>
    <fieldset disabled={isFormSubmitting}>
      <div class="row">
        <div class="col-xs-8">
          <article>
            {@html parsedForm.remainingHTML}
          </article>
        </div>
        <div class="col-xs-4">
          <article>
            <header>Action</header>
            <input type="submit" />
            <input type="reset" />
          </article>
        </div>
      </div>
    </fieldset>
  </form>
{/if}
