const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');
const request = require('supertest');

describe('auth middleware', () => {

    beforeEach(() => { server = require('../../index'); }) // this allows the server to load before and close after each test to allow other tests take place
    afterEach(async ()=> {
        await Genre.remove({});
        server.close();
     });
    let token;

    const exec = () => {
      return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1'});
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });
    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    it('should return 400 if no token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

});