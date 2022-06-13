import { startDb } from './dbStart.js'

//startDb().run('DELETE FROM items')
// db.run('CREATE TABLE items(id INTEGER PRIMARY KEY, name, price, image)')

export async function InsertData(ctx, filePath) {
  let sql = `INSERT INTO items(name, price, image) VALUES (?,?,?)`
  const db = startDb()

  db.run(
    sql,
    [ctx.wizard.state.data.itemName, ctx.wizard.state.data.itemPrice, filePath],
    (err) => {
      if (err) return console.error(err.message)
      console.log('item recorded!')
    },
  )
  db.close()
}

export async function ExportData(callback) {
  const db = startDb()
  const sql = `SELECT * FROM items ORDER BY id ASC`
  let itemsToDelete = []

  db.each(
    sql,
    (err, rows) => {
      if (err) return console.error(err.message)
      //console.log(`Item #${rows.id} name: ${rows.name}, price: ${rows.price}`)
      itemsToDelete[rows.id] = rows
    },
    () => {
      callback(itemsToDelete)
    },
  )

  db.close()
}

export async function DeleteSelectedItem(idTODelete) {
  const db = startDb()
  const sql = `DELETE FROM items WHERE id = ${idTODelete}`
  db.run(sql)
  db.close()
}

export async function getItem(cart, callback) {
  const db = startDb()
  const cartArr = []
  let itemsArr = ['Your order:\n']
  let itemPriceTotal = 0
  let invoiceImg = []

  Promise.all(
    Object.entries(cart).map(([key, value]) => {
      return new Promise((resolve) => {
        db.each(
          `SELECT name, price, image FROM items WHERE id = ${key} ORDER BY id ASC`,
          (err, rows) => {
            if (err) return console.error(err.message)
            let itemObj = {}
            itemPriceTotal += value * rows.price
            invoiceImg.push(rows.image)
            itemObj['label'] = `${rows.name} x${value}`
            itemObj['amount'] = value * rows.price * 100
            cartArr.push(itemObj)
            resolve(` ${rows.name} x ${value} –  ₽${value * rows.price}`)
          },
        )
      })
    }),
  ).then((items) => {
    itemsArr.push(...items)
    // console.log(`items array: ${items}`)
    // console.log(`cart array: ${JSON.stringify(cartArr)}`)
    itemsArr.push(`\n Total ––  ₽${itemPriceTotal}`)
    callback(itemsArr, invoiceImg, cartArr)
  })

  db.close()
}
