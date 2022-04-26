document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  bot.ready();
  bot.expand();
  bot.MainButton.setText("Here!");
  bot.show();
});
