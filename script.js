// CONFIGURAÇÃO DE DADOS
const DATA = {
    fundamentals: [
        { id: 1, title: "Saque", text: "O início estratégico do ataque.", icon: "⚡" },
        { id: 2, title: "Bloqueio", text: "A muralha defensiva na rede.", icon: "🛡️" },
        { id: 3, title: "Levantamento", text: "A inteligência por trás do ponto.", icon: "🎯" }
    ],
    faq: [
        { q: "Posso tocar na rede?", a: "Não, qualquer toque na rede durante a ação é falta." },
        { q: "O que é o Líbero?", a: "Um especialista defensivo com regras de rotação únicas." }
    ]
};

// GERENCIADOR DE ESTADO (State Manager)
const AppState = {
    theme: localStorage.getItem('theme') || 'light',
    fontSize: parseInt(localStorage.getItem('fontSize')) || 100,

    init() {
        this.applyTheme();
        this.applyFontSize();
        this.renderAll();
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark-mode' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    },

    applyTheme() {
        document.body.className = this.theme;
    },

    updateFont(delta) {
        this.fontSize = Math.min(Math.max(this.fontSize + delta, 80), 140);
        localStorage.setItem('fontSize', this.fontSize);
        this.applyFontSize();
    },

    applyFontSize() {
        document.documentElement.style.fontSize = `${this.fontSize}%`;
    },

    renderAll() {
        const grid = document.getElementById('dynamic-grid');
        const skeleton = document.getElementById('grid-skeleton');
        
        // Simular delay de carregamento para UX (opcional)
        setTimeout(() => {
            if(skeleton) skeleton.style.display = 'none';
            grid.innerHTML = DATA.fundamentals.map(item => `
                <article class="modern-card reveal" tabindex="0">
                    <span style="font-size: 2rem">${item.icon}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                </article>
            `).join('');
            this.initScrollReveal();
        }, 500);

        // Render Accordion
        const acc = document.getElementById('accordion-group');
        acc.innerHTML = DATA.faq.map(item => `
            <details class="modern-card">
                <summary><strong>${item.q}</strong></summary>
                <p style="padding-top: 1rem">${item.a}</p>
            </details>
        `).join('');
    },

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
};

// EVENT LISTENERS
document.getElementById('toggle-theme').onclick = () => AppState.toggleTheme();
document.getElementById('font-up').onclick = () => AppState.updateFont(10);
document.getElementById('font-down').onclick = () => AppState.updateFont(-10);

// Início
document.addEventListener('DOMContentLoaded', () => AppState.init());
