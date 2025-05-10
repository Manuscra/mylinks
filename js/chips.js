const chipsManager = {
    // Liste initiale des chips
    chips: [
        { nom: "Bana", couleur: "#654321", contraste: "#ffffff", id: "30" },
        { nom: "Radis", couleur: "#650056", contraste: "#ffffff", id: "105" },
        { nom: "Peche", couleur: "#00ff00", contraste: "#ffffff", id: "12" },
        { nom: "Pomme", couleur: "#123456", contraste: "#ffffff", id: "3" },
        { nom: "Navet", couleur: "#005656", contraste: "#ffffff", id: "15" },
        { nom: "Citron", couleur: "#ff0000", contraste: "#ffffff", id: "125" },
        { nom: "Pêche", couleur: "#00ff00", contraste: "#000000", id: "208" }
    ],

    // Getter: récupérer un chip par son id
    getChipById: function(id) {
        return this.chips.find(chip => chip.id === id);
    },

    // Getter: récupérer plusieurs chips par un tableau d'ids
    getChipsByIds: function(ids) {
        return this.chips.filter(chip => ids.includes(chip.id));
    },

    // Getter: récupérer les chips associés aux tags d'une carte
    getChipsFromCardId: function(cardId, cardManager) {
        const tags = cardManager.getTagsById(cardId);
        if (!Array.isArray(tags)) return []; // Sécurité si la carte n'existe pas
        const tagIdsAsStrings = tags.map(String); // Conversion en string
        return this.getChipsByIds(tagIdsAsStrings);
    },

    // Setter: modifier un chip par son id
    setChipById: function(id, newChip) {
        const index = this.chips.findIndex(chip => chip.id === id);
        if (index !== -1) {
            this.chips[index] = { ...this.chips[index], ...newChip };
        }
    },

    // Ajouter un chip à la liste
    addChip: function(nom, couleur, contraste, Id) {
        const newChip = {
            nom: nom,
            couleur: couleur,
            contraste: contraste,
            id: Id
        };
        this.chips.push(newChip);
    },

    // Supprimer un chip de la liste
    removeChip: function(id) {
        const index = this.chips.findIndex(chip => chip.id === id);
        if (index !== -1) {
            this.chips.splice(index, 1);
        }
    },

    // Getter: récupérer toute la liste des chips
    getAllChips: function() {
        return this.chips;
    },

    // Setter: initialiser ou réinitialiser la liste des chips
    setInitialChips: function(newChips) {
        if (Array.isArray(newChips)) {
            this.chips = newChips;
        } else {
            console.error("La nouvelle liste des chips doit être un tableau.");
        }
    }
};

//contraste de la couleur du texte pour button tag
function getContrastYIQ(hexcolor){
    // Convertit la couleur hexadécimale en valeurs RGB
    let r = parseInt(hexcolor.substr(1,2),16);
    let g = parseInt(hexcolor.substr(3,2),16);
    let b = parseInt(hexcolor.substr(5,2),16);
    
    // Calcule le contraste selon la formule YIQ
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    
    // Retourne 'black' pour les couleurs claires et 'white' pour les couleurs sombres
    return (yiq >= 128) ? '#3C3C3C' : 'white';
}

// Liste des chips sélectionnées
const selectChips = [];

// Fonction pour vider la liste des chips
function clearChips() {
    // Vider l'affichage des chips
    document.getElementById('filtractif').innerHTML = '';
    document.getElementById('itemvalide').innerHTML = '';

    // Réinitialiser la liste
    selectChips.length = 0;  // Vide la liste des chips sélectionnées
}

// Objet whereselect avec des méthodes pour assigner et lire la valeur
const whereselect = {
    value: 'filtractif', // Valeur par défaut

    // Méthode pour assigner une nouvelle valeur
    set(newValue) {
        this.value = newValue;
    },

    // Méthode pour lire la valeur actuelle
    get() {
        return this.value;
    }
};

