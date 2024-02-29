import dotenv from "dotenv"
import pg from "pg"

const { Pool } = pg

dotenv.config()
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASS
const port = process.env.DB_PORT

const pool = new Pool({
    user: user,
    host: host,
    database: "keeper",
    password: password,
    port: port
})

export default pool