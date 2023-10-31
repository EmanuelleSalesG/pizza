const doc = (element) => document.querySelector(element);
const docAll = (element) => document.querySelectorAll(element)


pizzaJson.map((item, index)=>{
    
    let pizzaItem = doc('.models .pizza-item').cloneNode(true);
    
    doc('.pizza-area').appendChild(pizzaItem);


});

