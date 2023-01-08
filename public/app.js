document.querySelectorAll('.price').forEach( node => {
    node.textContent = new Intl.NumberFormat('de-DE', {
        currency: 'eur',
        style: 'currency'
    }).format(node.textContent);
});