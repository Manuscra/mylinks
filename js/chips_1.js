// Liste initiale des chips avec leur nom, couleur, et id
const initialChips = [
    { nom: "Pomme", couleur: "#123456", contraste: "#ffffff", id: "3" },
    { nom: "Navet", couleur: "#005656", contraste: "#ffffff", id: "15" },
    { nom: "Citron", couleur: "#ff0000", contraste: "#ffffff", id: "125" },
    { nom: "Pêche", couleur: "#00ff00", contraste: "#000000", id: "208" }
];

// Liste des chips sélectionnées
const selectChips = [];

function getChipById(id) {
    return initialChips.find(chip => chip.id === id);
}

// Exemple d'utilisation
//const chip = getChipById("125");


document.addEventListener('DOMContentLoaded', () => {
    const chipInput = document.getElementById('chipInput');
    const chipsContainer = document.getElementById('chipsContainer');
    
    // Fonction pour afficher les chips
    function affChip(nom, couleur, contraste, id) {
        const outputDiv = document.getElementById('filtractif');
        const chip = document.createElement('div');
        chip.classList.add('btn-sm', 'rounded-pill', 'chip');
        chip.style.backgroundColor = couleur;
        chip.setAttribute('data-id', id);

        const text = document.createElement('span');
        text.innerText = nom;
        text.style.color = contraste;

        chip.appendChild(text);

        chip.addEventListener('click', function() {
            if (!selectChips.includes(id)) {
                selectChips.push(id);

                const newButton = document.createElement('div');
                newButton.classList.add('btn-sm', 'rounded-pill', 'chip');
                newButton.style.backgroundColor = couleur;
                newButton.style.margin = '5px';

                const tet = document.createElement('span');
                tet.innerHTML = `${nom} &times;`;
                tet.style.color = contraste;

                newButton.appendChild(tet);
                newButton.addEventListener('click', function() {
                    outputDiv.removeChild(newButton);

                    const index = selectChips.indexOf(id);
                    if (index !== -1) {
                        selectChips.splice(index, 1);
                    }
                });

                outputDiv.appendChild(newButton);
            }
        });

        chipsContainer.appendChild(chip);
    }

    // Gestion de l'ajout de nouvelles chips lors de la saisie
    // Fonction pour ajouter une nouvelle chip
    function addChip(nom, couleur, contraste, id) {
        const chip = document.createElement('div');
        chip.classList.add('btn-sm', 'rounded-pill', 'chip');
        chip.style.color = contraste;
        chip.style.backgroundColor = couleur;
        chip.setAttribute('data-id', id);
        chip.setAttribute('data-bs-toggle', 'modal');
        chip.setAttribute('data-bs-target', '#chipModal');
        chip.setAttribute('data-bs-whatever', id);

        const text = document.createElement('span');
        text.innerText = nom;

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('btn-close');

        closeButton.addEventListener('click', () => {
            chipsContainer.removeChild(chip);
        });

        chip.appendChild(text);
        chip.appendChild(closeButton);

        chipsContainer.appendChild(chip);
        chip.addEventListener('dblclick', function() {

                const recipient = button.getAttribute('data-bs-whatever');
                const chip = getChipById(recipient);
                const modalBodyInput = exampleModal.querySelector('.modal-body input');
                modalBodyInput.value = chip.nom;


            document.getElementById('chipModalLabel').innerText = nom;
            document.getElementById('chipModalColor').value = couleur;
            document.getElementById('chipModalContrast').value = contraste;
            document.getElementById('chipModalId').value = id;
        });
    }
    // Saisie du nom de la chip
    chipInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && chipInput.value.trim() !== '') {
            addChip(chipInput.value.trim(), '#ffffff', '#000000', Date.now());

            // Ajout de la nouvelle chip à la liste initiale A MODIFIER POUR ENVOI BDD
            initialChips.push({
                nom: chipInput.value.trim(),
                couleur: '#ffffff',
                contraste: '#000000',
                id: Date.now()
            });

            // Affichage des chips initiales
            chipsContainer.innerHTML = '';
            initialChips.forEach(chipData => {
                addChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id);
            });

            // Réinitialisation du champ de saisie
            chipInput.value = '';
        }
    });

    // Gestion des onglets de sélection et d'édition
    // Selection
    document.getElementById('selectionTab').addEventListener('click', function() {
        document.getElementById('selectionTab').classList.add('active');
        document.getElementById('editionTab').classList.remove('active');
        document.getElementById("chipInput").style.display = "none";

        chipsContainer.innerHTML = '';
        initialChips.forEach(chipData => {
            affChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id);
        });
    });
    // Edition
    document.getElementById('editionTab').addEventListener('click', function() {
        document.getElementById('editionTab').classList.add('active');
        document.getElementById('selectionTab').classList.remove('active');
        document.getElementById("chipInput").style.display = "block";

        chipsContainer.innerHTML = '';
        initialChips.forEach(chipData => {
            addChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id);
        });
    });

    // Affichage des chips initiales
    initialChips.forEach(chipData => {
        affChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id);
    });

    // Cacher le champ de saisie d'une nouvelle chip
    document.getElementById("chipInput").style.display = "none";
});