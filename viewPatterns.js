document.addEventListener("DOMContentLoaded", function() {

  const container = document.querySelector(".patterns-container");
  DESIGN_PATTERNS.forEach(group => {
    const groupSection = createGroup(group.name, group.description)
    container.appendChild(groupSection);
    populate(groupSection, group.patterns);
  });
});

function createGroup(name, description) {
  const groupSection = document.createElement("section");
  groupSection.classList.add("pattern-group");
  groupSection.innerHTML = `
      <h2>${name}</h2>
      <p>${description}</p>
      <div class="patterns"></div>
  `;
  return groupSection
}

function populate(section, patterns) {
  console.log(section);
  const groupDiv = section.querySelector(".patterns");
  
  patterns.forEach(({name, description, icon}) => {
    const patternDiv = document.createElement("div");
    patternDiv.classList.add("pattern");
    patternDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <i class="fa-solid ${icon} fa-5x "></i>
    `;
    groupDiv.appendChild(patternDiv);
  });
}