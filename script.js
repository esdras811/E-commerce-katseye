
const carrinhoLink = document.getElementById('carrinho-link');
const botoesComprar = document.querySelectorAll('.botao-comprar');
const tituloGnarly = document.getElementById('gnarly-title');
const botaoAcaoGnarly = document.querySelector('.botao-acao-gnarly'); 


let itensNoCarrinho = [];



function atualizarCarrinho() {
    
    const totalItens = itensNoCarrinho.length;
    carrinhoLink.innerHTML = `<i class="fas fa-shopping-bag"></i> CARRINHO (${totalItens})`;
    
    
    carrinhoLink.style.transition = 'transform 0.1s ease-in-out';
    carrinhoLink.style.transform = 'scale(1.1)';
    setTimeout(() => {
        carrinhoLink.style.transform = 'scale(1.0)';
    }, 100);
}


botoesComprar.forEach(botao => {
    botao.addEventListener('click', (event) => {
        
        const card = event.target.closest('.card-produto');
        const nome = card.dataset.nome;
        
        const preco = parseFloat(card.dataset.preco);
        
        
        itensNoCarrinho.push({ nome: nome, preco: preco });
        atualizarCarrinho();
        
        
        botao.textContent = 'ADICIONADO';
        botao.style.backgroundColor = 'var(--cor-neon-secundaria)';
        
        setTimeout(() => {
            botao.textContent = 'COMPRAR';
            botao.style.backgroundColor = 'var(--cor-neon-primaria)';
        }, 1000);
    });
});


botaoAcaoGnarly.addEventListener('click', () => {
    
    
    if (itensNoCarrinho.length === 0) {
        
        itensNoCarrinho.push({ nome: "Jaqueta de Alto Risco", preco: 599.90 });
        atualizarCarrinho();
    }
    
    
    const subtotal = itensNoCarrinho.reduce((total, item) => total + item.preco, 0);
    
    
    const freteFixo = 35.00; // Frete fixo simulado para Sp
    
    
    const totalFinal = subtotal + freteFixo;
    

    const formatarBRL = (valor) => valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    
    const mensagemCheckout = 
        "--- DETALHES DA COMPRA ---\n" +
        `Subtotal (${itensNoCarrinho.length} itens): ${formatarBRL(subtotal)}\n` +
        "--------------------------\n" +
        "1. CALCULAR FRETE:\n" +
        `   Simulação (Expresso SP): ${formatarBRL(freteFixo)}\n` +
        "--------------------------\n" +
        "2. TOTAL A PAGAR:\n" +
        `   TOTAL: ${formatarBRL(totalFinal)}\n\n` +
        "COMPRA FINALIZADA COM SUCESSO!";

    alert(mensagemCheckout);

    
    itensNoCarrinho = [];
    setTimeout(atualizarCarrinho, 500);
});


// --- EFEITOS VISUAIS ---


if (tituloGnarly) {
    tituloGnarly.addEventListener('mouseenter', () => {
        tituloGnarly.classList.add('glitch-active');
    });

    tituloGnarly.addEventListener('animationend', () => {
        tituloGnarly.classList.remove('glitch-active');
    });
}


document.addEventListener('DOMContentLoaded', atualizarCarrinho);