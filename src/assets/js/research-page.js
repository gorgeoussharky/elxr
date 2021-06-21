jQuery(() => {
    document.querySelectorAll('.research-item__toggler, .research-item__heading').forEach((el) => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            this.closest('.research-item').classList.toggle('research-item--active');
        });
    });
});
