document.addEventListener("DOMContentLoaded", function() {
  const patternsContainer = document.querySelector(".patterns-container");
  const patternTemplate = document.getElementById("pattern-template");

  DESIGN_PATTERNS.forEach((designPattern) => {
    const patternClone = patternTemplate.content.cloneNode(true);
    patternClone.querySelector("h2").textContent = designPattern.name;
    patternClone.querySelector("p").textContent = designPattern.description;
    patternClone.querySelector(".fa-icon").classList.add(designPattern.icon);

    patternsContainer.appendChild(patternClone);
  });
});
