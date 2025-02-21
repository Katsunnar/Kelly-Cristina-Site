// Função para animar o título da página
let i = 0;
const titles = ['|', '/', '-', '\\'];

function animateTitle() {
    // Alterar o título da página com os caracteres de carregamento
    document.title = titles[i % titles.length]; // Atualiza o título com os símbolos
    i++;
}

// Inicia a animação a cada 500ms
const animationInterval = setInterval(animateTitle, 500);

// Após 3 segundos, a animação é interrompida e o título é alterado para "Redirecionando..."
setTimeout(() => {
    clearInterval(animationInterval); // Interrompe a animação
    document.title = "Redirecionando..."; // Título final
}, 3000); // 3 segundos, igual ao tempo de refresh
