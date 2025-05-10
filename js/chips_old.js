// Liste initiale des chips avec leur nom, couleur, et id
const initialChips = [
    { nom: "Pomme", couleur: "#123456", id: "3" },
    { nom: "Navet", couleur: "#005656", id: "15" },
    { nom: "Citron", couleur: "#ff0000", id: "125" },
    { nom: "Pêche", couleur: "#00ff00", id: "208" }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("chipInput").style.display = "none";
    const chipInput = document.getElementById('chipInput');
    const chipsContainer = document.getElementById('chipsContainer');

    // Fonction pour afficher les chip
    function affChip(nom, couleur, id) {
        const chip = document.createElement('div');
        chip.classList.add('btn-sm', 'rounded-pill', 'chip');
        chip.style.backgroundColor = couleur;  // Appliquer la couleur de fond
        chip.setAttribute('data-id', id);  // Attacher l'ID comme attribut

        const text = document.createElement('span');
        text.innerText = nom;

        chip.appendChild(text);

        chipsContainer.appendChild(chip);
    }

    // Fonction pour ajouter une nouvelle chip
    function addChip(nom, couleur, id) {
        const chip = document.createElement('div');
        chip.classList.add('btn-sm', 'rounded-pill', 'chip');
        chip.style.backgroundColor = couleur;  // Appliquer la couleur de fond
        chip.setAttribute('data-id', id);  // Attacher l'ID comme attribut
        //chip.setAttribute('data-bs-toggle', 'modal');
        //chip.setAttribute('data-bs-target', '#staticBackdrop');

        const text = document.createElement('span');
        text.innerText = nom;

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';

        // Ajoute l'événement pour supprimer la chip avec un log de l'ID
        closeButton.addEventListener('click', () => {
            console.log(`Removing chip with ID: ${id}`);  // Affiche l'ID dans la console
            chipsContainer.removeChild(chip);
        });

        // Ajoute l'événement pour ouvrir une popup lors du double clic
        chip.addEventListener('dblclick', () => {
            // Ouvre une popup avec un formulaire pour modifier le nom et la couleur
            const popup = window.open("", "popup", "width=400,height=300");
            popup.document.write(`
                <h3>Modifier la Chip</h3>
                <label for="chipName">Nom :</label>
                <input type="text" id="chipName" value="${nom}">
                <br><br>
                <label for="chipColor">Couleur :</label>
                <input type="color" id="chipColor" value="${couleur}">
                <br><br>
                <button id="saveChanges">Sauvegarder</button>
                <script>
                    // Sauvegarde les modifications et ferme la fenêtre
                    document.getElementById('saveChanges').addEventListener('click', function() {
                        const newName = document.getElementById('chipName').value;
                        const newColor = document.getElementById('chipColor').value;

                        // Mise à jour de la chip dans la fenêtre principale
                        window.opener.updateChip(${id}, newName, newColor);
                        window.close();  // Ferme la popup
                    });
                </script>
            `);
        });

        chip.appendChild(text);
        chip.appendChild(closeButton);

        chipsContainer.appendChild(chip);
    }

    // Gestion de l'ajout de nouvelles chips lors de la saisie
    chipInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && chipInput.value.trim() !== '') {
            // Ajoute une nouvelle chip sans couleur spécifique pour les ajouts manuels
            addChip(chipInput.value.trim(), '#000000', Date.now());  // Utilise un timestamp comme id unique
            chipInput.value = '';  // Réinitialise le champ de saisie
        }
    });

    // Fonction pour mettre à jour une chip depuis la fenêtre popup
    window.updateChip = function(id, newName, newColor) {
        // Recherche la chip dans la fenêtre principale via l'ID
        const chip = chipsContainer.querySelector(`.chip[data-id='${id}']`);
        if (chip) {
            // Mise à jour du nom et de la couleur
            chip.querySelector('span').innerText = newName;  // Met à jour le nom
            chip.style.backgroundColor = newColor;  // Met à jour la couleur
        }
    };

    // Gestion des onglets de sélection et d'édition
    document.getElementById('selectionTab').addEventListener('click', function() {
        document.getElementById('selectionTab').classList.add('active');
        document.getElementById('editionTab').classList.remove('active');
        document.getElementById("chipInput").style.display = "none";

        // Supprimer toutes les chips existantes
        chipsContainer.innerHTML = '';
        // Initialisation des chips de départ
        initialChips.forEach(chipData => {
            affChip(chipData.nom, chipData.couleur, chipData.id);
        });
    });

    document.getElementById('editionTab').addEventListener('click', function() {
        document.getElementById('editionTab').classList.add('active');
        document.getElementById('selectionTab').classList.remove('active');
        document.getElementById("chipInput").style.display = "block";

        // Supprimer toutes les chips existantes
        chipsContainer.innerHTML = '';
        // Initialisation des chips de départ
        initialChips.forEach(chipData => {
            addChip(chipData.nom, chipData.couleur, chipData.id);
        });
    });

    // Initialisation des chips de départ
    initialChips.forEach(chipData => {
        affChip(chipData.nom, chipData.couleur, chipData.id);
    });
});
