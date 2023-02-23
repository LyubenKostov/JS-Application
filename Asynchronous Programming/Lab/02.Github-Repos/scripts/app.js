function loadRepos() {
    //read input field
    const username = document.getElementById('username').value;
    const list = document.getElementById('repos');
    //send request
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
             if (!response.ok === true) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
        })
        .then((data) => {
             list.innerHTML = '';
        for (let repo of data) {
            list.innerHTML += `<li>
			<a href="${repo.html_url}">
				${repo.full_name}
			</a>
		</li>`;
        }
        })
        .catch((error) => {
            list.innerHTML = `${error.message}`;
        });
}