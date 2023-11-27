// contentscript.js running in the context of web page, so it has access to all DOM

// in-page.js can see the variables in the web page
// inject script to page, the script is to access monaco to get and set editor content
var s = document.createElement('script');
s.src = chrome.runtime.getURL('in-page.js');
(document.head || document.documentElement).appendChild(s);

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
