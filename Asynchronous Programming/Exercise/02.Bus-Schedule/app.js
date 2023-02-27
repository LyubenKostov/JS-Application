function solve() {
    const label = document.getElementsByClassName('info')[0];
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'asd'
    }

    async function depart() {
        // Get info for next stop
        // Display next stop

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const res = await fetch(url);


        if (res.status !== 200) {

            label.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;

        }

        stop = await res.json();
        label.textContent = `Next stop ${stop.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        departBtn.disabled = false;
        label.textContent = `Arriving at ${stop.name}`;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();