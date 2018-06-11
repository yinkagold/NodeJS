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
// retrieving functions 
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
// lt (less than)
//lte (less than or equal)
// in 
// nin (not in)
async function getCourses(){
    const courses = await Course
   // .find({ author: 'Yinka', isPublished: true }) // filter result
   //.find({ price: { $gt: 10 }}) //filter with price >10 using $comparison operator
   // .find({ price: { $gte: 10, $lte: 20 }}) // between 10 and 20
    //.find({ price: { $in: [10, 15, 20] } }) 
   
    .find({author: /^Yinka/})  // find using regualr expressions // starts with Yinka 
    .find({author: /Gold$/i }) // ends with Gold , i makes it case insentive
    .find({ author: /.*Yinka.*/}) // Contains Yinka
    .or([{author: 'Yinka'}, {isPublished: true}]) // using logical operator or
    .and([{author: 'Yinka'}, {isPublished: true}])
   .limit(10)
    .sort({ name: 1}) // 1 indicates acscending order, -1 descending order
    .select({ name: 1, tags: 'node' }) // selects properties to be returned 
    console.log(courses);
}
getCourses();

//createCourse();