import sqlite3 from 'sqlite3'

export function startDb() {
  const db = new sqlite3.Database(
    'services/items.db',
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message)
      console.log('db connection successful')
    },
  )
  return db
}
