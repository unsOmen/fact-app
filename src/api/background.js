/*global chrome*/
import FaceitService from "./FaceitService";


chrome.action.onClicked.addListener(function (activeTab) {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("CHROME LISTENER:", request);
  if (request.contentScriptQuery == "getMatch") {
    FaceitService.getMatch(request.data)
      .then(response => sendResponse(response));
    return true;
  } else {
    const msg = `Unsupported query: ${request.contentScriptQuery}`;
    console.error("LISTENER EXCEPTION", msg)
    throw new Error(msg);
  }
});

