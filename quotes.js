/* quotes.js — pick a random quote from the list and put it in the hero. */
(() => {
  "use strict";

  const list = document.querySelector(".quote-list");
  const text = document.getElementById("random-quote-text");
  const author = document.getElementById("random-quote-author");
  const button = document.getElementById("new-quote");

  if (!list || !text || !author || !button) return;

  const quotes = Array.from(list.querySelectorAll("li")).map((item) => ({
    text: item.querySelector("blockquote p").textContent.trim(),
    author: item.querySelector("figcaption").textContent.trim()
  }));

  if (quotes.length === 0) return;

  let last = -1;

  const showRandom = () => {
    let index = Math.floor(Math.random() * quotes.length);
    if (quotes.length > 1 && index === last) {
      index = (index + 1) % quotes.length;
    }
    last = index;
    text.textContent = "“" + quotes[index].text + "”";
    author.textContent = quotes[index].author;
  };

  button.addEventListener("click", showRandom);
  showRandom();
})();
