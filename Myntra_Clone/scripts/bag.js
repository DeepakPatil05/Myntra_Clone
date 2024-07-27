let bagItemObjects;
onLoad();

function onLoad(){
  loadBagItemObjects();
  displayBagItems();
  showSummary();
}

function loadBagItemObjects(){
  bagItemObjects = bagItems.map(itemId => {
    for(let i = 0;i<item.length;i++){
      if(itemId == item[i].id){
        return item[i];
      }
    }
  })
}

function displayBagItems(){
  let bagContainer = document.querySelector(".bag-items-container");
  let newHtml = '';
  bagItemObjects.forEach(element => {
    newHtml +=
    `<div class="bag-item-container">
    <div class="item-left-part">
        <img class="bag-item-img" src="../${element.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${element.company}</div>
        <div class="item-name">${element.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${element.current_price}</span>
          <span class="original-price">Rs ${element.original_price}</span>
          <span class="discount-percentage">(${element.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${element.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${element.delivery_date}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="remove(${element.id})">X</div>
      </div>
      </div>
    `
  });
  bagContainer.innerHTML = newHtml;
}

function remove(itemID){
  bagItems = bagItems.filter(bagItemId => bagItemId != itemID);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  onLoad();
}

function showSummary(){
  let summary = document.querySelector(".bag-summary");
  let newHtml = '';
  let qty = bagItemObjects.length;
  let total_mrp = 0;
  let discount = 0;
  bagItemObjects.forEach(element => {
    total_mrp += element.original_price;
    discount += element.original_price - element.current_price;
  })
  let convenience_fee = 99;
  if(qty==0) convenience_fee=0;
  
  let total_amt = total_mrp - discount + convenience_fee;
  newHtml = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${qty} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${total_mrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${discount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenience_fee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${total_amt}</span>
            </div>
            <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
          </div>`;
  summary.innerHTML = newHtml;
}
