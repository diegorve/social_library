console.log("cargado")

document
    .getElementById("saveBtn")
    .addEventListener("click", async () => {

        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const url = tabs[0].url;

        const response = await fetch(
            "http://localhost:8000/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: url
                })
            }
        );

        const result = await response.json();

        document.getElementById("status").innerText =
            result.success
                ? "Guardado correctamente"
                : "Error";
    });