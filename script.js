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

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menuLinks.classList.remove('active');
}));


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
