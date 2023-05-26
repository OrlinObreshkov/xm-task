function populateCrypto() {
  const items = document.querySelectorAll('[data-crypto]');
  const url = 'https://api.coinlore.net/api/tickers/';

  if (!items && !items.length) return;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    })
    .then(data => {
      items.forEach((item) => {
        const symbol = item.dataset.crypto;
        const currentCrypto = data.data.filter(crypto => crypto.symbol.toLowerCase() == symbol)[0];

        console.log(currentCrypto)
        if (!currentCrypto) return;
        
        const iconElement = item.querySelector('[data-icon]');
        const symbolElement = item.querySelector('[data-symbol]');
        const nameElement = item.querySelector('[data-name]');
        const priceElement = item.querySelector('[data-price]');
        const metaElement = item.querySelector('[data-meta]');

        iconElement.classList.add(currentCrypto.nameid);
        symbolElement.textContent = currentCrypto.symbol;
        nameElement.textContent = currentCrypto.name;
        priceElement.textContent = currentCrypto.price_usd;
        metaElement.textContent = currentCrypto.percent_change_24h.replace(/-/g, "");;

        if (currentCrypto.percent_change_24h > 0) {
          metaElement.parentNode.classList.add('up');
        } else {
          metaElement.parentNode.classList.add('down');
        }
      });
      
    })
    .catch(error => {
      console.error(error);
    });
}

populateCrypto();