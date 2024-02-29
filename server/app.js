import express from "express"
import pool from "./db.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.APP_PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/notes", (req, res) => {
    pool.query('SELECT * FROM notes', (err, queryResult) => {
        if (err) {
            console.error("Error executing query", err.stack)
        } else {
            res.send(queryResult.rows)
        }
    })
})

app.post("/add", (req, res) => {
    const {id, title, body} = req.body

    pool.query('INSERT INTO notes (id, title, body) VALUES ($1, $2, $3)', 
    [id, title, body],
    (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack)
            res.status(500).send('Error executing query')
        } else {
            res.status(201)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params

    pool.query('DELETE FROM notes WHERE id = $1',
    [id],
    (err, results) => {
        if (err) {
            console.error('Error executing query', err.stack)
            res.status(500).send('Error executing query')
        } else {
            res.status(200).send('Note deleted successfully')
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})