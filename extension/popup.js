console.log("cargado");

function parseInstagramUrl(rawUrl) {
    const url = new URL(rawUrl);
    if (url.hostname !== "www.instagram.com") return null;

    const match = url.pathname.match(/\/(p|reel|tv)\/([\w-]+)/);
    if (!match) return null;

    const [, type, code] = match;
    return { url: `https://www.instagram.com/${type}/${code}/` };
  }

async function fetchPostMetadata(postUrl) {
  const response = await fetch(postUrl, { credentials: "include" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const meta = (name) =>
    doc.querySelector(`meta[property="${name}"]`)?.content ?? null;

  return {
    title: meta("og:title"),
    description: meta("og:description"),
    thumbnail_url: meta("og:image"),
  };
};

document
  .getElementById("saveBtn")
  .addEventListener("click", async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      const tab = tabs[0];
      const status = document.getElementById("status");

      const post = parseInstagramUrl(tab.url);
      if (!post) {
        status.innerText = "Abre una publicación de Instagram para guardarla";
        return;
      }

      status.innerText = "Leyendo la publicación...";
      const meta = await fetchPostMetadata(post.url);

      const selectedTags = Array.from(
        document.querySelectorAll('input[name="tag"]:checked')
      ).map((tag) => tag.value);

      const payload = {
        url: post.url,
        platform: "instagram",
        title: meta.title ?? "Sin título",
        description: meta.description,
        thumbnail_url: meta.thumbnail_url,
        tags: selectedTags,
        saved_at: new Date().toISOString(),
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