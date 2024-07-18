<script>
  import { afterUpdate, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import flatpickr from "flatpickr";
  import { parseHTML } from "../utils/parse_html";
  import Choices from "choices.js";
  //props
  export let formUrl;
  export let redirectSuccessURL;
  export let formTitle;
  //props

  let scriptSrcs = [];

  const autoCompleteField = [
    {
      id: "id_user",
    },
  ];

  let loading = true;
  let error = "";
  let parsedForm;
  let isFormSubmitting = false;

  async function fetchForm() {
    try {
      const resp = await fetch(formUrl);
      const formContent = await resp.text();
      parsedForm = parseHTML(formContent);
      scriptSrcs = parsedForm.scriptSrcs;
      loading = false;
    } catch (err) {
      error = err;
    }
  }

  fetchForm();

  async function removeErrorMessage() {
    const elements = document.querySelectorAll("input, textarea, select");

    elements.forEach((element) => {
      element.addEventListener("click", () => {
        element.removeAttribute("aria-invalid");
        element.classList.remove("is-invalid");
        const nextSibling = element.nextElementSibling;
        if (nextSibling && nextSibling instanceof HTMLElement) {
          nextSibling.style.display = "none"; // or any other style modification
        }
      });
    });
  }

  async function initFlatPicker() {
    document.querySelectorAll(".flatpicker").forEach((e) => {
      flatpickr(e, {});
    });
  }

  afterUpdate(async () => {
    await removeErrorMessage();
    await initFlatPicker();
    await choiceSelectInit();
  });

  async function choiceSelectInit() {
    // django-select2
    autoCompleteField.forEach((item) => {
      const element = document.querySelector(`#${item.id}`);
      if (element) {
        console.log(element);
        new Choices(element);
      }
    });
  }

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
  <p class="text-muted">{error}</p>
{:else}
  {#if parsedForm.styleSheetSrc.length > 0}
    {#each parsedForm.styleSheetSrc as item}
      <link rel="stylesheet" href={item} />
    {/each}
  {/if}
  <form on:submit|preventDefault={handleSubmit} novalidate>
    <fieldset disabled={isFormSubmitting}>
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-header">{formTitle}</div>
            <div class="card-body">
              {@html parsedForm.remainingHTML}
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-header">Actions</div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-2">
                  <input
                    type="submit"
                    class="btn btn-primary"
                    style="width: 100%;"
                  />
                </div>
                <div class="col-12 mb-2">
                  <input
                    type="reset"
                    class="btn btn-secondary"
                    style="width: 100%;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </form>
{/if}
