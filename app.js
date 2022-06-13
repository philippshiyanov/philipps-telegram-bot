import 'dotenv/config'
import { Scenes, session, Telegraf } from 'telegraf'
import { addScene } from './scenes/addItemWizard.js'
import { delScene } from './scenes/deleteItemWizard.js'
import { adminScene } from './scenes/adminWizard.js'
import { startScene } from './scenes/startWizard.js'
import { adminButtonMarkup } from './assets/buttons.js'

const botToken = process.env.BOT_TOKEN
const adminToken = process.env.ADMIN_ID

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

bot.on('pre_checkout_query', (ctx) =>
  ctx.answerPreCheckoutQuery(
    true,
    'Oops, there seems to be an error with the payments, please come back later.',
  ),
) // response to a preliminary request for payment

bot.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery()
  let callback = ctx.callbackQuery.data
  let userID = callback.split('_').slice(1).join('_')

  console.log(userID)
  if (callback == 'approve_' + userID) {
    await ctx.telegram.sendMessage(
      userID,
      'Your purchase has been verified! Please wait till delivery contacts you.',
    )
  } else {
    await ctx.telegram.sendMessage(
      userID,
      'There has been an error with your order, we will contact you shortly!',
    )
  }
})

bot.launch().then(console.log('bot launched successfully!'))
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
