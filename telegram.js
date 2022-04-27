document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  const cart = [];
  let cartClick = document.getElementById("cart");
  let storeClick = document.getElementById("store");
  bot.ready();

  document.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      cart.push(e.currentTarget.parentNode.id);
      console.log(cart);
      bot.MainButton.setText("Checkout");
      bot.MainButton.show();
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
  }).then(() => {
    Telegram.WebApp.offEvent("mainButtonClicked", () => {
      cartClick.style.display = "none";
      storeClick.style.display = "grid";
      Telegram.WebApp.hide();
    });
  });
  bot.expand();
});
