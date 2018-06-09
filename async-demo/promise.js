
const p = new Promise((resolve, reject) => { // pending 
    setTimeout(() => {
    resolve(1);  // prending to resolve or fulfilled if successfull
     reject(new Error('message')); // pending to rejected if unsuccessful
    }, 2000); 
});
//how it is consumned 
p
.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message));