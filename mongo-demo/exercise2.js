const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date: Date
});

const Course = mongoose.model('Course', courseSchema);
// list all functions to be carried out
async function getCourses(){
    return await Course
    .find({isPublished: true, tags:{$in:['frontend', 'backend'] } } )
  //  .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select('name author price')
}
// run the function 
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();