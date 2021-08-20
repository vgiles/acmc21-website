async function fetchAndParseMarkdown() {
  const url = 'example.md';
  const response = await fetch(url);
  const data = await response.text();
  const htmlFromMarkdown = marked(data, { sanitize: true });
  return htmlFromMarkdown;
}


function generateLinkMarkup($headings) {
  console.log($headings);
  const parsedHeadings = $headings.map(heading => {
    return {
      title: heading.innerText,
      depth: heading.nodeName.replace(/\D/g, ''),
      id: heading.getAttribute('id') };

  });
  const htmlMarkup = parsedHeadings.map(h => `
  <li class="${h.depth > 1 ? 'pl-4' : ''}">
    <a href="#${h.id}">${h.title}</a>
  </li>
  `);
  const finalMarkup = `
    <ul>${htmlMarkup.join('')}</ul>
  `;
  return finalMarkup;
}

function updateLinks(visibleId, $links) {
  $links.map(link => {
    let href = link.getAttribute('href');
    link.classList.remove('is-active');
    if (href === visibleId) link.classList.add('is-active');
  });
}

function handleObserver(entries, observer, $links) {
  entries.forEach(entry => {
    const { target, isIntersecting, intersectionRatio } = entry;
    if (isIntersecting && intersectionRatio >= 1) {
      const visibleId = `#${target.getAttribute('id')}`;
      updateLinks(visibleId, $links);
    }
  });
}

function createObserver($links) {
  const options = {
    rootMargin: "0px 0px -200px 0px",
    threshold: 1 };

  const callback = (e, o) => handleObserver(e, o, $links);
  return new IntersectionObserver(callback, options);
}

async function init() {
  // Part 1
  const $main = document.querySelector('#content');
  const $aside = document.querySelector('#aside');
  const htmlContent = await fetchAndParseMarkdown();
  $main.innerHTML = htmlContent;

  // Part 2
  const $headings = [...$main.querySelectorAll('h1, h2')];
  const linkHtml = generateLinkMarkup($headings);
  $aside.innerHTML = linkHtml;

  // Part 3
  const motionQuery = window.matchMedia('(prefers-reduced-motion)');
  const $links = [...$aside.querySelectorAll('a')];
  const observer = createObserver($links);
  $headings.map(heading => observer.observe(heading));
}

init();