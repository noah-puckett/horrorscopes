const express = require('express')
const app = express()
const data = require('./content/horrorscopes.js')
app.use(express.json())


//get all horrorscopes
app.get('/v1/horrorscopes/all', (req, res) => {
    const allHorrorscopes = data.all;
    console.log(req)
    res.send(allHorrorscopes)
})

//get all horrorscopes for a single sign
app.get('/v1/horrorscopes/sign/:sign', (req, res) => {
    const horrorscopesBySign = data[req.params.sign];
    res.send(horrorscopesBySign)
})

//get a horrorscope by id
app.get('/v1/horrorscopes/:id', (req, res) => {
    console.log('req params', req.params)
    const horrorscope = data.all.find((el) => {
        return el.id === parseInt(req.params.id);
    })
    res.send(horrorscope)
})

//add horrorscope (doesn't persist)
app.post('/v1/horrorscopes/add', (req, res) => {
    const { id, sign, text } = req.body;
    data.all.push({ id, sign, text})
    res.send( data.all)
})

//update horrorscope (doesn't persist)
app.patch('/v1/horrorscopes/update/:id', (req, res) => {
    const { sign, text } = req.body;
    const horrorscope = data.all.find((el) => {
        return el.id === parseInt(req.params.id);
    })
    //this is messy, make more concise. maybe loop? 
    let updatedHorrorscope = {};
    if(sign && text) {
        updatedHorrorscope = {...horrorscope, sign, text }
    }
    else if(sign) {
        updatedHorrorscope = {...horrorscope, sign }
    }
    else if(text) {
        updatedHorrorscope = {...horrorscope, text }
    }

    res.send(updatedHorrorscope)
})

//delete horrorscope (doesn't persist)
app.delete('/v1/horrorscopes/delete/:id', (req, res) => {
    const horrorscope = data.all.find((el) => {
        return el.id === parseInt(req.params.id);
    })
    res.send(horrorscope)
})

module.exports = app;