function attachEvents() {
    document.getElementById('submit').addEventListener('click', addComments);
    document.getElementById('refresh').addEventListener('click', displayAllComment);
}

const messengerUrl = 'http://localhost:3030/jsonstore/messenger';

function addComments() {
    const authorName = document.querySelector('[name="author"]');
    const messageText = document.querySelector('[name="content"]');

    if(!authorName.value || !messageText.value){
        return
    }
    fetch(messengerUrl, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            author: authorName.value.trim(),
            content: messageText.value.trim()
        })
    }).then(res => {
        if(!res.ok) throw new Error('Error');
        return res.json();
    }).catch(e => alert(e.message))
}

function displayAllComment() {
    fetch(messengerUrl)
        .then(res => {
            if (!res.ok) throw new Error('Error');
            return res.json();
        })
        .then(addComment).catch(e => alert(e.message));
}

function addComment(data) {
    const textArea = document.querySelector('#messages');
    const allComments = [];
    Object.values(data).forEach(c => allComments.push(`${c.author}: ${c.content}`));
    textArea.value = allComments.join('\n');
}

attachEvents();