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
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true
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
        max: 200,
        set: v => Math.round(v)
            //get: v => Math.round(v)
    }
});

const Course = mongoose.model('Aula', courseSchema);

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
        category: 'mobile',
        author: 'Ricardo',
        tags: ['IOS', 'Android'],
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save();
        console.log(result);

        //or

        // await course.validate();
    } catch (ex) {
        for (field in ex.errors)
        // console.log('Error:', ex.errors[field]);
            console.log('Error:', ex.errors[field].message);
    }
};

createCourse();