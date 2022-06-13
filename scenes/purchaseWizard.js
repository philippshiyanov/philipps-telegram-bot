import { Composer, Scenes } from 'telegraf'
import {} from '../assets/buttons.js'

const gcID = process.env.GC
const webappData = new Composer()
const successfulPaymentStep = new Composer()
const replyStep = new Composer()

successfulPaymentStep.on('callback_query', async (ctx) => {
  console.log(ctx.session)
  await ctx.answerCbQuery()

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
            { text: 'Approve Purchase', callback_data: 'approve' },
            { text: 'Deny Purchase', callback_data: 'deny' },
          ],
        ],
      },
    },
  )
})

replyStep.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery()
  let selectedItem = ctx.callbackQuery.data

  if (selectedItem == 'approve') {
    ctx.reply(
      'Your purchase has been verified! Please wait till delivery contacts you.',
    )
  } else {
    ctx.reply(
      'There seems to be a problem with your order, we will contact you.',
    )
  }
  await ctx.scene.leave()
})

export const purchaseScene = new Scenes.WizardScene(
  'purchaseWizard',
  webappData,
  successfulPaymentStep,
  replyStep,
)
