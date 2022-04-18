let compliments = require('./compliments.json')
let globalId = compliments[compliments.length - 1].id + 1

module.exports = {
    getCompliments: (req, res) => {
        res.status(200).send(compliments)
    },
    addCompliment: (req, res) => {
        const {complimentText} = req.body
        let newCompliment = {
            complimentText,
            id:globalId
        }
        compliments.push(newCompliment)
        res.status(200).send(compliments)
        globalId++
    },
    updateCompliment: (req, res) => {
        const {id} = req.params
        const {complimentText} = req.body
        let updateComp = {
            complimentText,
            id
        }
        let index = compliments.findIndex(comp => comp.id === +id)
        compliments.splice(index, 1, updateComp)

        res.status(200).send(compliments)
    },
    deleteCompliment: (req, res) => {
        const {id} = req.params
        let index = compliments.findIndex(comp => comp.id === +id)
        compliments.splice(index, 1)
        console.log('delete', compliments)

        res.status(200).send(compliments)
    }
}