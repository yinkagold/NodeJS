const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to Mongo Exercise'))
    .catch(err => console.log('An error has occured', err));

const courseSchema = new mongoose.Schema({
    name: String, 
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date: Date

});

const Course = mongoose.model('Course', courseSchema);
async function getCourseInfo(){
     return await Course 
    .find({isPublished: true, tags: 'backend'}) // get all backend courses 
    .sort({name: 1})
    .select({name: 1, author: 1})
}
async function run(){
    const courses = await getCourseInfo();
    console.log(courses);
}

run();