const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String], 
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    });
async function createCourse(){
 // schema is compiled into a model
    const Course = mongoose.model('Course', courseSchema); //class 
    const course = new Course({
        name: 'Angular Course',
        author: 'Yinka',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    //saving to Database   
    const result = await course.save();
    console.log(result);
}
const Course = mongoose.model('Course', courseSchema); 
// retrieving functions 
async function getCourses(){
    const courses = await Course
    .find({ author: 'Yinka', isPublished: true }) // filter result
    .limit(10)
    .sort({ name: 1}) // 1 indicates acscending order, -1 descending order
    .select({ name: 1, tags: 'node' }) // selects properties to be returned 
    console.log(courses);
}
getCourses();

//createCourse();