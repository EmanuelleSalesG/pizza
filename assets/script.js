const doc = (element) => document.querySelector(element);
const docAll = (element) => document.querySelectorAll(element);
let modalQt = 1;
let cart = [];
let modalkey = 0;

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
        modalkey = key;

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
});

doc('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    
    if(modalQt > 1){
        modalQt--;
        doc('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

doc('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    doc('.pizzaInfo--qt').innerHTML = modalQt;
});

//CREATE A SELECTION SIZE BUTTON
docAll('.pizzaInfo--size').forEach((size, index)=>{
    size.addEventListener('click', (e)=>{
        doc('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//CART
doc('.pizzaInfo--addButton').addEventListener('click', ()=>{
    

    //ADD TO CART
    let size = parseInt(doc('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[modalkey].id + '@' + size;

    let key = cart.findIndex(item => item.identifier === identifier);
    
    if(key > -1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalkey].id,
            size,
            qt: modalQt
        });
    }
    updateCart();
    closeWindow();
});

function updateCart(){
    if(cart.length > 0){
        doc('aside').classList.add('show');
        doc('.cart').innerHTML = '';

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=> item.id === cart[i].id);

            //FILL CART
            let cartItem = doc('.models .cart--item').cloneNode(true);
            cartItem.querySelector('img').src = pizzaItem.img;


            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2: 
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName =  `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            
            doc('.cart').append(cartItem); 
        }

    }else{
        doc('aside').classList.remove('show');
    }
}



