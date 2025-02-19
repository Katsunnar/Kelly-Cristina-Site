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

// Variáveis para os eventos de swipe
let startX = 0;
let endX = 0;

// Função de swipe (movimento de toque)
function handleTouchStart(event) {
    startX = event.touches[0].clientX; // Guarda a posição inicial do toque
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX; // Atualiza a posição do toque conforme o movimento
}

function handleTouchEnd() {
    if (startX > endX) {
        // Deslizar para a esquerda (próximo card)
        showNextCard();
    } else if (startX < endX) {
        // Deslizar para a direita (card anterior)
        showPrevCard();
    }
}

// Adiciona os listeners de touch para deslizar os cards
for (let card of cards) {
    card.addEventListener("touchstart", handleTouchStart);
    card.addEventListener("touchmove", handleTouchMove);
    card.addEventListener("touchend", handleTouchEnd);
}
