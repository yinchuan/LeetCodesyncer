var observer = new MutationObserver((mutations) => {
  const titleElement = document.querySelector('div.question-title');
  if (!titleElement) {
    return;
  }

  observer.disconnect();

  let search = titleElement.textContent.trim().replaceAll(' ', '+');
  let searchURL = `https://leetcode.com/problemset/?search=${search}&page=1`;

  const link = document.createElement('a');
  link.href = searchURL;
  link.textContent = 'Search Question';
  link.target = '_blank';
  link.rel = 'noopener noreferrer'; // suggested by Bard for security
  titleElement.appendChild(link);
});

observer.observe(document.body, {
  subtree: true,
  childList: true,
});
