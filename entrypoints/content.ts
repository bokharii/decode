export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    console.log('Content script loaded!');
    document.addEventListener("mouseup", () => {
      const selectedText = window.getSelection().toString().trim();

      // Only log if the user actually highlighted text (ignores empty clicks)
      if (selectedText.length > 0) {
        console.log("Highlighted text:", selectedText);
      }
    });
  },
});
