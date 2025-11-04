document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const toggleIcon = document.getElementById('toggle-icon');
    // NOVO: Captura o elemento da imagem (certifique-se que o index.html tem id="logo-img")
    const logoImg = document.getElementById('logo-img'); 
    
    // URLs das imagens
    const LOGO_LIGHT = 'https://github.com/asideia/.github/blob/main/statics/logo-with-name.png?raw=true';
    const LOGO_DARK = 'https://github.com/asideia/.github/blob/main/statics/logo-with-name-dark.png?raw=true';

    // 1. CHAVE DO LOCAL STORAGE para persistência do tema
    const STORAGE_KEY = 'asideia-theme';

    /**
     * 2. Função para aplicar o tema (muda classe do body, ícone do botão e a imagem do logo)
     * @param {string} theme - 'light' ou 'dark'
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            toggleIcon.textContent = '☀️'; // Sol para indicar que pode mudar para claro
            // Lógica de troca do logo
            if (logoImg) {
                logoImg.src = LOGO_DARK;
            }
        } else {
            body.classList.remove('dark-mode');
            toggleIcon.textContent = '🌙'; // Lua para indicar que pode mudar para escuro
            // Lógica de troca do logo
            if (logoImg) {
                logoImg.src = LOGO_LIGHT;
            }
        }
    }

    /**
     * 3. Inicializar o tema
     * Verifica o localStorage, depois a preferência do sistema.
     */
    function initializeTheme() {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        
        if (storedTheme) {
            // Se houver tema salvo, use-o
            applyTheme(storedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Se não houver tema salvo, verifique a preferência do sistema
            applyTheme('dark');
        } else {
            // Padrão: modo claro
            applyTheme('light');
        }
    }

    /**
     * 4. Manipulador de evento de clique (inverte o tema e salva)
     */
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme); // Salva a nova preferência
    }

    // Adiciona o listener ao botão
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    // Inicializa o tema quando a página carrega
    initializeTheme();
});