document.addEventListener('DOMContentLoaded', function () {
    var time = 0;
    var finished = 1;

    // Zeigt Person und Zeitdifferenz an
    function update_subtitle() {
        if (time > 1) {
            show_person_and_time(finished);
        } else if (finished == 1) {
            const person = getPersonBasedOnTimeAndRoom(document.body.getAttribute('data-room')); // Hole den Wert des data-room Attributs
            document.getElementById("output").innerText = `${person} hat diesen Raum gesäubert!`;
            time++
        } else {
            time = 3
            show_person_and_time();
        }

    }

    function show_person_and_time(finished) {
        const timeDiff = calculateTime(finished);

        if (finished == 1) {
            document.getElementById("output").innerText = `${timeDiff}`;
        } else {
            const person = getPersonBasedOnTimeAndRoom(document.body.getAttribute('data-room')); // Hole den Wert des data-room Attributs
            document.getElementById("output").innerText = `${person} - ${timeDiff}`;
        }
        
    }

    update_subtitle();
    setInterval(update_subtitle, 1000);
    
});