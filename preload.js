const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  console.log('Setting invoke task')
  window.invokeTask = ipcRenderer.invoke;
  window.banana = 'apple';
})

/* Invoke a take on the main process */
// (async () => {
//   console.log(await ipcRenderer.invoke('get-trustedConnectionEnabled'));
// })();