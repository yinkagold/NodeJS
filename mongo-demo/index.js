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
    //const result = await Course.update( { _id: id }, {
    const result = await Course.findByIdAndUpdate(  id , {
        $set: {
            author: 'Bob',
            isPublished: false
        }
    }, {new: true }); // returns the updated document 
    console.log(result);
}

//updateCourse('5b1ced4592fdde2408c77fe9');

async function removeCourse(id){
// const result = await Course.deleteOne({ _id:id });
 const course = await Course.findByIdAndRemove(id);
 console.log(course)
}
removeCourse('5b1ced4592fdde2408c77fe9');