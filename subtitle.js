// "calculation.js" and "handel_api_requests.js" must also be loaded
document.addEventListener('DOMContentLoaded', function () {

    const room = document.body.getAttribute('data-room');
    const person = getPersonBasedOnTimeAndRoom(room); // Hole den Wert des data-room Attributs
    const finished = is_room_finished(room);
    var time = 0;

    // Zeigt Person und Zeitdifferenz an
    function update_subtitle() {
        if (time > 1) {
            show_person_and_time();
        } else if (finished == true) {
            document.getElementById("output").innerText = `${person} hat diesen Raum gesäubert!`;
            time++
        } else if (finished == false) {
            time = 2
            show_person_and_time();
        } else {
            document.getElementById("output").innerText = `Netzwerkfehler!`;
            time++
        }

    }

    function show_person_and_time() {
        var use_dynamic_fromat = false

        if (finished == undefined || finished == 0) {
            use_dynamic_fromat = true
        }

        const timeDiff = calculateTime(!use_dynamic_fromat);

        if (use_dynamic_fromat) {
            document.getElementById("output").innerText = `${person} - ${timeDiff}`;
        } else {
            document.getElementById("output").innerText = `${timeDiff}`;
        }
        
    }

    update_subtitle();
    setInterval(update_subtitle, 1000);
    
});