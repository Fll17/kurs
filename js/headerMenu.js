let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
        // Если начался скролл, добавляем класс fixed
        header.classList.add('fixed');

        // Плавное появление хедера при скролле вверх
        if (scrollTop < lastScrollTop) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    } else {
        // Если вернулись в начало страницы, убираем класс fixed и visible
        header.classList.remove('fixed', 'visible');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для предотвращения отрицательных значений
});