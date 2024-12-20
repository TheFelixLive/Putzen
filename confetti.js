function createConfetti(refresh_page) {
    let confettiCount;  // Anzahl der Konfetti
    let colors;

    // Goldenes Konfetti für den Flur
    if (refresh_page == "room_0") {
        confettiCount = 400
        colors = [
            '#FFD700', // Helles Gold
            '#B8860B', // Dunkles Gold
            '#B76E79', // Roségold
            '#CD7F32', // Bronzegold
            '#F5C71A'  // Blasses Gold
        ]; // Verschiedene Goldtöne für den Flur
    } else {
        confettiCount = 300
        // Bunte Farbpalette für alle anderen Räume
        colors = [
            '#FF6347', // Tomatenrot
            '#32CD32', // Limegrün
            '#1E90FF', // Himmelblau
            '#FF69B4', // Hibiskusrosa
            '#FFB6C1', // Pastellrosa
            '#FFA500', // Mangoorange
            '#8A2BE2', // Lila
            '#40E0D0', // Türkis
            '#C0C0C0', // Silber
            '#FFFFFF'  // Weiß
        ];
    }

    let confettiCountDown = confettiCount; // Zähler für die verbleibenden Konfetti
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Zufällige Positionen und Farben für das Konfetti
        confetti.style.left = `${Math.random() * 100}%`; // Zufällige X-Position
        confetti.style.animationDelay = `${Math.random() * 3}s`; // Zufällige Verzögerung
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Zufällige Schwungwerte in X-Richtung
        const randomX1 = (Math.random() - 0.5) * 100; // Zufällig von -50px bis 50px
        const randomX2 = (Math.random() - 0.5) * 100;
        const randomX3 = (Math.random() - 0.5) * 100;

        // Setze die zufälligen Werte als CSS-Variablen
        confetti.style.setProperty('--random-x1', `${randomX1}px`);
        confetti.style.setProperty('--random-x2', `${randomX2}px`);
        confetti.style.setProperty('--random-x3', `${randomX3}px`);

        // Füge das Konfetti zum Body hinzu
        document.body.appendChild(confetti);

        // Wenn die Animation des Konfettis beendet ist
        confetti.addEventListener('animationend', () => {
            confetti.remove(); // Entfernt das Konfetti-Element nach der Animation
            confettiCountDown--; // Verringert den Zähler für die verbleibenden Konfetti-Elemente

            // Wenn alle Konfetti entfernt wurden, gib eine Nachricht in der Konsole aus
            if (confettiCountDown === 100) {
                window.location.href = refresh_page + ".html"
            }
        });
    }
}
