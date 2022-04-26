document.addEventListener("DOMContentLoaded", () => {
  const bot = window.Telegram.WebApp;
  bot.ready();
  bot.MainButton.SetText("Click here!");
});
