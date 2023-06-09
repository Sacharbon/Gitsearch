// 1. Récupérer contenu input ok
// 2. Chercher dans l'API ok
// 3. Afficher sur le site

const search = document.querySelector('#searchbtn')
const error = document.querySelector('#error')

// Afficher Octocat au chargement de la page

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.github.com/users/octocat')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        showUser(data)
    })
});



// 1. Récupérer contenu input

search.addEventListener('click', () => {

    const content = document.querySelector('#usernameInput').value
    if(content == "") {
        error.innerHTML = "No results"
    } else {
        error.innerHTML = ""

// 2. Chercher dans l'API
        fetch('https://api.github.com/users/'+ content)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if(data.message == "Not Found"){
                error.innerHTML = "No results"
                return
            }
            showUser(data)
        })
    }
})

// place l'emplacement où le contenu sera écrit

function showUser(user) {
    const name = document.querySelector('#name')
    const username = document.querySelector('#username')
    const create = document.querySelector('#date')
    const desc = document.querySelector('#desc')
    const repos = document.querySelector('#repos')
    const followers = document.querySelector('#followers')
    const following = document.querySelector('#following')
    const location = document.querySelector('#location')
    const twitter = document.querySelector('#twitter')
    const compagny = document.querySelector('#compagny')
    const link = document.querySelector('#link')
    const picture = document.querySelector('#picture')


// écriture du contenu

    name.innerHTML = user.name

    username.innerHTML = `@${user.login}`
    
    let dateString = user.created_at;
    let date = new Date(dateString);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString(undefined, options);
    create.innerHTML = `joined ${formattedDate}`



    desc.innerHTML = user.bio
    if(user.bio == null){
        desc.innerHTML = "This profile has no bio."
    }

    repos.innerHTML = user.public_repos

    followers.innerHTML = user.followers

    following.innerHTML = user.following

    twitter.innerHTML = user.twitter_username
    if(user.twitter_username == null){
        twitter.innerHTML = "Not Available"
        document.getElementById("twitterDiv").classList.add("low-opacity");
    }

    compagny.innerHTML = user.compagny
    if(user.compagny == null){
        compagny.innerHTML = "Not Available"
        document.getElementById("compagnyDiv").classList.add("low-opacity");
    }

    link.innerHTML = user.blog
    if(user.blog == ""){
        link.innerHTML = "Not Available"
        document.getElementById("linkDiv").classList.add("low-opacity");
    }

    location.innerHTML = user.location
    if(user.location == null){
        location.innerHTML = "Not Available"
        document.getElementById("locationDiv").classList.add("low-opacity");
    }

    picture.innerHTML = user.avatar_url
}