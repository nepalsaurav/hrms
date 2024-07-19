/**
 * @param {string | URL | Request} url
 * @param {string} [method="GET"]
 * @param {FormData|null} [formData=null]
 * @returns {Promise<{type: string, data: any, resp: Response}|undefined>}
 */
export async function customFetch(url, method = "GET", formData = null) {
  try {
    const resp = await fetch(url, { method, body: formData });

    if (resp.status === 200 || resp.status === 201) {
      if (resp.redirected && resp.url.includes("/accounts/login")) {
        window.location.href = "/accounts/login";
        return;
      }
      const contentType = resp.headers.get("Content-Type");
      const isJson = contentType && contentType.includes("application/json");

      const data = isJson ? await resp.json() : await resp.text();
      return {
        type: isJson ? "json" : "text",
        data,
        resp,
      };
    }

    if (
      resp.status === 302 &&
      resp.redirected &&
      resp.url.includes("/accounts/login")
    ) {
      window.location.href = resp.url;
      return;
    }

    const statusMessages = {
      400: "Bad request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not found",
      500: "Internal server error",
      503: "Service unavailable",
    };

    console.log(
      statusMessages[resp.status] || `Unexpected status code: ${resp.status}`
    );
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
