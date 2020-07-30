const crypt = require('../utils/crypt');
const readline = require('readline-sync');

module.exports = function (options) {
    const verbose = options && options.verbose;
    const key = crypt.retrieveKey(verbose);
    var secret = null;
    if (options && options.secret) {
        secret = options.secret;
    }
    else {
        secret = readline.question('Please enter secret: ');
    }
    const encrypted = crypt.encrypt(secret, key);
    console.log(encrypted);
    if (verbose) {
        console.log('Plaintext for verification:');
        const check = crypt.decrypt(encrypted, key);
        console.log(check);
        if (check === secret) {
            console.log('Success.');
        }
        else {
            console.log('Something went wrong...');
        }
    }
};