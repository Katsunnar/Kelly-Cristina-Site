window.onbeforeunload = function() {
  if (window.location.pathname !== "/index.html") {
    window.location.href = "/index.html";
  } 
}

window.onload = function () {
  if (window.location.pathname !== "/index.html" && window.performance.navigation.type === 1) {
    window.location.href = "/index.html";
  }
}

const cards = document.querySelectorAll('.hover-card, .produto-card');

function checkCenter() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  if (window.innerWidth < 576) {
    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const distanceToCenter = Math.sqrt(Math.pow(rect.left + rect.width / 2 - centerX, 2) + Math.pow(rect.top + rect.height / 2 - centerY, 2));
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;

      if (isVisible && (distanceToCenter < 200 || rect.top < centerY + 100 && rect.bottom > centerY - 100)) {
        if (distanceToCenter < closestDistance) {
          closestCard = card;
          closestDistance = distanceToCenter;
        }
      }
    });

    cards.forEach((card) => {
      if (card === closestCard) {
        card.classList.add('hover');
      } else {
        card.classList.remove('hover');
      }
    });
  } else if (window.innerWidth < 768) {
    // Modo responsivo para telas médias
    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const distanceToCenter = Math.sqrt(Math.pow(rect.left + rect.width / 2 - centerX, 2) + Math.pow(rect.top + rect.height / 2 - centerY, 2));
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;

      if (isVisible && (distanceToCenter < 250 || rect.top < centerY + 150 && rect.bottom > centerY - 150)) {
        if (distanceToCenter < closestDistance) {
          closestCard = card;
          closestDistance = distanceToCenter;
        }
      }
    });

    cards.forEach((card) => {
      if (card === closestCard) {
        card.classList.add('hover');
      } else {
        card.classList.remove('hover');
      }
    });
  } else {
    // Modo não responsivo
    cards.forEach((card) => {
      card.classList.remove('hover');
    });
  }
}

window.addEventListener('scroll', checkCenter);
window.addEventListener('resize', checkCenter);




