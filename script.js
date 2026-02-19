// Filtrar os cards de acordo com o botão clicado 

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            //1. Muda a cor do botão (remove active de todos e coloca no clicado)
            document.querySelector('.btn-filter.active').classList.remove('active');
            button.classList.add('active');

            //2. Filtra os cards
            const filterValue = button.getAttribute('data-target');

            skillCards.forEach(card => {
                // Se clicar em "todas", remove o 'hide' de todos os cards, caso contrário so mostra os que tem a classe correspondente
                if (filterValue === 'todas' || card.classList.contains(filterValue)) {
                    card.classList.remove('hide'); //Mostra o card
                } else {
                    card.classList.add('hide'); //Esconde o card
                }
            });
        });
    });

    // Modo menu-hamburguer

    const menuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links'); // Usando um nome mais claro

    if (menuBtn && navLinksContainer) {
        // 1. Abre e fecha pelo botão hambúrguer
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        });

        // 2. FECHA AO CLICAR EM QUALQUER LINK (SOLUÇÃO PARA A TELA PRETA)
        // Buscamos os links diretamente dentro do container para não haver erro
        const linksInternos = navLinksContainer.querySelectorAll('a');

        linksInternos.forEach(link => {
            link.addEventListener('click', (e) => {
                // Removemos a classe active FORÇADAMENTE
                navLinksContainer.classList.remove('active');

                // Também removemos do botão para as 3 barrinhas voltarem
                menuBtn.classList.remove('is-active');

                console.log("Menu fechado suavemente...");
            });
        });
    }

    // Formulario para mandar mensagem

    const formularioContato = document.getElementById('meu-form');
    const msgSucesso = document.getElementById('mensagem-sucesso');
    const btnEnviar = document.getElementById('btn-enviar');

    if (formularioContato) {
        formularioContato.addEventListener('submit', async (Event) => {
            Event.preventDefault();

            btnEnviar.innerText = "Enviando...";
            btnEnviar.disabled = true;
            const dados = new FormData(formularioContato);

            try {
                const resposta = await fetch(formularioContato.action, {
                    method: 'POST',
                    body: dados,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (resposta.ok) {
                    msgSucesso.style.display = 'block';
                    formularioContato.reset();

                    setTimeout(() => {
                        msgSucesso.style.display = 'none';
                    }, 5000);
                } else {
                    alert('Houve um problema ao enviar sua mensagem. Por favor, tente novamente.');
                }
            } catch (erro) {
                alert("Erro de conexão com o servidor. Por favor, tente novamente.");
            } finally {
                btnEnviar.innerText = "Enviar Mensagem";
                btnEnviar.disabled = false;
            }
        });
    }

    // Mudança de diurno para noturno

    const btnTema = document.getElementById('theme-toggle');
    const body = document.body;

    btnTema.addEventListener('click', () => {

        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'dark');
        } else {
            localStorage.setItem('tema', 'light');
        }
    });

    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        body.classList.add('dark-mode');
    }
});
