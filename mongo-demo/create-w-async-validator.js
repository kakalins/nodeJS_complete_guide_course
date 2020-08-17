const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.error('Could not connect to Mongo', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 150,
        //match: /pattern/
    }, //validation only used by mangoose, mongo doesn't care about.
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    //tags: [String],   //to avoid empty string, need custom validator bellow
    tags: {
        type: Array,
        validate: {
            isAsync: true, //async validator use callback in function bellow
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 2000);
            },
            message: 'Um curso deve ter ao menos uma tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // const course = new Course({
    //     name: 'Ninjutsu',
    //     author: 'Ricardo',
    //     tags: ['koppo-jutsu', 'tai-jutsu'],
    //     isPublished: true
    // });

    // const course = new Course({
    //     name: 'Artes',
    //     author: 'Ricardo',
    //     tags: ['Pintura', 'Desenho'],
    //     isPublished: true
    // });

    const course = new Course({
        name: 'Node',
        category: 'web',
        author: 'Ricardo',
        //tags: [],
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save();
        console.log(result);

        //or

        // await course.validate();
    } catch (err) {
        console.log('Error:', err.message);
    }
};

createCourse();