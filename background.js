// This code will run whenever the extension is running in the background.

// Listen for the `message` event.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const url = 'http://localhost:8080/';

  if (message.type === 'LEETCODE_SYNCER_DOWNLOAD') {
    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(message.data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      500
    )
      .then((response) => response.json())
      .then((text) => {
        sendResponse(text);
      })
      .catch((err) => {
        console.log(err);
        sendResponse(err);
      });
    return true;
  }

  if (message.type === 'LEETCODE_SYNCER_UPLOAD') {
    query = new URLSearchParams({
      title: message.title,
      lang: message.lang,
      level: message.level,
    });
    fetch(url + '?' + query.toString(), null, 500)
      .then((response) => response.text())
      .then((text) => {
        sendResponse(text);
      })
      .catch((err) => {
        console.log(err);
        sendResponse(err);
      });
    return true;
  }
});

//OK  csrftoken=UnWVhAcq8ZQYxvdONf3xzm9YPK694F4zAKFUXkg3krC4kFaC5bnVknhr4XPX6TRC;
//bad csrftoken=UnWVhAcq8ZQYxvdONf3xzm9YPK694F4zAKFUXkg3krC4kFaC5bnVknhr4XPX6TRC;
