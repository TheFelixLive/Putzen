function save_finished_room(room) {
    // API-Aufruf zum Speichern des Raumstatus
    fetch('http://<raspberry-pi-ip>:3000/saveRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room: room }),
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Raum erfolgreich gespeichert.') {
            console.log(`Raum ${room} wurde erfolgreich gespeichert.`);
            return true
        } else {
            console.log('Fehler beim Speichern des Raums:', data);
            return undefined
        }
    })
    .catch(error => {
        console.error('Fehler beim API-Aufruf:', error);
        return undefined
    });
}


function is_room_finished(room) {
    // API-Aufruf zum Abfragen des Raumstatus
    fetch(`http://<raspberry-pi-ip>:3000/getRoomStatus?room=${room}`)
        .then(response => {
            if (response.status === 400) {
                console.log('Ungültiger Raumwert');
                return undefined;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log(`Raum ${room} ist ${data.finished ? 'abgeschlossen' : 'nicht abgeschlossen'}`);
                return data.finished;
            }
        })
        .catch(error => {
            console.error('Fehler beim API-Aufruf:', error);
            return undefined;
        });
}
