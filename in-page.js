// note: acknowledge https://stackoverflow.com/a/9517879
// @todo to get language: localStorage.global_lang, not set when first open, it means cpp

// add D and U buttons only when Run button is available
var observer = new MutationObserver((mutations) => {
  const runButton = document.querySelector(
    '[data-e2e-locator="console-run-button"]'
  );

  if (!runButton) {
    return;
  }

  observer.disconnect();

  addButton(runButton, 'D', onDownloadClicked);
  addButton(runButton, 'U', onUploadClicked);
});

observer.observe(document.body, {
  subtree: true,
  childList: true,
});

const addButton = (copyFrom, text, onClick) => {
  newButton = document.createElement(copyFrom.tagName);
  newButton.innerHTML = text;
  newButton.classList = copyFrom.classList;
  newButton.addEventListener('click', onClick);
  copyFrom.parentNode.insertBefore(newButton, copyFrom);
};

const onDownloadClicked = () => {
  const title = getTitle();
  const url = document.URL;
  const level = getLevel();
  const code = monaco.editor.getModels()[0].getValue();

  let encoded = JSON.stringify({ title, url, level, code });
  // console.log(encoded);
  navigator.clipboard.writeText(encoded);
};

const onUploadClicked = () => {
  navigator.clipboard.readText().then((content) => {
    console.log(content);
    monaco.editor.getModels()[0].setValue(content);
  });
};

const getTitle = () => {
  const spans = Array.from(document.querySelectorAll('a[href^="/problems/"]'));
  let texts = spans.map((e) => e.innerText.trim());
  texts = texts.filter((e) => /^\d+.*[a-zA-Z].*/.test(e));

  if (texts.length === 0) {
    // alert('failed to get a title');
    return;
  }

  if (texts.length > 1) {
    // alert('more than two titles');
    console.log(texts);
    return;
  }

  return texts[0];
};

const getCode = () => {
  // var input = document.querySelector("textarea.inputarea")
  // input.value is the code
  // or get from the editor directly
  // editor = monaco.editor.create()...
  // editor.getModel().setValue("test")
  // even better:monaco.editor.getModels()[0].getValue()
  let divs = Array.from(document.querySelectorAll('div.view-lines'));
  const codes = divs.map((e) => e.innerText);

  if (codes.length !== 1) {
    // alert('more than two codes found');
    return;
  }

  return codes[0].replace(/\xa0/g, ' '); // \xa0 is &nbsp;
};

const getLevel = () => {
  let levels = Array.from(document.querySelectorAll('div')).filter((e) =>
    ['Easy', 'Medium', 'Hard'].includes(e.innerText.trim())
  );
  levels = levels.map((e) => e.innerText.trim());
  if (levels.size < 1) {
    // alert('no level found:' + levels);
    return;
  }

  return levels[0];
};
