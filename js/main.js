document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        document.querySelectorAll('.trainer-card').forEach(c => c.classList.remove('active'));
        if (!isActive) {
            this.classList.add('active');
        }
    });
});


const burger = document.getElementById('burger');
const menu = document.getElementById('full-menu');
const body = document.body;
burger.addEventListener('click', () => {
    // Переключаем активный класс у кнопки и у меню
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    
    // Запрещаем скролл страницы, когда меню открыто
    body.classList.toggle('no-scroll');
});

const links = document.querySelectorAll('.full-menu__list a');
links.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('is-active');
        menu.classList.remove('is-active');
        body.classList.remove('no-scroll');
    });
});