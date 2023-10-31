const doc = (element) => document.querySelector(element);
const docAll = (element) => document.querySelectorAll(element);
let modalQt = 1;

//LISTING PIZZAS
pizzaJson.map((item, index)=>{
    
    let pizzaItem = doc('.models .pizza-item').cloneNode(true);

    //SETTING VALUES MAIN PAGE
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = "R$ " + item.price.toFixed(2);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    
    pizzaItem.querySelector('a').addEventListener('click', (e)=> {
        e.preventDefault();

        //INFORMATION WINDOW
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;

        doc('.pizzaBig img').src = pizzaJson[key].img;
        doc('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        doc('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        doc('.pizzaInfo--actualPrice').innerHTML = "R$ " + pizzaJson[key].price.toFixed(2);

        //REMOVE SELECTED PIZZAS SIZE
        doc('.pizzaInfo--size.selected').classList.remove('selected');

        //PIZZA SIZES AND SELECTED THE BIGGEST PIZZA
        docAll('.pizzaInfo--size').forEach((size, index)=>{
            if(index == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[index];
        });

        doc('.pizzaInfo--qt').innerHTML = modalQt;

        //ANIMATION WINDOW
        doc('.pizzaWindowArea').style.opacity = 0;
        doc('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            doc('.pizzaWindowArea').style.opacity = 1;
        }, 200);
        
    });
    
    doc('.pizza-area').appendChild(pizzaItem);

});

// WINDOW (POP-UP) EVENTS
function closeWindow(button){
    doc('.pizzaWindowArea').style.opacity = 0;
    
    setTimeout(()=>{
        doc('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

docAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click', closeWindow);
})

