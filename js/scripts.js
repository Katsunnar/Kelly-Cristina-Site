window.onbeforeunload = function() {
  if (window.location.pathname !== "/index.html") {
    window.location.href = "/index.html";
  }
}

window.onload = function() {
  if (window.location.pathname !== "/index.html" && window.performance.navigation.type === 1) {
    window.location.href = "/index.html";
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.testimonial-card-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let startX, scrollLeft, isDown = false;

  // Função de arraste com o mouse
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
  });

  container.addEventListener('mouseup', (e) => {
    isDown = false;

    // Detectar o movimento de arraste (clicando e arrastando)
    let currentX = e.pageX;
    if (currentX < startX) {
      // Movendo para a esquerda, chama a função next-btn
      nextBtn.click();
    } else if (currentX > startX) {
      // Movendo para a direita, chama a função prev-btn
      prevBtn.click();
    }
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 3; // A velocidade do deslize
    container.scrollLeft = scrollLeft - walk;
  });

  // Função de arraste com toque (para dispositivos móveis)
  container.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('touchend', () => {
    isDown = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 3; // A velocidade do deslize
    container.scrollLeft = scrollLeft - walk;
  });

  // Detectar o movimento e chamar as funções next ou prev
  let lastX = 0; // Posição anterior para detectar a direção

  container.addEventListener('mousedown', (e) => {
    lastX = e.pageX;
  });

  container.addEventListener('mouseup', (e) => {
    if (!isDown) return;
    let currentX = e.pageX;
    if (currentX < lastX) {
      // Movendo para a esquerda, chama a função next-btn
      nextBtn.click();
    } else if (currentX > lastX) {
      // Movendo para a direita, chama a função prev-btn
      prevBtn.click();
    }
  });

  container.addEventListener('touchstart', (e) => {
    lastX = e.touches[0].pageX;
  });

  container.addEventListener('touchend', (e) => {
    if (!isDown) return;
    let currentX = e.changedTouches[0].pageX;
    if (currentX < lastX) {
      // Movendo para a esquerda, chama a função next-btn
      nextBtn.click();
    } else if (currentX > lastX) {
      // Movendo para a direita, chama a função prev-btn
      prevBtn.click();
    }
  });

  // Função para detectar clique diretamente no card
  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const cardWidth = container.offsetWidth / container.children.length;

    if (clickX < cardWidth / 2) {
      // Clique no lado esquerdo do container, vai para o card anterior
      prevBtn.click();
    } else {
      // Clique no lado direito do container, vai para o próximo card
      nextBtn.click();
    }
  });
});



// Selecionando os botões de navegação
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const cards = document.querySelectorAll(".testimonial-card");
let currentIndex = 0;

// Função para mostrar o card anterior
function showPrevCard() {
    if (currentIndex > 0) {
        cards[currentIndex].classList.remove("active");
        currentIndex--;
        cards[currentIndex].classList.add("active");
    }
}

// Função para mostrar o próximo card
function showNextCard() {
    if (currentIndex < cards.length - 1) {
        cards[currentIndex].classList.remove("active");
        currentIndex++;
        cards[currentIndex].classList.add("active");
    }
}

// Inicializa o primeiro card como ativo
cards[currentIndex].classList.add("active");

// Ações dos botões de navegação
prevBtn.addEventListener("click", showPrevCard);
nextBtn.addEventListener("click", showNextCard);
