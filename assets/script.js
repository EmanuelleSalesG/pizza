const doc = (element) => document.querySelector(element);
const docAll = (element) => document.querySelectorAll(element)


pizzaJson.map((item, index)=>{
    
    let pizzaItem = doc('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = "R$ " + item.price.toFixed(2);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    doc('.pizza-area').appendChild(pizzaItem);

});

