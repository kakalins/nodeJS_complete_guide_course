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

async function updateCourse(id) {
    const course = await Course
        .findById(id);
    if (!course) return;
    console.log(course);

    course.isPublished = false;
    course.name = 'Arte 2.0';

    // course.set({
    //     isPublished: true,
    //     author: "Another author"
    // });

    const result = await course.save();
    console.log(result);
};

async function runUpdate(id) {
    const result = await updateCourse(id);
    console.log(result);
}

updateCourse('5f32dea2bdea1d3ecc963ed0');