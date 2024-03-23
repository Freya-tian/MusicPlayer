const crypto = require('crypto')
const hash = crypto.createHash('md5')

class password{

    passwordhandler = (password)=>{
        
        return crypto.createHash('md5').update(password).digest('hex')

    }
}

module.exports =  new password()