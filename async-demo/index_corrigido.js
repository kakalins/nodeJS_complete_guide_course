console.log('Before');
getUser(1, getRepos);
console.log('After');

////////// Inline callback function implementation //////////
function getRepos(user) {
    console.log('Got the username!');
    getRepositories(user, displayRepos);
}

function displayRepos(repos) {
    console.log('Repos:', repos);
}

////////// Asynchorous functions ////////////
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, getHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(user, callback) {
    setTimeout(() => {
        console.log(`Reading ${user.getHubUsername}'s repositories.`);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}