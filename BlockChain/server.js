const express = require('express'); 
const app = express(); 
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('The Blockchain serverside is working')
})

app.listen(port, () => console.log(`Listening on port ${port}`)); 