const GOVCONNECT_HOST_KEY = 'govconnect_profile';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'SAVE_PROFILE') {
    chrome.storage.local.set(
      {
        [GOVCONNECT_HOST_KEY]: message.profile
      },
      () => {
        sendResponse({
          success: true
        });
      }
    );

    return true;
  }

  if (message?.type === 'GET_PROFILE') {
    chrome.storage.local.get([GOVCONNECT_HOST_KEY], (result) => {
      sendResponse({
        success: true,
        profile: result[GOVCONNECT_HOST_KEY] || null
      });
    });

    return true;
  }
});