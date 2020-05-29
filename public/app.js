const toCurrency = price => {
  return new Intl.NumberFormat('ua-UA', {
    currency: 'UAH',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')
if ($card){
  $card.addEventListener('click', event => {
    if(event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      
      
      fetch('/card/remove/' +id, {
        method: 'DELETE'
      }).then(res => res.json())
      .then(card => {
        if(card.courses.length){
          const html = card.courses.map(it => {
            return `
            <tr>
              <td>${it.title}</td>
              <td>${it.count}</td>
              <td>
                <button class="btn btn-small js-remove" data-id="${it.id}">Delete</button>
              </td>
            </tr>
            `
          }).join('')
          $card.querySelector('tbody').innerHTML = html
          $card.querySelector('.price').textContent = toCurrency(card.price)
        } else {
          $card.innerHTML = '<h4>The cart is empty</h4>'
        }
      })
    }
    
  })
}