var observer = new MutationObserver((mutations) => {
  // guard
  if (!document.URL.startsWith('https://leetcode.com/explore/learn/card/')) {
    return;
  }

  const titleElement = document.querySelector('div.question-title');
  if (!titleElement) {
    return;
  }

  observer.disconnect();

  addSearchLink(titleElement);

  // run observer when switching between items in a chpater
  window.addEventListener('pushstate', function () {
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
});

observer.observe(document.body, {
  subtree: true,
  childList: true,
});

const addSearchLink = (titleElement) => {
  const urlText = 'Search Question';
  let exists = false;
  let search = titleElement.textContent
    .trim()
    .replace(urlText, '')
    .replaceAll(' ', '+');
  let searchURL = `https://leetcode.com/problemset/?search=${search}&page=1`;

  // replace the link if exists
  titleElement.querySelectorAll('a').forEach((node) => {
    if (node.text.trim() == urlText) {
      node.href = searchURL;
      exists = true;
    }
  });
  if (exists) return;

  // add new one
  const link = document.createElement('a');
  link.href = searchURL;
  link.textContent = urlText;
  link.target = '_blank';
  link.rel = 'noopener noreferrer'; // suggested by Bard for security
  titleElement.appendChild(link);
};
