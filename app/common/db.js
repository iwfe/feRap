import monk from 'monk'

import config from '../config'

const db = monk(`${config.host}/${config.db}`)
// const db = monk(`localhost/fete`)

export default db
