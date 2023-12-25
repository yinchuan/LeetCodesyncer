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
  // avoid add link again
  if (
    Array.from(titleElement.querySelectorAll('a')).some(
      (e) => e.text == 'Search Question'
    )
  ) {
    return;
  }

  let search = titleElement.textContent.trim().replaceAll(' ', '+');
  let searchURL = `https://leetcode.com/problemset/?search=${search}&page=1`;

  const link = document.createElement('a');
  link.href = searchURL;
  link.textContent = 'Search Question';
  link.target = '_blank';
  link.rel = 'noopener noreferrer'; // suggested by Bard for security
  titleElement.appendChild(link);
};
