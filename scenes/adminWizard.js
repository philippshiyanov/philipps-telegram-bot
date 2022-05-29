import { Composer, Scenes } from 'telegraf'
import { adminWizardMarkup } from '../assets/buttons.js'
const adminToken = process.env.ADMIN_ID

const adminStep = new Composer()
const adminNav = new Composer()

adminStep.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery()
  console.log(ctx.session)
  if (ctx.callbackQuery.from.id == adminToken) {
    try {
      await ctx
        .reply(
          `Hello admin! Please select what you want to do below.`,
          adminWizardMarkup,
        )
        .then(ctx.wizard.next())
    } catch (e) {
      console.log(e)
      ctx.scene.leave()
    }
  }
  ctx.scene.leave()
})

adminNav.action('addItem', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)
  await ctx.scene.enter('addWizard')
})
adminNav.action('delItem', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)
  await ctx.scene.enter('delWizard')
})

export const adminScene = new Scenes.WizardScene(
  'adminWizard',
  adminStep,
  adminNav,
)

// To edit the keyboard you need to use a separate method
// ctx.tg.editMessageReplyMarkup(chatId, messageId, {
//   inlineKeyboard: [
//     Markup.button.callback('Button', 'unique-id')
//   ]
// })
