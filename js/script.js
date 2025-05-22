// Récupération des éléments du DOM
const mainContent = document.getElementById('main-content');
const toggleBtn = document.getElementById('toggle-btn');
const sidePanel = document.getElementById('side-panel');
const voletDiv = document.getElementById('myVolet');
const newlien = document.getElementById('newlink');

// Parametres
const heberge= "duss.alwaysdata.net";

function textduBouton() {
  // Modifier le texte du bouton selon l'état du volet
if (sidePanel.classList.contains('open')) {
  toggleBtn.innerHTML =`<span class="material-icons">left_panel_close</span>`; // Bouton indique fermeture
  document.getElementById("myVolet").style.display = "block";
} else {
  toggleBtn.innerHTML = `<span class="material-icons">left_panel_open</span>`; // Bouton indique ouverture
  document.getElementById("myVolet").style.display = "none";
}
}

// toggleBtn.innerHTML = ''; // Bouton indique ouverture
// toggleBtn.innerHTML = '<span class="material-icons">list_alt</span> Liste des liens'; // Bouton indique fermeture

// Fonction pour ouvrir et fermer le volet latéral
toggleBtn.addEventListener('click', () => {
  // Alterner la classe 'open' sur le volet latéral
  sidePanel.classList.toggle('open');
  
  // Alterner la classe 'open' sur le bouton pour changer son apparence
  toggleBtn.classList.toggle('open');
  
  // Alterner la classe 'open' sur le chips-container pour changer son apparence
  voletDiv.classList.toggle('open');
 
  // Alterner la classe 'open' sur le main-content pour changer son apparence
  mainContent.classList.toggle('open');
  
  // Modifier le texte du bouton selon l'état du volet
  textduBouton();
});

textduBouton();

// Fonction pour simuler un clic sur le bouton toggleBtn pour ouvrir le volet
function openSidePanel() {
  if (!sidePanel.classList.contains('open')) {
    toggleBtn.click(); // Simule un clic sur le bouton
  }
}

// Fonction pour simuler un clic sur le bouton toggleBtn pour fermer le volet
function closeSidePanel() {
  if (sidePanel.classList.contains('open')) {
    toggleBtn.click(); // Simule un clic sur le bouton
  }
}

// Fonction pour simuler un clic sur le bouton newLnk
function openNewlink() {
    newlien.click(); // Simule un clic sur le bouton
}



