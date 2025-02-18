document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.testimonial-card-container');
  const cards = document.querySelectorAll(".testimonial-card");
  let startX = 0;
  let currentX = 0;
  let isDown = false;
  let currentIndex = 0;
  const dragFactor = 0.6; // Ajuste para diminuir a sensibilidade do arrasto
  let animationFrameId = null;

  const cardWidth = container.offsetWidth; // Largura do container para definir limite de movimento

  // Função para atualizar a posição dos cards
  const updateCardPositions = (deltaX) => {
    cards.forEach((card, index) => {
      const newPosition = (index - currentIndex) * 100 + deltaX * dragFactor;
      card.style.transform = `translateX(${newPosition}%)`;
    });
  };

  // Função para definir o card ativo após o arrasto
  const setActiveCard = () => {
    let newIndex = Math.round(-currentX / cardWidth); // Calcula qual card deve ser exibido
    newIndex = Math.max(0, Math.min(cards.length - 1, newIndex)); // Impede ultrapassar o número de cards

    resetPositions(newIndex);
  };

  // Função para resetar a posição dos cards
  const resetPositions = (newIndex) => {
    cards.forEach(card => card.classList.remove("active"));
    currentIndex = newIndex;
    cards[currentIndex].classList.add("active");

    cards.forEach((card, index) => {
      card.style.transition = "transform 0.3s ease-in-out"; // Adiciona transição suave
      card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });
  };

  // Função para iniciar o arrasto
  const startDrag = (e) => {
    isDown = true;
    startX = e.clientX || e.touches[0].clientX;
    container.classList.add('grabbing'); // Adiciona uma classe para o cursor (se você tiver no CSS)
  };

  // Função para finalizar o arrasto
  const endDrag = () => {
    isDown = false;
    container.classList.remove('grabbing'); // Remove a classe para o cursor
    setActiveCard();
    cancelAnimationFrame(animationFrameId);
  };

  // Função para mover durante o arrasto
  const moveDrag = (e) => {
    if (!isDown) return;
    e.preventDefault(); // Impede o comportamento padrão (como o scroll)

    const x = e.clientX || e.touches[0].clientX; // Suporte para mouse e touch
    const deltaX = (x - startX) / cardWidth * 100; // Calcula a porcentagem de movimento
    currentX += deltaX;

    // Limita o movimento dos cards para que não saiam do quadrado
    if (currentX > 0) currentX = 0; // Impede o movimento para a direita além do limite
    if (currentX < -(cards.length - 1) * 100) currentX = -(cards.length - 1) * 100; // Impede o movimento para a esquerda além do limite

    updateCardPositions(currentX); // Atualiza a posição dos cards enquanto o usuário arrasta
    startX = x; // Atualiza a posição de início para o próximo movimento
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
