(async () => {
  const src = chrome.extension.getURL('src/scripts/main.js');
  const contentScript = await import(src);
  contentScript.main();
})();
