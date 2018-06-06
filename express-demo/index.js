const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // this enables the name object 

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello world!!!');
});
app.get('/api/courses', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));   //Look up the course
    if(!course) return res.status(404).send('The course with the given ID was not found.');    
    res.send(course);

});

app.post('/api/courses', (req, res) =>{
    const { error } = validateCourse(req.body); // result.error // object destruction 
    if(error) return res.status(400).send(result.error.details[0].message);       // 400 Bad Request
    const course = {
        id: courses.length + 1 , 
        name: req.body.name
    };
    courses.push(course);
    res.send(course); // this returns res to client to see what was posted 
});

app.put('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));   //Look up the course
    if(!course) return res.status(404).send('The course with the given ID was not found.');     //If invalid, return 404 

    const { error } = validateCourse(req.body); // result.error
    if(error) return res.status(400).send(result.error.details[0].message); // 400 Bad Request
     
    course.name = req.body.name; //update course 
    res.send(course); //Return the updated course 
});

app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if(!course)res.status(404).send('The course with the given ID was not found.');     //If invalid, return 404 
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
   return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID was not found.')
    res.send(course);
});

//PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ... ${port}`));
