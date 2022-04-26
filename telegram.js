document.addEventListener("DOMContentLoaded", () => {
  const btn1 = document.getElementById("btn-1");
  btn1.addEventListener("click", () => {
    bot.MainButton.show();
    bot.MainButton.setText("Here!");
  });
  const bot = window.Telegram.WebApp;
  bot.ready();
  bot.MainButton.text = "hello";
  bot.InlineKeyboardButton =
    "https://philippshiyanov.github.io/philipps-telegram-bot/";
  bot.MainButton.setText("Here!"); //doesnt work
  bot.MainButton.onClick(() => {
    bot.sendData("1");
  });
  bot.expand(); //works
});
