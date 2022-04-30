document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  let cart = [];
  let cartClick = document.getElementById("cart");
  let storeClick = document.getElementById("store");
  bot.ready();

  const addBtn = document.querySelectorAll("#add");
  const plus = document.querySelectorAll("#plus");
  const minus = document.querySelectorAll("#minus");
  const minus_plus = document.querySelectorAll("#minus-plus");
  const counter = document.querySelectorAll(".count");
  addBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      let itemID = e.currentTarget.parentNode.id;
      cart.push(itemID);
      console.log(cart);
      bot.MainButton.setText("Checkout");
      bot.MainButton.show();
      //shows the - + buttons
      addBtn[itemID - 1].style.display = "none";
      minus_plus[itemID - 1].style.display = "block";
      //item counter
      counter[itemID - 1].style.display = "block";
      counter[itemID - 1].children[0].innerHTML = cart.filter(
        (x) => x == itemID
      ).length;
    })
  );

  plus.forEach((plus) =>
    plus.addEventListener("click", (e) => {
      let itemID = e.currentTarget.parentNode.parentNode.id;
      cart.push(itemID);
      //update counter
      counter[itemID - 1].children[0].innerHTML = cart.filter(
        (x) => x == itemID
      ).length;
      console.log(cart);
    })
  );

  minus.forEach((minus) =>
    minus.addEventListener("click", (e) => {
      let itemID = e.currentTarget.parentNode.parentNode.id;
      //deletes selected element from cart array
      cart.splice(
        cart.findIndex((index) => index === itemID),
        1
      );

      //if array doesn't contain element then the minus button is hidden
      if (cart.findIndex((index) => index === itemID) == -1) {
        addBtn[itemID - 1].style.display = "block";
        minus_plus[itemID - 1].style.display = "none";
      }
      //clear counter if 0
      if (cart.filter((x) => x == itemID).length == 0) {
        counter[itemID - 1].style.display = "none";
      } else {
        counter[itemID - 1].children[0].innerHTML = cart.filter(
          (x) => x == itemID
        ).length;
      }

      console.log(cart);
    })
  );

  Telegram.WebApp.onEvent("mainButtonClicked", () => {
    bot.MainButton.setText("Continue");
    document.querySelectorAll(".item").forEach((item) => {
      cart.forEach((cartItem) => {
        if (item.id == cartItem) {
          let div = document.createElement("div");
          let h4Name = document.createElement("h4");
          let h4Price = document.createElement("h4");
          div.classList.add("cart-item");
          h4Name.innerHTML = item.children[1].children[0].innerHTML;
          h4Price.innerHTML = item.children[1].children[1].innerHTML;
          div.appendChild(h4Name);
          div.appendChild(h4Price);
          cartClick.appendChild(div);
        }
      });
    });
    cartClick.style.display = "block";
    storeClick.style.display = "none";
    bot.MainButton.hide();
  });

  bot.expand();
});
