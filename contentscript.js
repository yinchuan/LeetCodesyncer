// contentscript.js running in the context of web page, so it has access to all DOM

// inject script to page, the script is to access monaco to get and set editor content
var s = document.createElement('script');
s.src = chrome.runtime.getURL('in-page.js');
(document.head || document.documentElement).appendChild(s);

const onUploadClicked = () => {
  const title = getTitle();
  const id = title.split('.')[0];
  const lang = localStorage.getItem('global_lang').replace(/"/g, '');
  const level = getLevel();
  chrome.runtime
    .sendMessage({
      type: 'upload',
      title,
      lang,
      level,
    })
    .then((val) => {
      console.log(monaco.editor.getModels()[0].getValue());
    });
};

// window.addEventListener(
//   'message',
//   (event) => {
//     if (event.data.type && event.data.type === 'LEETCODE_SYNCER_DOWNLOAD') {
//       chrome.runtime
//         .sendMessage({
//           type: 'LEETCODE_SYNCER_DOWNLOAD',
//           data: {
//             title: event.data.title,
//             url: event.data.url,
//             level: event.data.level,
//             code: event.data.code,
//           },
//         })
//         .then((val) => {
//           console.log(val);
//         });
//     } else if (
//       event.data.type &&
//       event.data.type === 'LEETCODE_SYNCER_UPLOAD'
//     ) {
//       chrome.runtime
//         .sendMessage({
//           type: 'LEETCODE_SYNCER_UPLOAD',
//           title: event.data.title,
//           lang: event.data.lang,
//           level: event.data.level,
//         })
//         .then((val) => {
//           window.postMessage({
//             type: 'LEETCODE_SYNCER_UPLOAD_RETURN',
//             code: val,
//           });
//           console.log(val);
//         });
//     }
//   },
//   false
// );

// @todo note
// how LeetCode save code to LocalStorage
// the key is ${questionId}_${activeSessionId}_${lang}
// whn not login, activeSessionId is 0
// questionId could be different from question FrontendId
// "activeSessionId": 3879093 , from /graphql
// "questionId": "1378",
// "questionFrontendId": "1252",
// "title": "Cells with Odd Values in a Matrix",
// "titleSlug": "cells-with-odd-values-in-a-matrix",
// "isPaidOnly": false,
// "difficulty": "Easy",
// "likes": 1037,
// "dislikes": 1382
