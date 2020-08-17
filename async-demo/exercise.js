// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });

sendPrefMovie();

async function sendPrefMovie() {
    try {
        const customer = await getCustomer(1);
        console.log('Customer: ', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            const email = await sendEmail(customer.email, movies);
            console.log('Email sent...')
        }
    } catch (err) {
        console.log('Error', err.message);
    }
}

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
            reject(new Error('Gold is false'));
        }, 2000);
    });
};

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
            reject(new Error('Could not get movies...'));
        }, 2000);
    });
};

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            reject(new Error('Could not send an email...'));
        }, 2000);
    });
};