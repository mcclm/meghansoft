var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    main();
  }
}, 10);

function main() {
  document.title = meghan(document.title);

  replace(document.body);
  
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.slice.call(mutation.addedNodes).forEach(replace);
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });
}

function replace(node) {
  var walker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  var textNode;
  while(textNode = walker.nextNode()) {
    textNode.nodeValue = meghan(textNode.nodeValue);
  }
}

function meghan(text) {
  const ms = /(Micro|micro)soft/gi;
  return text.replace(ms, 'Meghan');
}
