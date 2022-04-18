const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const ctrl = require('./controller.js')

app.get('/api/compliments', ctrl.getCompliments)
app.post('/api/compliment', ctrl.addCompliment)
app.put('/api/compliment/:id', ctrl.updateCompliment)
app.delete('/api/compliment/:id', ctrl.deleteCompliment)


app.listen(4000, () => console.log("Server running on 4000"));
