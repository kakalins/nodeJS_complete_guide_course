const mongoose = require('mongoose');
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

async function getCourses() {
    //query operators:
    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal)
    //lt (less than)
    //lte (less than or equal)
    //in
    //nin (not in)

    //logical operators
    //or
    //and

    const pageNumber = 2;
    const pageSize = 1;
    const courses = await Course
        .find({ author: 'Ricardo', isPublished: true })
        //query operators example:
        //.find({ price: { $lt: 10 } })                     //less tahn 10
        //.find({ price: { $gt: 10, $lt: 20 } })            //between 10 and 20
        //.find({ price: { $in:[10, 15, 20] } })            //with price = 10 , = 15 and = 20

    //logical operator example
    //.or([{author: 'Ricardo'},{isPublished: true}])
    //.and([{author: 'Ricardo'},{isPublished: true}])

    //regular expressions example:
    //.find({ author: /^Ricardo/ })         //starts with Ricardo
    //.find({ author: /Mota$/i })           //Ends with Mota (i) is for case sensitive
    //.find({ author: /.*Ricardo.*/i })     //containning Ricardo (i) is for case sensitive

    .skip((pageNumber - 1) * pageSize) //ignora todos os itens ateriores aos ultimos 'pageSize' itens
        .limit(pageSize) //traz apenas 'pageSize' itens
        .sort({ name: 1 }) //busca pelo nome em ordem crescente
        .select({ name: 1, tags: 1 }); //brings the name and tags of the document (1) ordem crescente
    //.count() //brings the number of documents
    console.log(courses);
};

getCourses();