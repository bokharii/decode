export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    console.log("Content script loaded!");
    document.addEventListener("mouseup", (event) => {
      // makes it so that interaction with my UI does not cause another mouseup
      const target = event.target as Element;
      if (target.closest("#explain-btn, #explain-panel")) return;

      const selected = window.getSelection();
      const selectedText = selected.toString().trim();

      if (selectedText.length > 0) {
        console.log("Highlighted text:", selectedText);
        const rect = selected.getRangeAt(0).getBoundingClientRect();

        // remove the old button
        document.getElementById("explain-btn")?.remove();

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
          const panelRect = button.getBoundingClientRect();
          document.getElementById("explain-panel")?.remove();
          const panel = document.createElement("div");
          panel.id = "explain-panel";
          panel.innerText = text;
          panel.style.position = "fixed";
          panel.style.top = `${rect.bottom + 8}px`;
          panel.style.left = `${rect.left}px`;
          panel.style.zIndex = "999999";
          document.body.appendChild(panel);
        };

        document.body.appendChild(button);
        button.addEventListener("click", () => {
          console.log("THE CAPTURED TEXT IS", selectedText);
          showPanel("EXPLAINING EXPLAINING EXPLAINING EXPLAINING");
        });
      }
    });
  },
});
