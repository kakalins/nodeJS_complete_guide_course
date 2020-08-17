const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Conectado ao mongo-exercises DB'))
    .catch(err => console.log('Não foi possível conectar ao mongo-exercises DB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

// async function updateCourse(id) {
//     const result = await Course
//         .update({ _id: id }, {
//             isPublished: true,
//             name: "Artes"
//         });

//     console.log(result);
// };

async function updateCourse(id) {
    return await Course
        .findByIdAndUpdate(id, {
            isPublished: false,
            name: "Artes 2.0"
        });

    //console.log(result);     //result traz o array antes da modificação
};

// async function updateCourse(id) {
//     const result = await Course
//         .findByIdAndUpdate(id, {
//             isPublished: true,
//             name: "Artes"
//         }, { new: true }); //faz com que result seja o novo array modificado

//     console.log(result);
// };

async function runUpdate(id) {
    const course = await updateCourse(id);
    console.log(course);
}

// updateCourse('5f353c281b383d57f81f4ea0');
runUpdate('5f353c281b383d57f81f4ea0');