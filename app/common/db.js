import monk from 'monk'
import config from '../config'

const db = monk(`${config.mongodb.host}/${config.mongodb.db}`)

export default db
