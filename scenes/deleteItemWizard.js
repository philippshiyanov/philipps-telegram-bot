import { Composer, Scenes } from 'telegraf'
import { DeleteSelectedItem, ExportData } from '../services/database.js'
import { deleteDoneMarkup, deleteMarkup } from '../assets/buttons.js'

const startStep = new Composer()
const deleteStep = new Composer()

let messagesSentToDelete = []
let messagesToDelete
let finishButton

startStep.on('callback_query', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    ctx.wizard.state.data = {}

    await ExportData(async (rows) => {
      await rows.reduce(async (acc, row) => {
        await acc
        messagesToDelete = await ctx.replyWithPhoto(
          { source: row.image },
          {
            caption: `Item #${row.id} name: ${row.name}, price: ${row.price}`,
            ...deleteMarkup(row.id),
          },
        )
        messagesSentToDelete.push(messagesToDelete.message_id)
      }, Promise.resolve())
    })

    finishButton = await ctx.reply(
      'When you`re done deleting items click here!',
      deleteDoneMarkup,
    )

    return ctx.wizard.next()
  } catch (e) {
    console.log(e)
  }
})

deleteStep.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery()
  let selectedItem = ctx.callbackQuery.data
  let selectedItemMessage = ctx.callbackQuery.message.message_id

  messagesSentToDelete = messagesSentToDelete.filter(
    (item) => item !== selectedItemMessage,
  )

  if (selectedItem == 'adminBtn') {
    messagesSentToDelete.forEach((msg) => {
      ctx.deleteMessage(msg)
    })
    ctx.deleteMessage(finishButton.message_id)

    return await ctx.scene.enter('adminWizard')
  }

  await DeleteSelectedItem(selectedItem).then(
    ctx.deleteMessage(selectedItemMessage),
  )
})

export const delScene = new Scenes.WizardScene(
  'delWizard',
  startStep,
  deleteStep,
)
