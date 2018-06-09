
console.log('Before');
//  getUser(1, getRepositories);
console.log('After');


function getRepositories(user){
    getRepositories(user.gitHubUsername, getCommits);
}
function getCommits(repos){
    getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

//Promise based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err =>  console.log('Error', err.message));

    //Async and Await Approach 
async function displayCommits(){
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
}
displayCommits();
function getUser(id){
    return new Promise((resolve, reject) =>{
        //kick off asyn work
        setTimeout(() => {
            console.log('Reading a user from a database...');
           resolve({ id: id, gitHubUsername: 'yinka'});
        }, 2000);
    });  
}

function getRepositories(username) {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            console.log('Calling GitHub API...')
             resolve( ['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            console.log('Calling GitHub API');
            resolve(['Commit']);
        }, 2000);
    });
}
