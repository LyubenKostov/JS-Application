// async function getInfo() {
//     const id = document.getElementById('stopId').value;
//     const url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;
//     const outputs = {
//         stop: document.getElementById('stopName'),
//         buses: document.getElementById('buses'),
//     };
//     outputs.stop.innerHTML = '';
//     outputs.buses.innerHTML = '';
//
//     try {
//         const response = await fetch(url);
//         if (response.status !== 200) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }
//
//         const data = await response.json();
//         outputs.stop.textContent = data.name;
//         Object.entries(data.buses).forEach(bus => {
//             const li = document.createElement('li');
//             li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
//             outputs.buses.appendChild(li);
//         });
//     } catch (error) {
//         outputs.stop.textContent = 'Error';
//     }
// }
async function getInfo() {
    const stopInfoElement = document.getElementById('stopId');
    const stopId = stopInfoElement.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const stopNameElement = document.getElementById('stopName');
    const busList = document.getElementById('buses');
    busList.innerHTML = '';
    stopId.value = '';

    try {
        const response = await fetch(url);
        const data = await response.json();

        stopNameElement.textContent = data.name;
        Object.entries(data.buses).forEach(([busNumber, timeArrive]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busNumber} arrives in ${timeArrive} minutes`;
            busList.appendChild(li);
        });
    } catch (e) {
        stopNameElement.textContent = 'Error'
    }
}