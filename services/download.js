import fs from 'fs'
import axios from 'axios'

export async function DownloadImage(ctx, filePath) {
  const writer = fs.createWriteStream(filePath)
  const fileId = ctx.update.message.document.file_id

  await ctx.telegram.getFileLink(fileId).then((url) => {
    axios({
      method: 'get',
      url: url.toString(),
      responseType: 'stream',
    }).then((res) => {
      return new Promise(() => {
        res.data
          .pipe(writer)
          .on('error', () => writer.close())
          .on('finish', () => console.log('Success upload!'))
      })
    })
  })
}

// const DeleteImage = (filePath) => {
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       return
//     }
//     console.log('file deleted')
//   })
// }
