// --- SISTEMA DE LOGIN ---
function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('login-error');
    
    // Senha definida conforme solicitado
    if (input === 'Jack' || input === 'jack') {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-content').classList.add('active');
        initParticles(); // Inicia o efeito visual apenas após o login
    } else {
        errorMsg.style.display = 'block';
    }
}

// Permite logar pressionando 'Enter'
document.getElementById('password-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// --- NAVEGAÇÃO SPA ---
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    // Mostra a seção solicitada
    document.getElementById(sectionId).classList.add('active');
    
    // Rola para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- CONTADOR DE TEMPO (Desde 07/02/2026) ---
function updateCounter() {
    // Data de início estipulada
    const startDate = new Date('2026-02-07T00:00:00').getTime();
    const now = new Date().getTime();
    
    // Como a data é no futuro (2026), se abrirmos antes disso, mostrará zerado.
    // Usando Math.max para evitar números negativos se o site for acessado antes da data.
    const difference = Math.max(0, now - startDate);
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('time-counter').innerHTML = `
        <div class="time-box"><span>${days}</span><p>Dias</p></div>
        <div class="time-box"><span>${hours.toString().padStart(2, '0')}</span><p>Horas</p></div>
        <div class="time-box"><span>${minutes.toString().padStart(2, '0')}</span><p>Minutos</p></div>
        <div class="time-box"><span>${seconds.toString().padStart(2, '0')}</span><p>Segundos</p></div>
    `;
}
// Atualiza a cada segundo
setInterval(updateCounter, 1000);
updateCounter(); // Chama imediatamente para não esperar 1 segundo


// --- EFEITO DE PARTÍCULAS (ESTRELAS) NO FUNDO ---
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particlesArray = [];
    const numberOfParticles = 100; // Quantidade de estrelas
    
    // Ajusta o canvas se a janela for redimensionada
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            // Cria um movimento ascendente lento
            this.speedY = (Math.random() * -0.5) - 0.1;
            this.speedX = (Math.random() * 0.4) - 0.2;
            // Algumas estrelas terão o tom avermelhado do tema
            this.color = Math.random() > 0.8 ? '#ff3333' : '#ffffff';
            this.opacity = Math.random() * 0.8 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Se a partícula sair pelo topo, reaparece em baixo
            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}
