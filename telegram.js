document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;

  const btn1 = document.getElementById("btn-1");
  btn1.addEventListener("click", () => {
    bot.MainButton.show();
    bot.MainButton.setText("Here!");
  });

  bot.ready();
  bot.expand(); //works
});
