document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  let cart = [];
  bot.ready();

  document.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      cart.push(e.currentTarget.parentNode.id);
      console.log(cart);
      bot.MainButton.setText("Checkout");
      bot.MainButton.show();
      bot.MainButton.enable(); //swapped
    })
  );

  function clicked() {
    document.getElementById("cart").style.display = "block";
    document.getElementById("store").style.display = "none";
    bot.MainButton.setText("onEventNoParams");
  }
  Telegram.WebApp.onEvent("mainButtonClicked", clicked());
  bot.expand();
  Telegram.WebApp.onEvent("mainButtonClicked", () => {
    document.getElementById("cart").style.display = "block";
    document.getElementById("store").style.display = "none";
    bot.MainButton.setText("onEvent");
  });

  // bot.MainButton.OnClick(() => {
  //   document.getElementById("cart").style.display = "block";
  //   document.getElementById("store").style.display = "none";
  //   bot.MainButton.setText("onclick");
  // });
});
