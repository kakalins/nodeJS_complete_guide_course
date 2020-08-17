const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.error('Could not connect to Mongo', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // const course = new Course({
    //     name: 'Ninjutsu',
    //     author: 'Ricardo',
    //     tags: ['koppo-jutsu', 'tai-jutsu'],
    //     isPublished: true
    // });

    const course = new Course({
        name: 'Artes',
        author: 'Ricardo',
        tags: ['Pintura', 'Desenho'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
};

createCourse();