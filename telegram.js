document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  let cart = [];

  document.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      cart.push(e.currentTarget.parentNode.id);
      console.log(cart);
      bot.MainButton.setText("Checkout");
      bot.MainButton.show(); //swapped
    })
  );

  bot.MainButton.OnClick(() => {
    document.getElementById("cart").style.display = "block";
    document.getElementById("store").style.display = "none";
  });

  bot.ready();
  bot.expand(); //works
});
