export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "explain"){
      sendResponse({explanation: "this is a fake explanation"})
    }
    return true;
  })
});
