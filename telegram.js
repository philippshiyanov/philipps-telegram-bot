document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  let cart = [];

  document.querySelectorAll("button").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      cart.push(e.currentTarget.parentNode.id);
      console.log(cart);
      bot.MainButton.setText(e.currentTarget.parentNode.id);
      bot.MainButton.show();
    })
  );

  bot.ready();
  bot.expand(); //works
});
