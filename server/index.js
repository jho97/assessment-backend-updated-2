const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const ctrl = require('./controller.js')

app.get('/api/compliments',)
app.post('/api/compliment',)
app.put('/api/compliment/:id',)
app.delete('/api/compliment/:id',)


app.listen(4000, () => console.log("Server running on 4000"));
