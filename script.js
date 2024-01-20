const foodItems = document.getElementById("food_items");
let foodData;
document.addEventListener("DOMContentLoaded", () => {});

function getMenu() {
  return fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => showMenu(data))
    .catch((e) => console.log(e));
}

function showMenu(data) {
  foodData = data;
  foodData.map((item) => {
    foodItems.innerHTML += `
      <div id="${item.id}" class="food_card">
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="card_text">
              <div>
                  <h3>${item.name}</h3>
                  <p>$${item.price}/-</p>
              </div>
              <div>
                  <i class="fa-solid fa-square-plus"></i>
              </div>
          </div>
      </div>
      `;
  });
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomBurgers = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * foodData.length);
        randomBurgers.push(foodData[randomIndex]);
      }
      const order = { burgers: randomBurgers };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: false };
      resolve(orderStatus);
    }, 1500);
  });
}

function payOrder(orderStatus) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      orderStatus = { ...orderStatus, paid: true };
      resolve(orderStatus);
    }, 1000);
  });
}

function thankYouFnc() {
  alert("Thank you for eating with us today!");
}

getMenu()
  .then(() => takeOrder())
  .then((order) => orderPrep(order))
  .then((orderStatus) => payOrder(orderStatus))
  .then((orderStatus) => {
    if (orderStatus.paid) {
      thankYouFnc();
    }
  })
  .catch((err) => console.log(err));
