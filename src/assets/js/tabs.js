jQuery(() => {
    document.querySelectorAll('.tabs__nav-link').forEach((el) => {
        el.addEventListener('click', function (e) {
            var target = this.getAttribute('href');
            e.preventDefault();

            this.closest('.tabs__nav').querySelector('.tabs__nav-link--active').classList.remove('tabs__nav-link--active');
            this.classList.add('tabs__nav-link--active');

            this.closest('.modal__tabs').querySelector('.tabs__content--active').classList.remove('tabs__content--active');
            document.querySelector(`.tabs__content${target}`).classList.add('tabs__content--active');
        });
    });
});
