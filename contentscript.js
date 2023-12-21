// contentscript.js running in the context of web page, so it has access to all DOM

// injected script can see the variables in the web page
// inject script to page, the script is to access monaco to get and set editor content

var s = document.createElement('script');
if (document.URL.startsWith('https://leetcode.com/problems')) {
  // for problem page to downlaod and upload code
  s.src = chrome.runtime.getURL('problems-page.js');
} else if (
  document.URL.startsWith('https://leetcode.com/explore/learn/card/')
) {
  s.src = chrome.runtime.getURL('card-page.js');
}
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
