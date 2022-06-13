import 'dotenv/config'
import { Composer, Scenes, Markup } from 'telegraf'
import { webAppMarkup } from '../assets/buttons.js'
import { getItem } from '../services/database.js'
import { getInvoice } from '../services/invoice.js'
const gcID = process.env.GC

const startStep = new Composer()
const storeStep = new Composer()
const successfulPaymentStep = new Composer()

let orderedItems = {}

startStep.start(async (ctx) => {
  try {
    await ctx.reply(
      'Welcome! Press the button below to open the store.',
      webAppMarkup,
    )
    await ctx.wizard.next()
  } catch (e) {
    console.log(e)
    ctx.scene.leave()
  }
})

storeStep.on('web_app_data', async (ctx) => {
  let cart = ctx.webAppData.data.json()

  console.log(cart)

  await getItem(cart, async (items, image, cartItems) => {
    await ctx.reply(items.join('\n'))
    const imageCheckout = image[0].replace(
      '/Users/phil/Documents/philipps-telegram-bot',
      'https://fd3e-37-110-244-70.eu.ngrok.io',
    )
    orderedItems = Object.assign([], cartItems)
    await ctx.replyWithInvoice(
      getInvoice(ctx.from.id, imageCheckout, cartItems),
    )
  })
  await ctx.wizard.next()
})

successfulPaymentStep.on('successful_payment', async (ctx) => {
  console.log(ctx.session)
  // reply in case of positive payment
  await ctx.reply('Payment was successful! Please await your order :)')
  const itemsOrdered = orderedItems.map((item) => {
    return item['label']
  })
  itemsOrdered.join(`, `)
  let order = ctx.update.message.successful_payment
  let today = new Date()

  //items minimum cost is 65,75 RUB

  await ctx.telegram.sendMessage(
    gcID,
    `Order purchased ${ctx.from.id}_${Number(today)} at ${today
      .toISOString()
      .slice(0, 19)}, \nOrder info: \n From: @${
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
    {
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.callback('Approve', 'approve_' + ctx.from.id),
            Markup.button.callback('Deny', 'deny_' + ctx.from.id),
          ],
        ],
      },
    },
  )
  await ctx.wizard.next()
})

export const startScene = new Scenes.WizardScene(
  'startWizard',
  startStep,
  storeStep,
  successfulPaymentStep,
)
