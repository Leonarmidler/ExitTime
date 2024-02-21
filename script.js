document.getElementById('workTimeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calcolaOrario();
});

// Event listener per il cambiamento del valore dei pulsanti radio
var radioButtons = document.querySelectorAll('input[type="radio"][name="lunchDuration"]');
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'pranzo_fuori') {
            document.getElementById('lunchTimeFields').classList.remove('hidden');
        } else {
            document.getElementById('lunchTimeFields').classList.add('hidden');
        }
    });
});

function calcolaOrario() {
    var ingresso = document.getElementById("ingresso").value;
    var uscitaPranzo = document.getElementById("uscitaPranzo").value;
    var entrataPranzo = document.getElementById("entrataPranzo").value;
    var tempoRecupero = document.getElementById("tempoRecupero").value;

    var orarioIngresso = new Date('1970-01-01 ' + ingresso);
    var durataLavoro = 8 * 60 * 60 * 1000; // 8 ore in millisecondi

    var durataPranzo;
    var selectedOption = document.querySelector('input[name="lunchDuration"]:checked').value;
    if (selectedOption == 'pranzo_fuori' && uscitaPranzo && entrataPranzo) {
        var orarioUscitaPranzo = new Date('1970-01-01 ' + uscitaPranzo);
        var orarioEntrataPranzo = new Date('1970-01-01 ' + entrataPranzo);
        durataPranzo = orarioEntrataPranzo - orarioUscitaPranzo;
    } else {
        // Ottenere la durata del pranzo in base all'opzione selezionata
        if (selectedOption === '45') {
            durataPranzo = 45 * 60 * 1000; // 45 minuti
        } else if (selectedOption === '30') {
            durataPranzo = 30 * 60 * 1000; // 30 minuti
        } else {
            durataPranzo = 0; // Nessun pranzo
        }
    }

    var tempoRecuperoParts = tempoRecupero.split(':');
    if (document.querySelector('input[name="tempoRecupero"]:checked').value == 'plus') {
        var tempoRecuperoMs = (+tempoRecuperoParts[0]) * 60 * 60 * 1000 + (+tempoRecuperoParts[1]) * 60 * 1000;
    } else {
        var tempoRecuperoMs = (-tempoRecuperoParts[0]) * 60 * 60 * 1000 + (-tempoRecuperoParts[1]) * 60 * 1000;
    }

    var orarioUscita = new Date(orarioIngresso.getTime() + durataLavoro + durataPranzo - tempoRecuperoMs);

    var orarioUscitaFormattato = orarioUscita.getHours().toString().padStart(2, '0') + ':' + orarioUscita.getMinutes().toString().padStart(2, '0');

    document.getElementById("risultato").innerHTML = 
        "Orario di uscita previsto: " + orarioUscitaFormattato;
}    
