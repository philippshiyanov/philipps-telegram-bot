import { Markup } from 'telegraf'

export const WebAppLink =
  'https://fd3e-37-110-244-70.eu.ngrok.io/webapp/index.php'
// ngrok http http://localhost:3000

//app.js
export const adminButtonMarkup = Markup.inlineKeyboard([
  Markup.button.callback('Yes', 'adminBtn'),
]).resize()

//startWizard.js
export const webAppMarkup = Markup.keyboard([
  Markup.button.webApp(
    'Order Here',
    WebAppLink,
    // 'https://philippshiyanov.github.io/philipps-telegram-bot/',
  ),
]).resize()

//adminWizard.js
export const adminWizardMarkup = Markup.inlineKeyboard([
  [
    Markup.button.webApp('View Shop', WebAppLink),
    Markup.button.callback('Edit Shop', 'editShop'),
  ],
  [
    Markup.button.callback('Add Item', 'addItem'),
    Markup.button.callback('Delete Item', 'delItem'),
  ],
]).resize()

//addItemWizard.js
export const continueMarkup = Markup.inlineKeyboard([
  Markup.button.callback('Add more', 'addItem'),
  Markup.button.callback('Finished', 'adminBtn'),
])
  .oneTime()
  .resize()

//deleteItemWizard.js
export function deleteMarkup(row) {
  return Markup.inlineKeyboard([
    Markup.button.callback(`Delete Item ${row}`, row),
  ]).resize()
}

export const deleteDoneMarkup = Markup.inlineKeyboard([
  Markup.button.callback('Finished deleting', 'adminBtn'),
])
  .oneTime()
  .resize()
