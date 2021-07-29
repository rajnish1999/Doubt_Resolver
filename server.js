const express = require('express')
require('dotenv').config()

require('./database/db')
require('./database/models/user')
require('./database/models/question')
require('./database/models/answer')
require('./database/models/comment')

const app = express();

app.get('/', (req, res) => {
    res.send("All ok")
})

const port = process.env.PORT || 5000

app.listen(port, (res) => {
    console.log(`Server is running at http://localhost:${port}`);
})