document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('de-DE', {
        currency: 'eur',
        style: 'currency'
    }).format(node.textContent);
});

const $cart = document.querySelector('#cart');
console.log($cart);
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;

            fetch('/cart/remove/' + id, {
                method: 'delete' 
            })
            .then(res => res.json())
            .then(cart => {console.log(cart);});
        }
    });
}