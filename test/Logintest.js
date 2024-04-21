
const request = require("supertest");
const app = require('../index.js');
const api = 'http://176.32.39.15:3000'
// const api = 'http://localhost:3000'



describe('Login test POST /user/login',()=>{    
        it('No such user', (done)=>{
            request(api)
                .post('/user/login')
                .send({
                    email:"123@mail.com",
                    password:'123456'
                })
                .expect(404,done)
        })
        it('email or password is not correct', (done)=>{
            request(api)
                .post('/user/login')
                .send({
                    email:"user@example.com",
                    password:'123456789'
                })
                .expect(403,done)
        })
        it('Logined', (done)=>{
            request(api)
                .post('/user/login')
                .send({
                    email:"user@example.com",
                    password:'123456'
                })
                .expect(200,done)
        })

        after(()=>{
            process.exit()
        })
  
    
})

