const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send("Hello World!!")
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params.year);
// });

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Curso com id não encontrado.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.valid(req.body.name, schema);
    console.log(result);

    if (!req.body.name || req.body.name.length < 3) {
        //bad request error status = 400
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.delete('/api/courses', (req, res) => {

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));