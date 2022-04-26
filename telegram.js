document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  bot.ready();
  bot.expand(); //works
  bot.MainButton.setText("Here!"); //doesnt work
  bot.MainButton.onClick(() => {
    bot.sendData("1");
  });
});
