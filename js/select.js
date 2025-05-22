const selectManager = {
    // 1. Liste contenant les options à récupérer dans la BDD
    typeListe: [
        {1: "Page"}, {2: "Image"}, {3: "Vidéo"}, {4: "Son"}, {5: "Texte"}, {6: "PDF"},
        {7: "Présentation"}, {8: "3D"}, {10: "Formulaire"}, {11: "Carte"},
        {12: "Tableau"}, {13: "Graphique"}, {14: "Animation"}, {15: "Jeu"}, {16: "Quiz"},
        {17: "Simulation"}, {9: "Autre"}
    ],

    // Getter: récupérer toute la liste des types
    getAllCards: function() {
        return this.typeListe.map(item => Object.values(item)[0]); // Renvoie un tableau avec les valeurs des objets
    },

    // Setter: initialiser ou réinitialiser la liste des types
    // Utilisation : selectManager.setInitialTypes([{1: "Nouveau Type 1"}, {2: "Nouveau Type 2"}]);
    setInitialTypes: function(newTypes) {
        if (Array.isArray(newTypes)) {
            this.typeListe = newTypes;
        } else {
            console.error("La nouvelle liste des types doit être un tableau.");
        }
    }
};

// 2. Si MAJ depuis BBD => OK alors on applique la suite
function appliquerOptionsDansSelects() {
    const selects = document.querySelectorAll('select.queltype');
    
    selects.forEach(select => {
        select.innerHTML = '';

        // On parcourt la liste d'objets {clé: valeur}
        selectManager.typeListe.forEach(item => {
            const key = Object.keys(item)[0];       // clé (ex: "1")
            const value = item[key];                // valeur (ex: "Page")

            const option = document.createElement('option');
            option.textContent = value;             // Texte affiché
            option.value = key;                     // Attribut value
            select.appendChild(option);
        });

        // Optionnel : sélectionner la première option par défaut
        if (select.options.length > 0) {
            select.options[0].selected = true;
        }
    });
}

// 3. Fonction pour changer la sélection par défaut
// EX: changerSelectionParDefaut("3"); // sélectionne "Vidéo" si présent

function changerSelectionParDefaut(valueCible) {
    const select = document.getElementById('keltyp'); // un seul <select>

    const optionToSelect = select.querySelector(`option[value="${valueCible}"]`);
    if (optionToSelect) {
        select.value = valueCible;
    } else {
        console.warn(`Aucune option avec la valeur "${valueCible}" trouvée dans le select.`);
    }
}


// Exécution au chargement de la page
document.addEventListener('DOMContentLoaded', appliquerOptionsDansSelects);

