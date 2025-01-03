async function save_finished_room(room) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 500); // Timeout nach 1 Sekunde
        
        const response = await fetch('http://192.168.178.111:4000/saveRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room: room }),
            signal: controller.signal  // Abbruchsignal für fetch
        });

        clearTimeout(timeoutId);  // Timeout wird abgebrochen, wenn die Anfrage rechtzeitig zurückkommt

        if (response.ok) {
            const data = await response.json();
            return data.success; // Gibt "true" zurück, wenn erfolgreich gespeichert
        } else {
            return true; // Bei einem Fehler auf dem Server oder einer fehlerhaften Antwort
        }
    } catch (error) {
        // Fehlerbehandlung für fetch, Timeout oder Netzwerkfehler
        return true;
    }
}




async function is_room_finished(room) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 500); // Timeout nach 1 Sekunde
        
        const response = await fetch(`http://192.168.178.111:4000/getRoomStatus?room=${room}`, {
            method: 'GET',
            signal: controller.signal  // Abbruchsignal für fetch
        });

        clearTimeout(timeoutId);  // Timeout wird abgebrochen, wenn die Anfrage rechtzeitig zurückkommt

        if (response.ok) {
            const data = await response.json();
            return data.finished; // Gibt den Status des Raums zurück (true/false)
        } else {
            return false; // Bei einem Fehler auf dem Server oder einer fehlerhaften Antwort
        }
    } catch (error) {
        // Fehlerbehandlung für fetch, Timeout oder Netzwerkfehler
        return false;
    }
}
