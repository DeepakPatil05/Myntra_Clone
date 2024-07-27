let bagItems;

onLoad();

function onLoad(){
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [] ;
  displayItemsOnHomePage();
  displayBagIcon();
}

function addToBag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon(){
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if(bagItems.length > 0){
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  }
  else{
    bagItemCountElement.style.visibility = 'hidden';
    }
}


function displayItemsOnHomePage(){
  let itemsContainerElement = document.querySelector(".items-container");
  if(!itemsContainerElement) return;
innerHtml = '';
item.forEach(element => {
  innerHtml +=
`<div class="item1">
  <img class="item-image" src="${element.image}">
  <div class="rating">${element.rating.stars}⭐ | ${element.rating.count}</div>
  <div class="company-name">${element.company}</div>
  <div class="item-name">${element.item_name}</div>
  <div class="price">
    <span class="current-price">Rs ${element.current_price}</span>
    <span class="original-price">Rs ${element.original_price}</span>
    <span class="discount">(${element.discount_percentage}% OFF)</span>
  </div>
  <button class="btn-add-bag" onclick="addToBag(${element.id})">Add to Bag</button>
</div>`
});

itemsContainerElement.innerHTML = innerHtml;
}

