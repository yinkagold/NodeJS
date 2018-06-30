const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function updateCourse(courseId) {
  //const course = await Course.findById(courseId); //using the findById
  const course = await Course.update({_id: courseId }, {
    // $set: {
    //   'author.name': 'Ynika Gold'
    // }, 
    $unset: { // to remove a sub document property 
      'author': ''
    }
  });
  // course.author.name = 'MOsh Hamedani';
  // course.save();
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
//addAuthor('5b3756af33edd2685c7c143c', new Author({name: 'Lola'}))
async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

removeAuthor('5b3756af33edd2685c7c143c', '5b3758771ce4df6f98922349')
//updateCourse('5b3751235f43485e0401c80a')
// createCourse('Node Course',[
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Yinka' })
// ]);


