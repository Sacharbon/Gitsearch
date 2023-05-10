// 1. Récupérer contenu input ok
// 2. Chercher dans l'API ok
// 3. Afficher sur le site

const search = document.querySelector('#searchbtn')
const error = document.querySelector('#error')

search.addEventListener('click', () => {

// 1. Récupérer contenu input
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

function showUser(user) {
    const name = document.querySelector('#name')
    const username = document.querySelector('#username')
    const date = document.querySelector('#date')
    const desc = document.querySelector('#desc')
    const repos = document.querySelector('#repos')
    const followers = document.querySelector('#followers')
    const following = document.querySelector('#following')
    const location = document.querySelector('#location')
    const twitter = document.querySelector('#twitter')
    const compagny = document.querySelector('#compagny')
    const link = document.querySelector('#link')
    const picture = document.querySelector('#picture')

    name.innerHTML = user.name

    username.innerHTML = `@${user.login}`
    
    date.innerHTML = `joined ${user.created_at}`

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
    }

    compagny.innerHTML = user.compagny
    if(user.compagny == null){
        compagny.innerHTML = "Not Available"
    }

    link.innerHTML = user.blog
    if(user.blog == null){
        link.innerHTML = "Not Available"
    }

    location.innerHTML = user.location
    if(user.location == null){
        location.innerHTML = "Not Available"
    }

    picture.innerHTML = user.avatar_url
}