// const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const rotas = {
    "range": 23,
    "number_of_routes": 3,
    "center_x": 2324,
    "center_y": 453,
    "routes": [{
            "route_id": "rota_K",
            "start_x": 534,
            "start_y": 345,
            "end_x": 5647,
            "end_y": 674,
            "status": 1
        },
        {
            "route_id": "rota_L",
            "start_x": 534,
            "start_y": 345,
            "end_x": 5647,
            "end_y": 674,
            "status": 1
        },
        {
            "route_id": "rota_M",
            "start_x": 534,
            "start_y": 345,
            "end_x": 5647,
            "end_y": 674,
            "status": 1
        },
        {
            "route_id": "rota_N",
            "start_x": 534,
            "start_y": 345,
            "end_x": 5647,
            "end_y": 674,
            "status": 0
        },
        {
            "route_id": "rota_O",
            "start_x": 534,
            "start_y": 345,
            "end_x": 5647,
            "end_y": 674,
            "status": 0
        }
    ],
    "created_at": Date.now,
    "update_at": ""
};

app.get('/', (req, res) => {
    res.send("Hello World!!")
});

app.post('/api/rotas', (req, res) => {
    console.log("BODY", req.body);
    res.send(rotas).json();
});

// // app.get('/api/courses/:id', (req, res) => {
// //     res.send(req.params.id);
// // });

// // app.get('/api/posts/:year/:month', (req, res) => {
// //     res.send(req.params.year);
// // });

// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('Curso com id não encontrado.');
//     res.send(course);
// });

// app.post('/api/courses', (req, res) => {
//     const { error } = validateCourse(req.body);

//     //bad request error status = 400
//     if (error) return res.status(400).send(error.message);


//     // if (!req.body.name || req.body.name.length < 3) {
//     //     //bad request error status = 400
//     //     res.status(400).send('Name is required and should be minimum 3 characters');
//     //     return;
//     // }

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

// app.put('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('Curso com id não encontrado.');

//     const { error } = validateCourse(req.body);

//     //bad request error status = 400
//     if (error) return res.status(400).send(error.message);

//     course.name = req.body.name;
//     res.send(course);
// })

// app.delete('/api/courses/:id', (req, res) => {
//     //Look up the course
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     //if not found, return 404 error
//     if (!course) return res.status(404).send('Curso não encontrado');
//     //delet the object
//     const index = courses.indexOf(course);
//     courses.splice(index, 1);
//     //send response
//     res.send(course);
// });

// function validateCourse(course) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });
//     return schema.validate({ name: course.name });
// };

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));