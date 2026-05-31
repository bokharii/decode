export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    console.log("Content script loaded!");
    document.addEventListener("mouseup", () => {
      const selected = window.getSelection();
      const selectedText = selected.toString().trim();

      if (selectedText.length > 0) {
        console.log("Highlighted text:", selectedText);
        const button = document.createElement("button");
        const rect = selected.getRangeAt(0).getBoundingClientRect();
        button.textContent = "explain";
        button.style.position = "fixed";
        button.style.top = `${rect.bottom + 8}px`;
        button.style.left = `${rect.left}px`;

        document.body.appendChild(button);
      }
    });
  },
});
