async function init() {
  try {
    fixHTMLSamples();
    await addApp('./movie-search/index.js', 'movieApp');
    await addApp('./todo/index.js', 'todoApp');
    await addApp('./shopping/index.js', 'shoppingApp');
  } catch (err) {
    console.error(err);
  }
}

function fixHTMLSamples() {
  document.querySelectorAll('pre').forEach(elm => {
    elm.textContent = elm.innerHTML
      .replace(/          /g, '')
      .replace(/\?-->/g, '?>')
      .replace(/<!--\?/g, '<?');
  })
}
async function addApp(source: string, targetElement: string) {
  const { initApp } = await import(source);
  const placeholder = document.getElementById(targetElement);
  if (placeholder) {
    placeholder.appendChild(initApp());
  } else {
    console.log(placeholder);
  }
}

window.addEventListener('load', init);
