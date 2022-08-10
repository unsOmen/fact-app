/*global chrome*/
import FaceitService from "./FaceitService";


chrome.action.onClicked.addListener(function (activeTab) {
  try {
    console.debug("ACTIVE TAB", activeTab);
    console.debug("ACTIVE TAB2", window.location.toString());
  } catch (e) {
    console.error(e);
  }
  // chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
  ///1-12271de5-1838-40ed-a22b-0129c7a39f39
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html#/1-12271de5-1838-40ed-a22b-0129c7a39f39') });
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

