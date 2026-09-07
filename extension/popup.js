console.log("cargado");

document
  .getElementById("saveBtn")
  .addEventListener("click", async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      const tab = tabs[0];

      const url = tab.url;
      const title = tab.title;

      let platform = "unknown";

      if (url.includes("instagram.com")) {
        platform = "instagram";
      }

      const payload = {
        url,
        title,
        platform,
        saved_at: new Date().toISOString()
      };

      const response = await fetch(
        "http://localhost:8000/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();

      document.getElementById("status").innerText =
        result.success
          ? "Guardado correctamente"
          : "Error";
    } catch (error) {
      console.error(error);
      document.getElementById("status").innerText =
        "Error al guardar";
    }
  });