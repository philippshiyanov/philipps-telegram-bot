document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  let cart = [];

  document.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      cart.push(e.currentTarget.parentNode.id);
      console.log(cart);
      bot.MainButton.setText("Checkout");
      bot.MainButton.show();
      bot.MainButton.enable(); //swapped
    })
  );

  bot.MainButton.OnClick(() => {
    document.getElementById("cart").style.display = "block";
    document.getElementById("store").style.display = "none";
    bot.MainButton.setText("onclick");
  });

  Telegram.WebApp.onEvent("mainButtonClicked", () => {
    document.getElementById("cart").style.display = "block";
    document.getElementById("store").style.display = "none";
    bot.MainButton.setText("onEvent");
  });
  function clicked() {
    document.getElementById("cart").style.display = "block";
    document.getElementById("store").style.display = "none";
    bot.MainButton.setText("onEventNoParams");
  }
  Telegram.WebApp.onEvent("mainButtonClicked", clicked());

  bot.ready();
  bot.expand(); //works
});
