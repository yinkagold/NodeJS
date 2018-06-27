const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

    const courseSchema = new mongoose.Schema({
        name: {
             type: String,
             required: true,
             minlength: 5,
             maxlength: 255
        }, // using validation 
        category: {
            type: String,
            required: true,
            enum: ['web', 'mobile', 'network'] 
        },
        author: String,
        // setting the validate property to an object, add a function and set a message 
        tags: {
            type: Array,
            validate: {
                validator: function(v){
                    return v && v.length > 0;
                },
                message: 'A course should have at least one tag'
            }
        },
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        Price: { 
            type: Number,
          //  required: function() { return this.isPublished; },
            min: 10,
            max: 200
        }
    });
const Course = mongoose.model('Course', courseSchema); //class 
async function createCourse(){
 // schema is compiled into a model 
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Yinka',
        tags: null,
        isPublished: true,
        price: 15
    });
    try{
    //saving to Database   
      const result = await course.save();
      console.log(result);
    }catch(ex){
        console.log(ex.message);
    }
   
}

createCourse();
