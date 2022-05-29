import { Composer, Scenes } from 'telegraf'
import { webAppMarkup } from '../assets/buttons.js'

const startStep = new Composer()

startStep.start(async (ctx) => {
  try {
    await ctx.reply(
      'Welcome! Press the button below to open the store.',
      webAppMarkup,
    )
    ctx.scene.leave()
  } catch (e) {
    console.log(e)
    ctx.scene.leave()
  }
})

// startStep.on('web_app_data', async (ctx) => {
//   console.log(ctx.webAppData.data.json())
//   ctx.reply(ctx.webAppData.data.json())
// })
export const startScene = new Scenes.WizardScene('startWizard', startStep)