// Fonction pour générer une chip
function affChip(nom, couleur, contraste, id, Container) {
    const chip = document.createElement('span');
    chip.className = `badge chip rounded-pill me-1`;
    chip.textContent = nom;
    chip.setAttribute('data-id', id);
    chip.setAttribute('data-toggle', 'tooltip');
    chip.style.backgroundColor = couleur;
    chip.style.color = contraste;
    chip.style.fontWeight = 'normal';
    chip.style.cursor = 'pointer';
    
    chip.addEventListener('click', function() {
        const outputDiv = document.getElementById(whereselect.get());
        if (!selectChips.includes(id)) {
            //if (whereselect.get() === 'filtractif') selectChips.push(id);
            selectChips.push(id);

            // Récupérer les données de la chip
            const chipData = chipsManager.getChipById(id);
            if (!chipData) {
                console.error(`Aucune chip trouvée avec l'ID : ${id}`);
                return;
            }
            else {
                const newButton = document.createElement('span');
                newButton.className = `badge chip rounded-pill me-1`;
                newButton.innerHTML = `${chipData.nom} &times;`;
                newButton.setAttribute('data-id', id);
                newButton.setAttribute('data-toggle', 'tooltip');
                newButton.setAttribute('id', 'coche'); // Ajout d'un ID pour les chips selectionnés
                newButton.style.backgroundColor = chipData.couleur;
                newButton.style.color = chipData.contraste;
                newButton.style.fontWeight = 'normal';
                newButton.style.cursor = 'pointer';

                newButton.addEventListener('click', function() {
                    outputDiv.removeChild(newButton);

                    const index = selectChips.indexOf(id);
                    if (index !== -1 && whereselect.get() === 'filtractif' || 'itemvalide') {
                        selectChips.splice(index, 1);
                    }
                });

                outputDiv.appendChild(newButton);
            }
        }
    });
    Container.appendChild(chip);
}

