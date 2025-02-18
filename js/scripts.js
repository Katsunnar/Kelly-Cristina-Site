document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.testimonial-card-container');
  const cards = document.querySelectorAll(".testimonial-card");
  let startX = 0;
  let currentX = 0;
  let isDown = false;
  let currentIndex = 0;
  const dragFactor = 0.4; // Ajuste para diminuir a sensibilidade do arrasto
  const threshold = 30; // Ajuste para definir o limiar de troca de card (em porcentagem)

  // Função para atualizar a posição dos cards
  const updateCardPositions = (deltaX) => {
      cards.forEach((card, index) => {
          const newPosition = (index - currentIndex) * 100 + deltaX * dragFactor;
          card.style.transform = `translateX(${newPosition}%)`;
      });
  };

  // Função para definir o card ativo após o arrasto
  const setActiveCard = () => {
      let newIndex = currentIndex;
      if (currentX > threshold) {
          newIndex = Math.max(0, currentIndex - 1); // Vai para o card anterior
      } else if (currentX < -threshold) {
          newIndex = Math.min(cards.length - 1, currentIndex + 1); // Vai para o próximo card
      }

      // Reseta a posição
      resetPositions(newIndex);
  };

  // Função para resetar a posição dos cards
  const resetPositions = (newIndex) => {
      cards.forEach(card => card.classList.remove("active"));
      currentIndex = newIndex;
      cards[currentIndex].classList.add("active");
      currentX = 0; // Reseta o valor de currentX

      cards.forEach((card, index) => {
          card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
      });
  };

  // Função para iniciar o arrasto
  const startDrag = (e) => {
      isDown = true;
      startX = e.clientX || e.touches[0].clientX; // Suporte para mouse e touch
      container.classList.add('grabbing'); // Adiciona uma classe para o cursor (se você tiver no CSS)
  };

  // Função para finalizar o arrasto
  const endDrag = () => {
      isDown = false;
      container.classList.remove('grabbing'); // Remove a classe para o cursor
      setActiveCard();
  };

  // Função para mover durante o arrasto
  const moveDrag = (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.clientX || e.touches[0].clientX; // Suporte para mouse e touch
      let deltaX = (x - startX) / container.offsetWidth * 100; // Calcula a porcentagem de movimento

      // Limita o movimento para não passar de um card
      if (currentIndex === 0 && deltaX > 0) {
          deltaX = Math.min(0, deltaX); // Não permite arrastar para trás no primeiro card
      } else if (currentIndex === cards.length - 1 && deltaX < 0) {
          deltaX = Math.max(0, deltaX); // Não permite arrastar para frente no último card
      }

      currentX += deltaX;
      updateCardPositions(currentX);
  };

  container.addEventListener('mousedown', startDrag); // Mouse
  container.addEventListener('mouseup', endDrag);   // Mouse
  container.addEventListener('mousemove', moveDrag); // Mouse

  container.addEventListener('touchstart', startDrag); // Touch
  container.addEventListener('touchend', endDrag);   // Touch
  container.addEventListener('touchmove', moveDrag); // Touch

  // Inicializa o primeiro card como ativo
  resetPositions(currentIndex);
});