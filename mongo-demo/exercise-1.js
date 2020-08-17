const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
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

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 }); //.select('name author'); //is another way
};

async function showCourses() {
    const courses = await getCourses();
    console.log(courses);
}

showCourses();