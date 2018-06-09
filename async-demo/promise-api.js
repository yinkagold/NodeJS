const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1....');
        resolve(1);
        //reject(new Error('Because something failed'));
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2....');
        resolve(2);
    }, 2000);
});
// race : completes once the first promise is resolved 
Promise.all([p1,p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message))