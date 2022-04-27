const bot = window.Telegram.WebApp;
const cart = [];
document.addEventListener("DOMContentLoaded", () => {
  let cartClick = document.getElementById("cart");
  let storeClick = document.getElementById("store");
  bot.ready();

  document.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      cart.push(e.currentTarget.parentNode.id);
      console.log(cart);
      bot.MainButton.setText("Checkout");
      bot.MainButton.show();
      //bot.MainButton.enable(); //swapped
    })
  );

  // const clicked = () => {
  //   cartClick.style.display = "block";
  //   storeClick.style.display = "none";
  //   bot.MainButton.setText("onEventNoParams");
  //   console.log("onEventNoParams");
  // };

  //Telegram.WebApp.onEvent("mainButtonClicked", clicked());

  Telegram.WebApp.onEvent("mainButtonClicked", () => {
    cartClick.style.display = "block";
    storeClick.style.display = "none";
    bot.MainButton.setText("onEvent");
  });
  bot.expand();

  bot.MainButton.OnClick(() => {
    cartClick.style.display = "block";
    storeClick.style.display = "none";
    bot.MainButton.setText("onclick");
  });
});
