const {User} = require('../../models/user');
const request = require('supertest');
const {Genre}  = require('../../models/genre');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); }) // this allows the server to load before and close after each test to allow other tests take place
    afterEach(async ()=> { 
        //clsoes the server
        await Genre.remove({}); // cleans the database after 
        server.close(); 
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
           await Genre.collection.insertMany( [
                { name: 'genre1'},
                { name: 'genre2'},                     
            ]);
            const res = await request(server).get('/api/genres/');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name ==='genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if a valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1'})
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
     });

    it('should return 404 if invalid id is passed', async () => {
     
        const res = await request(server).get('/api/genres/1');

        expect(res.status).toBe(404);
        
    });

    it('should return 404 if no genre with the given ID exists', async () => {
        const id = mongoose.Types.ObjectId();
        const res = await request(server).get('/api/genres/' + id);

        expect(res.status).toBe(404);
        
    });
    // test authorization 
    let token;
    let name;

    const exec = async() => {
        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token) 
            .send({ name }); // only if key and value are the same otherwise {name: mail....}
    }
    beforeEach(() => {
         // create a token before request is sent to ensure user is authorized
        token = new User().generateAuthToken();
        name = 'genre1';
    });
    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });
        it('should return 400 if genre is less than 5 characters', async () => {
            name= '1234'
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if genre is more than 50 characters', async () => {
            // generate a new name with 50 characters 
             name = new Array(52).join('a')
             const res = await exec(); 
             expect(res.status).toBe(400);
        });
        //checks if genre is saved to database
        it('should save the genre if valid', async () => {
            await exec();
            const genre = await Genre.find({ name: 'genre1' });
            expect(genre).not.toBeNull();
        });
        // ensure the genre is in the body of the response 
        it('should return the genre if valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id'); 
            expect(res.body).toHaveProperty('name', 'genre1');
        });
     });
     describe('PUTT /:id', () => {
        let token;
        let newName;
        let genre;
        let id;

        const exec = async () => {
            return await request(server)
                .put('/api/genres/' + id)
                .set('x-auth-toekn', token)
                .send({ name: newName });
        }

        beforeEach( async () => {
            //create genre and save before each test
           // jest.setTimeout(6000)
            genre = new Genre({ name: 'genre1' });
            await genre.save();
            //generate a token
            token = new User().generateAuthToken();
            id = genre._id;
            newName = 'updatedName';
        });

        it('should return 401 if client is not logged in', async () => {
           
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            newName = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if the genre is more than 50 characters', async  () => {
            newName = new Array(52).join('a');

            const  res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if the genre with the given id is not found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should update the genre if the input is valid', async () => {
            await exec();

            const updatedGenre = await Genre.findById(genre._id);

            expect(updatedGenre.name).toBe(newName);
        });

        it('should return the updated genre if it is valid', async () => {
            const res = await exec();
      
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', newName);
          });
     });

     describe('DELETE /:id', () => {
        let toekn;
        let genre;
        let id;

        const exec = async () => {
            return await request(server)
            .delete('/api/genre/' + id)
            .set('x-auth-token', token)
            .send();
        }

        beforeEach( async () => {
            genre = new Genre( { name: 'genre1' });
            await genre.save();

            id = genre._id;
            token = new User({ isAdmin: true }).generateAuthToken();
        })

        it('shoild return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 403 if the user is not an admin', async () => {
            token = new User({ isAdmin:false}).generateAuthToken();

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if no genre with the given id was found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should delete the genre if input is valid', async () => {
            await exec();

            const genreInDb = await Genre.findById(id);

            expect(genreInDb).toBeNull();
        });

        it('should return the removed genre', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id', genre._id.toHexString());
            expect(res.body).toHaveProperty('name', genre.name);
        });
     });
});