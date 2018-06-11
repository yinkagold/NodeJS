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
const Course = mongoose.model('Course', courseSchema); //class 
async function createCourse(){
 // schema is compiled into a model 
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

//createCourse();

// async function getCourses(){
//     const courses = await Course
//     .find({author: 'Yinka', isPublished: true})
//     .sort({ name: 1}) // 1 indicates acscending order, -1 descending order
//     .select({ name: 1, tags: 'node' }) // selects properties to be returned 
//     .count(); // counts number of document  
//     console.log(courses);
// }
// getCourses();
// Query first approach 
async function updateCourse(id){
    const course = await Course.findById(id);

    if (!course) return;

   
    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
   
}

updateCourse('5b1cecb69a2c8d5f601317f8');