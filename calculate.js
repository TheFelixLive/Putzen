// Wöchentliche Zuweisungen für 5 Wochen
const weeklyAssignments = [
    ['Nicoll', 'Jan', 'Leonie', 'Sascha', 'Jona'],   // 1. Woche
    ['Jona', 'Nicoll', 'Jan', 'Leonie', 'Sascha'],   // 2. Woche
    ['Sascha', 'Jona', 'Nicoll', 'Jan', 'Leonie'],    // 3. Woche
    ['Leonie', 'Sascha', 'Jona', 'Nicoll', 'Jan'],    // 4. Woche
    ['Jan', 'Leonie', 'Sascha', 'Jona', 'Nicoll'],    // 5. Woche
];

// Funktion, die die aktuelle Woche basierend auf dem aktuellen Datum und der Uhrzeit berechnet
function getCurrentWeek() {
    const now = new Date();
    const currentDay = now.getDay();  // Wochentag (0 = Sonntag, 1 = Montag, ..., 5 = Freitag)
    const currentHour = now.getHours();  // Aktuelle Stunde (0-23)
    const startDate = new Date(2024, 0, 1);  // 1. Januar 2024
    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const currentWeekIndex = Math.floor(daysPassed / 7) % weeklyAssignments.length;

    // Wenn Freitag nach 9:00 Uhr oder Samstag/Sonntag, nutze aktuelle Woche
    if ((currentDay === 5 && currentHour >= 9) || currentDay === 6 || currentDay === 0) {
        return currentWeekIndex;
    }

    // Sonst, wenn Montag bis Donnerstag vor 9:00 Uhr, nutze letzte Woche
    if (currentDay !== 5 || currentHour < 9) {
        return (currentWeekIndex - 1 + weeklyAssignments.length) % weeklyAssignments.length;
    }

    // Fallback: Aktuelle Woche (für Freitag vor 9:00 Uhr)
    return currentWeekIndex;
}


// Funktion, die die Person basierend auf der aktuellen Woche und dem Raum auswählt
function getPersonBasedOnTimeAndRoom(room) {
    // Berechne die aktuelle Woche
    const currentWeekIndex = getCurrentWeek();
    
    // Zuordnung der Räume zu den Indizes in weeklyAssignments (0 basierend)
    const roomAssignments = {
        'room_0': 0,  // Index für Room 0
        'room_1': 1,  // Index für Room 1
        'room_2': 2,  // Index für Room 2
        'room_3': 3,  // Index für Room 3
        'room_4': 4,  // Index für Room 4
    };
    
    // Hole den Index der Person, die dem Raum in der aktuellen Woche zugewiesen ist
    const personIndex = roomAssignments[room];
    
    // Gib die entsprechende Person basierend auf der aktuellen Woche und dem Raum zurück
    if (personIndex !== undefined) {
        return weeklyAssignments[currentWeekIndex][personIndex];
    } else {
        return 'Unbekannter Raum';  // Falls der Raum nicht gefunden wird
    }
}


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

    // Zeit für Freitag 9:00 und Montag 13:00
    const friday9AM = new Date(now);
    friday9AM.setDate(now.getDate() + (5 - currentDay + 7) % 7); // Nächster Freitag
    friday9AM.setHours(9, 0, 0, 0); // Freitag 9:00

    const monday12_20PM = new Date(now);
    monday12_20PM.setDate(now.getDate() + (1 - currentDay + 7) % 7); // Nächster Montag
    monday12_20PM.setHours(13, 0, 0, 0); // Montag 13:00

    // Berechnung des letzten Montags 13:00
    const lastMonday12_20PM = new Date(now);
    lastMonday12_20PM.setDate(now.getDate() - (currentDay + 6) % 7); // Letzter Montag
    lastMonday12_20PM.setHours(13, 0, 0, 0); // Montag 13:00

    if (!finished) {
        if ((currentDay === 5 && (currentHour >= 9)) || currentDay === 6 || currentDay === 0 || (currentDay === 1 && (currentHour <= 13))) {
            // Fall 1: Zwischen Freitag 9:00 und Montag 13:00
            const timeDiff = monday12_20PM - now;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            return "Verbleibende Zeit: " + formatTime(days, hours, minutes, seconds);
        } else {
            // Fall 2: Zwischen Montag 13:00 und Freitag 9:00
            // Berechne die vergangene Zeit seit dem letzten Montag 13:00
            const timeDiff = now - lastMonday12_20PM;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Tage
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Stunden
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Minuten
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // Sekunden

            return "Überfällig seit " + formatTime(days, hours, minutes, seconds) + "";
        }
    }

    if (finished) {
        // Falls es Freitag nach 9:00 Uhr ist, den Countdown für den nächsten Freitag berechnen
        if (currentDay === 5 && currentHour >= 9) {
            // Setze die Zeit für den nächsten Freitag 9:00
            friday9AM.setDate(friday9AM.getDate() + 7); // Setzt das Datum auf den nächsten Freitag
        }

        // Zeige Zeit bis Freitag
        const timeDiffToFriday = friday9AM - now;
        const days = Math.floor(timeDiffToFriday / (1000 * 60 * 60 * 24)); // Tage
        const hours = Math.floor((timeDiffToFriday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Stunden
        const minutes = Math.floor((timeDiffToFriday % (1000 * 60 * 60)) / (1000 * 60)); // Minuten
        const seconds = Math.floor((timeDiffToFriday % (1000 * 60)) / 1000); // Sekunden

        return "Neuer Putzplan in " + formatTime(days, hours, minutes, seconds) + "";
    }
}