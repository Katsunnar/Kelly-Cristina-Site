document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.testimonial-card-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let startX = 0; // Inicializa startX
  let startY = 0; // Inicializa startY
  let isDown = false;

  // Função de arraste com o toque (para dispositivos móveis)
  container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].clientX; // Use clientX para obter a posição relativa à janela
      startY = e.touches[0].clientY;
  });

  container.addEventListener('touchend', () => {
      isDown = false;
  });

  container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault(); // Impede o comportamento padrão (como o scroll)

      const endX = e.touches[0].clientX; // Use clientX
      const endY = e.touches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Verifica se o movimento foi predominantemente horizontal (esquerda/direita)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) { // Ajuste o valor para a sensibilidade do swipe (ex: 50 pixels)
              // Movendo para a direita, chama a função prev-btn (anterior)
              prevBtn.click();
          } else if (deltaX < -50) { // Ajuste o valor para a sensibilidade do swipe (ex: -50 pixels)
              // Movendo para a esquerda, chama a função next-btn (próximo)
              nextBtn.click();
          }
      }
      startX = endX; // Atualiza o startX para o próximo movimento
      startY = endY; // Atualiza o startY para o próximo movimento
  });

  // Selecionando os botões de navegação
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
});