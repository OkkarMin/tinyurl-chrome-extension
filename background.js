// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  let payload = { "message": "clicked_browser_action" };

  // Send a message to the active tab
  sendMessageToContentJS(payload);
});

// Listen for message from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "custom_name_entered" ) {
      getTinyUrl(request.originalURL, request.customName)
        .then(function (result) {
          let payload = {
            "message": "tinyurl_api_response",
            "result": result,
          }

          sendMessageToContentJS(payload);
        }
      )
     
    }
  }
);

// Helper function(s)
function sendMessageToContentJS(payload_json) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, payload_json);
  });
}


async function getTinyUrl(originalURL, customName) {
  let tinyUrlAPI = `https://tinyurl.com/create.php?source=indexpage&url=${originalURL}&alias=${customName}`;
  let result = await fetch(tinyUrlAPI);

  return result.status;
}