const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(resp => resp.json())
    .then(response => {
        const userList = document.querySelector('#user-list')
        const reposList = document.getElementById('repos-list')
        userList.innerHTML = ""
        reposList.innerHTML = ""
        response.items.map(item => {
            const li = document.createElement('li')
            const h2 = document.createElement('h2')
            h2.innerHTML = item.login
            h2.addEventListener('click', e => userRepos(item.login, e))

            const img = document.createElement('img')
            img.src = item.avatar_url
            
            li.append(h2, img)
            userList.append(li)
        })
    })
    form.reset()
})

function userRepos(username, e){
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(response => response.map(repo => {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        h3.innerHTML = repo.name
        
        li.append(h3)
        reposList.append(li)
    }))
}