document.addEventListener('DOMContentLoaded', () => {
    const chipInput = document.getElementById('chipInput');
    const chipsContainer = document.getElementById('chipsContainer');

    // Récupérer le bouton "Sauvegarder" dans la modal de modification du chip
    const saveButton = document.querySelector('#chipModal .btn-danger');
    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Sauvegarder" de la modal
    saveButton.addEventListener('click', () => {
        // Récupérer les valeurs des champs d'entrée dans la modal
        const chipName = document.querySelector('#chipModal .modal-body .chipModalLabel').value;
        const chipColor = document.querySelector('#chipModal .modal-body .chipModalColor').value;
        const contrasteColor = getContrastYIQ(chipColor); // Calculer le contraste de la couleur
        const chipId = document.getElementById('chipModalId').value; // Récupérer l'ID de la chip

        // Update la chip correspondante dans la base de données
        // si valide passer à la suite
        const chipData = chipsManager.getChipById(chipId);
        if (chipData) {
            // Mettre à jour le nom et la couleur et le contraste de la chip
            chipsManager.setChipById(chipId, { nom: chipName, couleur: chipColor, contraste: contrasteColor });
        } else {
            console.log(`Aucune chip trouvée avec l'ID : ${chipId}`);
        }

        // Mettre à jour la chip dans l'interface
        const chipElements = document.querySelectorAll('.chip');
        chipElements.forEach(chipElement => {
            const chipid = chipElement.getAttribute('data-id');
            if (chipid === chipId) {
                // Sélectionner tous les éléments span à l'intérieur de chipElement
                const spans = chipElement.querySelectorAll('span');

                spans.forEach(span => {
                    if (span.id === 'coche') { 
                        span.innerHTML = `${chipName} &times;`; // Mettre à jour le nom
                    } else {
                        span.innerHTML = `${chipName}`; // Mettre à jour le nom sans croix
                    }
                });

                // Sélectionner le bouton à l'intérieur du chipelement
                const bt = chipElement.querySelector('button');
                if (bt) {
                     bt.style.color = contrasteColor; // Mettre à jour le contraste
                }

                // Mettre à jour la couleur et le contraste de la chip
                chipElement.style.color = contrasteColor; // Mettre à jour le contraste
                chipElement.style.backgroundColor = chipColor; // Mettre à jour la couleur si id correspond
            }
        });

        // Fermer la modal après la sauvegarde
        const modal = bootstrap.Modal.getInstance(document.getElementById('chipModal'));
        modal.hide();
    });

    // Récupérer le bouton "Supprimer" dans la modal de suppression du chip
    const deleteButton = document.querySelector('#chipDeleteModal .btn-danger');
    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Supprimer" de la modal
    deleteButton.addEventListener('click', () => {
        // Récupérer l'ID de la chip à supprimer
        const chipId = document.querySelector('#chipDeleteModal .modal-footer .chipDeleteId').innerHTML;

        // Supprimer la chip correspondante dans votre base de données
        // si valide passer à la suite

        // Sélectionner la chip avec l'ID spécifique
        const chipElements = document.querySelectorAll(`.chip[data-id="${chipId}"]`);

        // Parcourir chaque élément et les supprimer
        chipElements.forEach(chip => {
            // Récupérer le parent de l'élément chip
            const parent = chip.parentNode;
        
            // Supprimer l'élément chip du parent, s'il existe
            if (parent) {
                parent.removeChild(chip);
            }
        });
        
        // Supprimer dans la liste initiale
        chipsManager.removeChip(chipId);

        // Fermer la modal après la suppression
        const modal = bootstrap.Modal.getInstance(document.getElementById('chipDeleteModal'));
        modal.hide();
    });

    // Fonction pour ajouter une nouvelle chip
    function addChip(nom, couleur, contraste, id) {

        const chip = document.createElement('span');
        chip.className = `badge chip rounded-pill me-1`;
        chip.textContent = nom;
        chip.setAttribute('data-id', id);
        chip.setAttribute('data-toggle', 'tooltip');
        chip.style.backgroundColor = couleur;
        chip.style.color = contraste;
        chip.style.fontWeight = 'normal';
        chip.style.cursor = 'pointer';

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('btn-close');
        closeButton.style.color = contraste;

        // MODAL pour confirmer la suppression
        closeButton.addEventListener('click', () => {
            const namechipdelete= document.querySelector('#chipDeleteModal .modal-body #delname')
            namechipdelete.innerHTML= nom;
            const iDchipdelete= document.querySelector('#chipDeleteModal .modal-footer .chipDeleteId')
            iDchipdelete.innerHTML= id;

            const modalert = new bootstrap.Modal(document.getElementById('chipDeleteModal'));
            modalert.show();
        });

        chip.appendChild(closeButton);

        // Récupère les données de la chip pour mette à jour la modal de modification
        chip.addEventListener('dblclick', function() {   
            const modalIdInput = document.querySelector('#chipModal .modal-body .chipModalId')
            modalIdInput.value = id;

            // Récupérer les données de la chip
            const chipData = chipsManager.getChipById(id);
            if (!chipData) {
                console.error(`Aucune chip trouvée avec l'ID : ${id}`);
                return;
            }

            const modalLabelInput = document.querySelector('#chipModal .modal-body .chipModalLabel');
            modalLabelInput.value = chipData.nom;

            const modalColorInput = document.querySelector('#chipModal .modal-body .chipModalColor');
            modalColorInput.value = chipData.couleur;

            // Ouvrir la modal manuellement
            const modal = new bootstrap.Modal(document.getElementById('chipModal'));
            modal.show();
        });

        chipsContainer.appendChild(chip);
    }

    // Gestion de l'ajout de nouvelles chips lors de la saisie
    chipInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && chipInput.value.trim() !== '') {
            const nameChip = chipInput.value.trim();
            // Ajout de la nouvelle chip à la liste initiale + MAJ BDD
            // Recupe du ID de la chip dans la BDD
            const chipId = String(Date.now()); // Utiliser un timestamp comme ID unique

            chipsManager.addChip(nameChip, '#ffffff', '#000000', chipId);
            // Ajout de la nouvelle chip à l'affichage
            addChip(nameChip, '#ffffff', '#000000', chipId);

            // Réinitialisation du champ de saisie
            chipInput.value = '';
        }
    });

    // Gestion de l'onglet de sélection
    document.getElementById('selectionTab').addEventListener('click', function() {
        document.getElementById('selectionTab').classList.add('active');
        document.getElementById('editionTab').classList.remove('active');
        document.getElementById("chipInput").style.display = "none";
        if (whereselect.get() === 'filtractif') {
            document.getElementById("filtractif").style.display = "block";
        }

        chipsContainer.innerHTML = '';
        chipsManager.getAllChips().forEach(chipData => {
            affChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id, chipsContainer);
        });
    });

    // Gestion de l'onglet d'édition
    document.getElementById('editionTab').addEventListener('click', function() {
        document.getElementById('editionTab').classList.add('active');
        document.getElementById('selectionTab').classList.remove('active');
        document.getElementById("chipInput").style.display = "block";

        chipsContainer.innerHTML = '';
        chipsManager.getAllChips().forEach(chipData => {
            addChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id);
        });
    });

    // Affichage des chips initiales
    chipsManager.getAllChips().forEach(chipData => {
        affChip(chipData.nom, chipData.couleur, chipData.contraste, chipData.id, chipsContainer);
    });

    // Cacher le champ de saisie d'une nouvelle chip
    document.getElementById("chipInput").style.display = "none";
});

