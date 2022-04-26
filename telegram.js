document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  window.Telegram.WebApp.MainButton.setText("Here!"); //doesnt work
  bot.ready();
  bot.expand(); //works
  window.Telegram.WebApp.MainButton.setText("Here!"); //doesnt work
});
