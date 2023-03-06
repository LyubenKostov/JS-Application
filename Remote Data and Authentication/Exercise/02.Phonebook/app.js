function attachEvents() {
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    const btnLoad = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const phoneBook = document.getElementById('phonebook');

    const phonebookUrl = 'http://localhost:3030/jsonstore/phonebook';

    btnLoad.addEventListener('click', loadContacts);
    createBtn.addEventListener('click', cretePhoneContact);

    async function cretePhoneContact() {
        if (!personInput.value || !phoneInput.value) {
            return alert('No empty field allowed');
        }
        await fetch(phonebookUrl, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                person: personInput.value,
                phone: phoneInput.value,
            })
        })
        personInput.value = '';
        phoneInput.value = '';
        btnLoad.click()
    }

    async function loadContacts() {
        const res = await fetch(phonebookUrl);
        const data = await res.json();

        Object.values(data).forEach(el => {
            const listEl = document.createElement('li');
            listEl.textContent = `${el['person']}: ${el['phone']}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute(`id`, el['_id']);
            deleteBtn.textContent = 'Delete';
            listEl.appendChild(deleteBtn);
            phoneBook.appendChild(listEl);

            deleteBtn.addEventListener('click', async (ev) => {
                const userId = ev.target.id;
                const targetUrl = `${phonebookUrl}/${userId}`;
                await fetch(targetUrl, {
                    method: 'delete',
                });
                ev.target.parentNode.remove();
            });
        });
    }
}

attachEvents();