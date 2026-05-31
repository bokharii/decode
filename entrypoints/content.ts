export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    console.log("Content script loaded!");
    document.addEventListener("mouseup", () => {
      const selected = window.getSelection();
      const selectedText = selected.toString().trim();
      let capturedText;

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
        
        document.body.appendChild(button);
        button.addEventListener("click", () => {
          console.log("THE CAPTURED TEXT IS", selectedText);
        });
      }
    });
  },
});
