//parallel promises api
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1 ...');
        resolve(1);
        //reject(new Error('Deu merda...'))
    }, 3000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2 ...');
        resolve(2);
    }, 2000);
});

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error:', err.message));