document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        document.querySelectorAll('.trainer-card').forEach(c => c.classList.remove('active'));
        if (!isActive) {
            this.classList.add('active');
        }
    });
});