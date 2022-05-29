import { Composer, Scenes } from 'telegraf'
import { DownloadImage } from '../services/download.js'
import { InsertData } from '../services/database.js'
import { continueMarkup } from '../assets/buttons.js'
import path from 'path'

const startStep = new Composer()
const nameStep = new Composer()
const priceStep = new Composer()
const imgStep = new Composer()
const endStep = new Composer()

let nameMessageID
let nameSentMessageID
let priceMessageID
let priceSentMessageID
let imageMessageID
let imageSentMessageID

startStep.on('callback_query', async (ctx) => {
  console.log(ctx.session)
  await ctx.answerCbQuery()
  try {
    ctx.wizard.state.data = {}
    nameSentMessageID = await ctx.reply('Enter name of item:')
    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
    ctx.scene.leave()
  }
})

nameStep.on('text', async (ctx) => {
  try {
    nameMessageID = ctx.message.message_id
    ctx.wizard.state.data.itemName = ctx.message.text
    priceSentMessageID = await ctx.reply('Enter price of item:')
    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
    ctx.scene.leave()
  }
})

priceStep.on('text', async (ctx) => {
  try {
    priceMessageID = ctx.message.message_id
    ctx.wizard.state.data.itemPrice = ctx.message.text
    imageSentMessageID = await ctx.reply(`Send photo of item:`)
    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
    ctx.scene.leave()
  }
})

imgStep.on('document', async (ctx) => {
  try {
    imageMessageID = ctx.message.message_id

    const filePath = path.resolve(
      `assets/images/tmp`,
      `${ctx.update.message.document.file_name}`,
    )

    await DownloadImage(ctx, filePath)
    await InsertData(ctx, filePath)
    await ctx.reply(
      `Item ${ctx.wizard.state.data.itemName} @ $${ctx.wizard.state.data.itemPrice} was added to the store!\nWould you like to add one more?`,
      continueMarkup,
    )

    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
    ctx.scene.leave()
  }
})

endStep.action('addItem', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)

  ctx.deleteMessage(nameMessageID)
  ctx.deleteMessage(nameSentMessageID.message_id)
  ctx.deleteMessage(priceMessageID)
  ctx.deleteMessage(priceSentMessageID.message_id)
  ctx.deleteMessage(imageMessageID)
  ctx.deleteMessage(imageSentMessageID.message_id)

  await ctx.scene.enter('addWizard')
})
endStep.action('adminBtn', async (ctx) => {
  ctx.deleteMessage(ctx.callbackQuery.message.message_id)

  ctx.deleteMessage(nameMessageID)
  ctx.deleteMessage(nameSentMessageID.message_id)
  ctx.deleteMessage(priceMessageID)
  ctx.deleteMessage(priceSentMessageID.message_id)
  ctx.deleteMessage(imageMessageID)
  ctx.deleteMessage(imageSentMessageID.message_id)

  await ctx.scene.enter('adminWizard')
})

export const addScene = new Scenes.WizardScene(
  'addWizard',
  startStep,
  nameStep,
  priceStep,
  imgStep,
  endStep,
)

// db.all(`SELECT * FROM items`, [], (err, rows) => {
//   if (err) return console.error(err.message)
//   rows.forEach((row) => {
//     console.log(row)
//   })
// })
// db.close((err) => {
//   if (err) return console.error(err.message)
// })

// `Item successfully added! Name: ${ctx.wizard.state.data.itemName}, Price: ${ctx.wizard.state.data.itemPrice}`
// const deleteFile = (filePath) => {
//     fs.unlink(filePath, (err) => {
//         if (err) {
//           return
//         }
//         console.log('file deleted')
//       })
//     }
