const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
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

async function updateCourse() {
    const course = await Course
        .findOneAndUpdate({ isPublished: true, author: 'Ricardo' }, { isPublished: false, author: 'Mosh' });
    //.findOneAndUpdate({ isPublished: false, author: 'Mosh' }, { isPublished: true, author: 'Ricardo' });
    console.log(course);


    // course.isPublished = true;
    // course.author = 'Ricardo';

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

updateCourse();