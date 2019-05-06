(async () => {
  const src = chrome.extension.getURL('src/content-scripts/scripts/main.js');
  const contentScript = await import(src);
  contentScript.main();
})();
