const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    var dt = new Date();
    var utcDate = dt.toUTCString();
    res.send('<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot.</p> <p>'
        + utcDate + '</p>')
})

app.get('/persons', (req, res) => {
    res.json(persons);
})

app.get('/persons/:id', (request, response) => {
    const id = request.params.id
    let person;
    persons.forEach(p => {
        if (p.id == id) {
            person = p
        }
    });
    response.json(person);
});

app.post('/persons', (req, res) => {
    let newPerson = req.body;
    if (!newPerson.name || !newPerson.number) {
        res.json({error: 'name and number are required'})
    }
    persons.forEach(person => {
        if (person.name == newPerson.name) {
            res.json({error: 'name must be unique'})
        }
    })
    newPerson.id = Math.floor(Math.random() * (300 - 1) + 1);
    persons.push(newPerson);
    res.json(newPerson);
});

app.delete('/persons/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id == id) {
            persons.splice(i, 1);
        }
    }
    res.json(persons)
})
