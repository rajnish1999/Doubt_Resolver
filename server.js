const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.send("All ok")
})

const port = process.env.PORT || 5000

app.listen(port, (res) => {
    console.log(`Server is running at http://localhost:${port}`);
})