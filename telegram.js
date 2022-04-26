document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  bot.ready();
  bot.MainButton.text("Click here!");
  bot.show();
});
