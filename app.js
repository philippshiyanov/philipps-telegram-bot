import 'dotenv/config'
import { Scenes, session, Telegraf } from 'telegraf'
import { addScene } from './scenes/addItemWizard.js'
import { delScene } from './scenes/deleteItemWizard.js'
import { adminScene } from './scenes/adminWizard.js'
import { startScene } from './scenes/startWizard.js'
import { adminButtonMarkup } from './assets/buttons.js'
import { getItem } from './services/database.js'
import { getInvoice } from './services/invoice.js'

const botToken = process.env.BOT_TOKEN
const adminToken = process.env.ADMIN_ID
const gcID = process.env.GC

let orderedItems = {}

if (botToken === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(botToken)
const stage = new Scenes.Stage([startScene, adminScene, addScene, delScene])

bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => await ctx.scene.enter('startWizard'))
bot.action('addItem', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)
  await ctx.scene.enter('addWizard')
})
bot.action('delItem', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)
  await ctx.scene.enter('delWizard')
})
bot.action('adminBtn', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)
  await ctx.scene.enter('adminWizard')
})
bot.command('admin', async (ctx) => {
  if (ctx.message.from.id == adminToken) {
    await ctx.reply(`Enter Admin mode?`, adminButtonMarkup)
  }
})

bot.on('web_app_data', async (ctx) => {
  let cart = ctx.webAppData.data.json()

  console.log(cart)

  await getItem(cart, async (items, image, cartItems) => {
    await ctx.reply(items.join('\n'))
    const imageCheckout = image[0].replace(
      '/Users/phil/Documents/philipps-telegram-bot',
      'https://5211-91-221-102-251.eu.ngrok.io',
    )
    orderedItems = Object.assign([], cartItems)
    await ctx.replyWithInvoice(
      getInvoice(ctx.from.id, imageCheckout, cartItems),
    )
  })
})

bot.on('pre_checkout_query', (ctx) =>
  ctx.answerPreCheckoutQuery(
    true,
    'Oops, there seems to be an error with the payments, please come back later.',
  ),
) // response to a preliminary request for payment

bot.on('successful_payment', async (ctx, next) => {
  // reply in case of positive payment
  console.log(orderedItems)
  //console.log(ctx.update.message.successful_payment)
  const itemsOrdered = orderedItems.map((item) => {
    return item['label']
  })
  itemsOrdered.join(`, `)
  console.log(itemsOrdered)
  let order = ctx.update.message.successful_payment
  await ctx.reply('SuccessfulPayment')
  await ctx.telegram.sendMessage(
    gcID,
    `Order purchased #number, \nOrder info: \n From: @${
      ctx.message.from.username || ctx.message.from.first_name
    } \n Phone number: ${order.order_info.phone_number} \n Email: ${
      order.order_info.email
    } \n Order: ${itemsOrdered} \n Total amount paid: ${
      order.total_amount / 100
    } ${order.currency} \n Address: ${
      order.order_info.shipping_address.city
    }, ${order.order_info.shipping_address.street_line1}, ${
      order.order_info.shipping_address.street_line2
    }`,
  )
})

bot.launch().then(console.log('bot launched successfully!'))
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
