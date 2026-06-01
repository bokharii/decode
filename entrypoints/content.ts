export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    console.log("Content script loaded!");
    // remove the old button and panel when selected new text
    function dismiss() {
      document.getElementById("explain-btn")?.remove();
      document.getElementById("explain-panel")?.remove();
    }
    document.addEventListener("mouseup", (event) => {
      // makes it so that interaction with my UI does not cause another mouseup
      const target = event.target as Element;
      if (target.closest("#explain-btn, #explain-panel")) return;

      const selected = window.getSelection();
      const selectedText = selected.toString().trim();

      if (selectedText.length > 0) {
        dismiss();
        console.log("Highlighted text:", selectedText);
        const rect = selected.getRangeAt(0).getBoundingClientRect();

        const button = document.createElement("button");
        button.id = "explain-btn";
        button.textContent = "explain";
        button.style.position = "fixed";
        button.style.top = `${rect.bottom + 8}px`;
        button.style.left = `${rect.left}px`;
        button.style.zIndex = "999999";
        button.style.backgroundColor = "#007BFF";
        button.style.color = "#FFFFFF";
        button.style.padding = "10px 20px";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        const showPanel = (text) => {
          document.getElementById("explain-panel")?.remove();
          const panelRect = button.getBoundingClientRect();
          const panel = document.createElement("div");
          panel.id = "explain-panel";
          panel.innerText = text;
          panel.style.position = "fixed";
          panel.style.top = `${panelRect.bottom + 8}px`;
          panel.style.left = `${panelRect.left}px`;
          panel.style.zIndex = "999999";
          panel.style.maxWidth = "400px";
          document.body.appendChild(panel);
        };

        document.body.appendChild(button);
        button.addEventListener("click", async () => {
          console.log("THE CAPTURED TEXT IS", selectedText);
          showPanel("Loading...");
          // send message to service worker
          const response = await browser.runtime.sendMessage({
            type: "explain",
            text: selectedText,
          });
          showPanel(response.explanation)
        });
      }
    });

    document.addEventListener("mousedown", (event) => {
      const target = event.target as Element;
      if (target.closest("#explain-btn, #explain-panel")) return;
      // only dismiss if something is actually open
      if (
        document.getElementById("explain-btn") ||
        document.getElementById("explain-panel")
      ) {
        dismiss();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dismiss();
    });
  },
});
