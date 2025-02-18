document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.testimonial-card-container');
  const cards = document.querySelectorAll(".testimonial-card");
  let startX = 0;
  let currentX = 0;
  let isDown = false;
  let currentIndex = 0;

  // Função para atualizar a posição dos cards
  function updateCardPositions(deltaX) {
      cards.forEach((card, index) => {
          const newPosition = (index - currentIndex) * 100 + deltaX;
          card.style.transform = `translateX(${newPosition}%)`;
      });
  }

  // Função para definir o card ativo após o arrasto
  function setActiveCard() {
      cards.forEach(card => card.classList.remove("active"));
      currentIndex = Math.round(currentX / -100); // Arredonda para o card mais próximo
      currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1)); // Garante que esteja dentro dos limites
      cards[currentIndex].classList.add("active");

      // Resetando a posição dos cards para o estado padrão
      cards.forEach((card, index) => {
          card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
      });
  }

  container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].clientX;
      container.classList.add('grabbing'); // Adiciona uma classe para o cursor (se você tiver no CSS)
  });

  container.addEventListener('touchend', () => {
      isDown = false;
      container.classList.remove('grabbing'); // Remove a classe para o cursor
      setActiveCard();
  });

  container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.touches[0].clientX;
      const deltaX = (x - startX) / container.offsetWidth * 100; // Calcula a porcentagem de movimento
      currentX += deltaX;

      updateCardPositions(currentX);
  });

  // Inicializa o primeiro card como ativo
  cards[currentIndex].classList.add("active");
  cards.forEach((card, index) => {
      card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
  });
});