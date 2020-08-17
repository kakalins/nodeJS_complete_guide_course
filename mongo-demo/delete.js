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

// async function deleteCourse(id) {
//     const result = await Course
//         .deleteOne({ _id: id });     //retorna informação sobre o conteúdo deletado

//     console.log(result);
// };

async function deleteCourse(id) {
    const result = await Course
        .findByIdAndRemove(id); //retorna o array deletado

    console.log(result);
};

async function runUpdate(id) {
    const result = await updateCourse(id);
    console.log(result);
}

deleteCourse('5f353c281b383d57f81f4ea0');