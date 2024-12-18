document.addEventListener('DOMContentLoaded', function () {
    // Listen von Personen und Räumen
    const personen = ['Jona', 'Jan', 'Nicoll', 'Sascha', 'Leonie'];
    const raeume = ['room_0', 'room_1', 'room_2', 'room_3', 'room_4'];

    // Berechnet die Kalenderwoche basierend auf dem Datum
    function getISOWeek(date) {
        const tempDate = new Date(date.getTime());
        tempDate.setDate(tempDate.getDate() - tempDate.getDay() + 5); // Setze auf den ersten Freitag
        const firstMonday = new Date(tempDate.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((tempDate - firstMonday) / (1000 * 3600 * 24));
        return Math.floor(dayOfYear / 7) + 1;
    }

    // Berechnet die Person basierend auf dem aktuellen Datum und der Woche
    function getPersonBasedOnTimeAndRoom(room) {
        const unixTimestamp = Math.floor(Date.now() / 1000);  // Unix-Zeit in Sekunden
        const date = new Date(unixTimestamp * 1000);  // Unix-Zeitstempel in Datum umwandeln
        const currentWeek = getISOWeek(date);  // Korrekte Kalenderwoche berechnen
        const roomIndex = raeume.indexOf(room);  // Finde den Index des Raums in der Liste
        const personIndex = (roomIndex + currentWeek) % personen.length;  // Berechne den Person-Index je nach Woche

        return personen[personIndex];
    }

    // Funktion für die manuelle Eingabe eines Raums
    const room = document.body.getAttribute('data-room');  // Hole den Wert des data-room Attributs
    const person = getPersonBasedOnTimeAndRoom(room);       // Benutze den dynamischen Raumwert


    // Zeitdifferenz aus time.js holen
    function formatTime(days, hours, minutes, seconds) {
        // Entferne die überflüssigen Teile
        let timeString = '';
        if (days > 0) timeString += `${days}d `;
        if (hours > 0 || days > 0) timeString += `${hours}h `;
        if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
        timeString += `${seconds}s`;

        return timeString.trim();
    }

    function calculateTime(finished) {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();

        // Zeit für Freitag 9:00 und Montag 12:20
        const friday9AM = new Date(now);
        friday9AM.setDate(now.getDate() + (5 - currentDay + 7) % 7); // Nächster Freitag
        friday9AM.setHours(9, 0, 0, 0); // Freitag 9:00

        const monday12_20PM = new Date(now);
        monday12_20PM.setDate(now.getDate() + (1 - currentDay + 7) % 7); // Nächster Montag
        monday12_20PM.setHours(13, 0, 0, 0); // Montag 12:20

        // Berechnung des letzten Montags 12:20
        const lastMonday12_20PM = new Date(now);
        lastMonday12_20PM.setDate(now.getDate() - (currentDay + 6) % 7); // Letzter Montag
        lastMonday12_20PM.setHours(13, 0, 0, 0); // Montag 12:20


        if (!finished) {
            if ((currentDay === 5 && (currentHour > 8)) || currentDay === 6 || currentDay === 0 || (currentDay === 1 && (currentHour < 13))) {
            // Fall 1: Zwischen Freitag 9:00 und Montag 12:20
            const timeDiff = monday12_20PM - now;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            return "Noch " + formatTime(days, hours, minutes, seconds) + " Zeit";
            } else {
            // Fall 2: Zwischen Montag 12:20 und Freitag 9:00
            // Berechne die vergangene Zeit seit dem letzten Montag 12:20
            const timeDiff = now - lastMonday12_20PM;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Tage
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Stunden
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Minuten
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // Sekunden

            return "Überfällig seit " + formatTime(days, hours, minutes, seconds) + "";
            }
        }

        if (finished) {
            // Zeige Zeit bis Freitag
            const timeDiffToFriday = friday9AM - now;
            const days = Math.floor(timeDiffToFriday / (1000 * 60 * 60 * 24)); // Tage
            const hours = Math.floor((timeDiffToFriday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Stunden
            const minutes = Math.floor((timeDiffToFriday % (1000 * 60 * 60)) / (1000 * 60)); // Minuten
            const seconds = Math.floor((timeDiffToFriday % (1000 * 60)) / 1000); // Sekunden
            return "Neuer Putzplan in " + formatTime(days, hours, minutes, seconds) + "";
        }
    }

    // Zeigt Person und Zeitdifferenz an
    function update_subtitle() {
        const timeDiff = calculateTime(true);
        document.getElementById("output").innerText = `${person} - ${timeDiff}`;
    }

    update_subtitle();
    setInterval(update_subtitle, 1000);
    
});