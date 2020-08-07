function proxyElement(markup, selector, items = 'all') {
  const container = document.createElement('div');
  container.innerHTML = markup;
  if (items === 'all') {
    return container.querySelectorAll(selector);
  } else if (items === 'one') {
    return container.querySelector(selector);
  }
}

export default proxyElement;
