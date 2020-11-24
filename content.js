let customName = "";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      customName = prompt("Type customName for " + window.location.href);

      // check that user has entered customName
      while (customName == "") {
        customName = prompt("customName can't be empty")
      }

      // check if user pressed 'cancel' button
      if (customName == null) {
        return
      }

      sendMessageToBackgroundJS(customName)
    }
    // tinyURLAPI responsed 
    else if (request.message === "tinyurl_api_response") {
      displayResultToUser(request.result);
    }
  }
);

// Helper function(s)
function sendMessageToBackgroundJS(customName) {
  let payload = {
    "message": "custom_name_entered",
    "originalURL" : window.location.href,
    "customName": customName
  }

  chrome.runtime.sendMessage(payload)
}

function displayResultToUser(result) {
  if (result == 200) {
    alert(`tinyurl.com/${customName}`);
  }
  else {
    customName = prompt("customName seems to be taken. Re-type tinyurl.com/customName");

    // check that user has entered customName
    while (customName == "") {
      customName = prompt("customName can't be empty")
    }

    // check if user pressed 'cancel' button
    if (customName == null) {
      return
    }

    sendMessageToBackgroundJS(customName);
  }
}