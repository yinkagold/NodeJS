const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    date: Date,
    price: Number,
    tags: [String]
});

const Course = mongoose.model('Course', courseSchema);

async function getCourseDetails(){
    return await Course
    .find({isPublished: true})
    .or([
        { price: { $gte: 15 } }, // price >= 15
        { name: /.*by:*/i } // have the keyword by in it 
    ])
    .sort('-price')
    .select('name price author')
}

async function run(){
    const courses = await getCourseDetails();
    console.log(courses);
}

run();