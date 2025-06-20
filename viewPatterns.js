const EXAMPLES_DIR_URL = './examples/';

document.addEventListener("DOMContentLoaded", () => {
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
  const groupDiv = section.querySelector(".patterns");
  
  patterns.forEach(({name, description, icon}) => {
    const patternDiv = document.createElement("div");
    patternDiv.classList.add("pattern");
    patternDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <i class="fa-solid ${icon} fa-5x fa-icon"></i>
    `;
    groupDiv.appendChild(patternDiv);
  });
}

// Modal logic
const modal = document.getElementById('code-modal');
const modalTitle = document.getElementById('modal-pattern-title');
const modalCode = document.getElementById('modal-code-example');
const closeBtn = document.querySelector('.close-btn');

document.body.addEventListener('click' , (e) => {
  const patternDiv = e.target.closest('.pattern');
  if (patternDiv) {
    const title = patternDiv.querySelector('h3')?.textContent || '';
    modalTitle.textContent = title;
    
    let example = '// Exemplo de código não disponível.'
    fetch(EXAMPLES_DIR_URL + 'factoryMethod.ts')
      .then(response => example = response.text())
      .catch(() => {
        example = '// Erro ao carregar o exemplo de código.';
      });

    modalCode.textContent = example;
    modal.classList.add('show');
  }
});


const closeModal = () => {
    modal.classList.remove('show');
} 

closeBtn.addEventListener('click', closeModal)
modal.addEventListener('click', closeModal);
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});