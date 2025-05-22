const listeLnk = document.getElementById('listedesliens');
listeLnk.addEventListener('click', lesliens);
const lesfavs = document.getElementById('lesfavos');
lesfavs.addEventListener('click', lesliens);

const cardManager = {
  // Liste initiale des cartes
  cards: [
      { id: "8", title: "Special title", lnk: "http://www.test.do", date: "2005-02-15", text: "With supporting text below as a natural lead-in to additional content.", type: 2, shared: false, liked: false, tags: [15, 208]},
      { id: "3", title: "Speciae", lnk: "https://duss.alwaysdata.net/mylinks/", date: "2025-03-15", text: "With supporting text below as a natural lead-in to additional content.", type: 1, shared: true, liked: true, tags: [3, 15, 208] },
      { id: "15", title: "title", lnk: "http://www.test.do", date: "2011-12-01", text: "With supporting text below as a natural lead-in to additional content.", type: 3, shared: true, liked: false, tags: [3, 125] }
  ],

  // Getter: récupérer une carte par son id
  getCardById: function(id) {
      return this.cards.find(card => card.id === id);
  },

  // Getter: récupérer la liste des tags d'une carte par son id
  getTagsById: function(id) {
      const card = this.getCardById(id);
      return card ? card.tags : null;
  },

  // Setter: modifier une carte par son id
  setCardById: function(id, newCard) {
      const index = this.cards.findIndex(card => card.id === id);
      if (index !== -1) {
          this.cards[index] = { ...this.cards[index], ...newCard };
      }
  },

    // Setter: modifier shared par son id
    setSharedCard: function(id, newShare) {
      const index = this.cards.findIndex(card => card.id === id);
      if (index !== -1) {
          this.cards[index].shared = newShare;
      }
  },

    // Setter: modifier likeded par son id
    setLikedCard: function(id, newLike) {
      const index = this.cards.findIndex(card => card.id === id);
      if (index !== -1) {
          this.cards[index].liked = newLike;
      }
  },

  // Ajouter une carte à la liste
  addCard: function(title, lnk, date, text, shared, liked, id) {
      const newCard = {
          title: title,
          lnk: lnk,
          date: date,
          text: text,
          shared: shared,
          liked: liked,
          id: id
      };
      this.cards.push(newCard);
  },

  // Supprimer une carte de la liste
  removeCard: function(id) {
      const index = this.cards.findIndex(card => card.id === id);
      if (index !== -1) {
          this.cards.splice(index, 1);
      }
  },

  // Getter: récupérer toute la liste des cartes
  getAllCards: function() {
      return this.cards;
  },

  // Setter: initialiser ou réinitialiser la liste des cartes
  setInitialCards: function(newCards) {
      if (Array.isArray(newCards)) {
          this.cards = newCards;
      } else {
          console.error("La nouvelle liste des cartes doit être un tableau.");
      }
  }
};

// Fonction pour calculer la différence entre deux dates en années, mois et jours
function diffEnAnneesMoisJours(dateStr) {
  const dateDebut = new Date(dateStr);
  const dateFin = new Date();

  let annee = dateFin.getFullYear() - dateDebut.getFullYear();
  let mois = dateFin.getMonth() - dateDebut.getMonth();
  let jours = dateFin.getDate() - dateDebut.getDate();

  // Ajustements si le jour ou le mois est négatif
  if (jours < 0) {
    const moisPrecedent = new Date(dateFin.getFullYear(), dateFin.getMonth(), 0);
    jours += moisPrecedent.getDate();
    mois--;
  }

  if (mois < 0) {
    mois += 12;
    annee--;
  }

  const resultats = [];

  if (annee > 0) resultats.push(`${annee} an${annee > 1 ? 's' : ''}`);
  if (mois > 0) resultats.push(`${mois} mois`);
  if (jours > 0) resultats.push(`${jours} jour${jours > 1 ? 's' : ''}`);

  // Si tout est à 0, afficher "0 jour"
  if (resultats.length === 0) return "0 jour";

  return resultats.join(', ');
}

// Fonction pour préremplissage du formulaire pour modification du lien
function handleModify(cardId) {
  const card = cardManager.getCardById(cardId);
  if (card) {
    // Ouvrir le formulaire de modification
    openNewlink(); // Simule le clic sur le bouton pour ouvrir le formulaire
    
    const form = document.getElementById('formlink');
    if (!form) return;

    // Préremplir l'input caché id
    const dataId = form.querySelector('#dataId');
    if (dataId && card.id !== undefined) dataId.value = card.id;
    // Préremplir les champs texte
    if (card.title !== undefined) form.querySelector('input[name="nom"]').value = card.title;
    if (card.text !== undefined) form.querySelector('input[name="descrip"]').value = card.text;
    if (card.lnk !== undefined) form.querySelector('input[name="url"]').value = card.lnk;

    // Préremplir le select
    const select = form.querySelector('select.queltype');
    if (select && card.type !== undefined) {
      changerSelectionParDefaut(card.type); //Fct definit dans select.js
    }

    // Préremplir le bouton de partagepréremplir les tags
    card.tags.forEach(tagId => {
        whereselect.set('itemvalide');
        affchipcont(String(tagId));
    });
  } else {
    console.error(`Aucune carte trouvée avec l'ID ${cardId}`);
  }
};

// Fonction pour créer le menu déroulant des cards
function createDropdown(cardId, cardTitle) {
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';

  const button = document.createElement('button');
  button.className = 'btn btn-secondary';
  button.type = 'button';
  button.setAttribute('data-bs-toggle', 'dropdown');
  button.setAttribute('aria-expanded', 'false');

  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.textContent = 'format_list_bulleted';

  button.appendChild(icon);
  dropdown.appendChild(button);

  const ul = document.createElement('ul');
  ul.className = 'dropdown-menu';

  // Création de l'élément "Modifier"
  const liModif = document.createElement('li');
  liModif.className = 'dropdown-item d-flex align-items-center';
  liModif.id = `modif${cardId}`;

  const iconModif = document.createElement('span');
  iconModif.className = 'material-icons me-2';
  iconModif.textContent = 'edit_square';

  const textModif = document.createElement('span');
  textModif.textContent = 'Modifier';

  liModif.appendChild(iconModif);
  liModif.appendChild(textModif);

  // Gestionnaire de clic pour la modification de la card
  liModif.addEventListener('click', () => handleModify(cardId));

  // Création de l'élément "Supprimer"
  const liDelete = document.createElement('li');
  liDelete.className = 'dropdown-item d-flex align-items-center';
  liDelete.id = `suppress${cardId}`;

  const iconDelete = document.createElement('span');
  iconDelete.className = 'material-icons';
  iconDelete.textContent = 'delete';

  const textDelete = document.createElement('span');
  textDelete.textContent = 'Supprimer';

  liDelete.appendChild(iconDelete);
  liDelete.appendChild(textDelete);

  // Gestionnaire de clic pour la suppression
  liDelete.addEventListener('click', () => {
    const namechipdelete= document.querySelector('#lienDeleteModal .modal-body #deliename')
    namechipdelete.innerHTML= cardTitle;
    const iDchipdelete= document.querySelector('#lienDeleteModal .modal-footer .lienDeleteId')
    iDchipdelete.innerHTML= cardId;

    const modalert = new bootstrap.Modal(document.getElementById('lienDeleteModal'));
    modalert.show();
  });

  ul.appendChild(liModif);
  ul.appendChild(liDelete);
  dropdown.appendChild(ul);

  return dropdown;
}

  // Récupérer le bouton "Supprimer" dans la modal de suppression du lien
  const deleteButton = document.querySelector('#lienDeleteModal .btn-danger');
  // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Supprimer" de la modal
  deleteButton.addEventListener('click', () => {
      // Récupérer l'ID du lien à supprimer
      const lienId = document.querySelector('#lienDeleteModal .modal-footer .lienDeleteId').innerHTML;

      // Supprimer le lien correspondante dans votre base de données BDD
      // si valide passer à la suite

      // Supprimer la card du DOM avec l'ID spécifique
      const lienElement = document.getElementById(`card-${lienId}`);

      // Vérifier si l'élément existe
      if (!lienElement) {
          console.error(`Aucun élément trouvé avec l'ID ${lienId}`);
          return;
      } else {
          cardManager.removeCard(lienId); // Supprimer la carte de la liste
          lienElement.remove(); // Supprimer la card du DOM
      }

      // Fermer la modal après la suppression
      const modal = bootstrap.Modal.getInstance(document.getElementById('lienDeleteModal'));
      modal.hide();
  });


function lesliens() {
      closeSidePanel(); // Ferme le volet
      
      // Récupération des éléments du DOM
      document.getElementById('listeContainer').innerHTML = '';
      document.getElementById("newformlink").style.display = "none";
      document.getElementById("listeContainer").style.display = "block";
      document.getElementById("research").style.display = "block";
      clearChips();
      whereselect.set('filtractif');

      const cardData = cardManager.getAllCards();

      const mainContent = document.getElementById('listeContainer');
      const row = document.createElement('div');
      row.className = 'p-3 row row-cols-2 g-3';

      cardData.forEach(card => {
        const cardid = card.id;
        const col = document.createElement('div');
        col.className = 'col';

        const cardDiv = document.createElement('div');
        cardDiv.setAttribute('id', `card-${cardid}`);
        cardDiv.className = 'card text-center';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header d-flex justify-content-between align-items-center';

        const cardIcon = document.createElement('span');
        cardIcon.className = ('material-icons card-icon');
        try {
          const parsed = new URL(card.lnk);
          if (parsed.hostname === heberge) {
            cardIcon.textContent = 'my_location';
          } else {
            cardIcon.textContent = '🕸';
          }
        } catch (e) {
          console.log("URL invalide.");
        }

        const cardTitle = document.createElement('a');
        cardTitle.href = card.lnk;
        cardTitle.target = '_blank';
        const cardTitleText = document.createElement('h5');
        cardTitleText.className = 'card-title m-0';
        const cardTitleSpan = document.createElement('span');
        cardTitleSpan.setAttribute('data-toggle', 'tooltip');
        cardTitleSpan.setAttribute('title', card.lnk);
        cardTitleSpan.textContent = card.title;
        cardTitleText.appendChild(cardTitleSpan);
        cardTitle.appendChild(cardTitleText);

        const cardDate = document.createElement('span');
        cardDate.className = 'date';
        cardDate.textContent = card.date;

        const shareButton = document.createElement('button');
        shareButton.className = `btn ${card.shared ? 'shared' : 'share'}`;
        shareButton.type = 'button';
        shareButton.id = `shar${cardid + 1}`;
        shareButton.innerHTML = `<span class="material-icons">${card.shared ? 'share' : 'share_off'}</span>`;
        shareButton.addEventListener('click', () => {
          card.shared = !card.shared;
          shareButton.className = `btn ${card.shared ? 'shared' : 'share'}`;
          shareButton.innerHTML = `<span class="material-icons">${card.shared ? 'share' : 'share_off'}</span>`;
          cardManager.setSharedCard(cardid, card.shared); // Update the shared status in dataBase MAJ BDD -----------------
        });
        shareButton.addEventListener('mouseenter', () => {
          shareButton.innerHTML = `<span class="material-icons">${card.shared ? 'share_off' : 'share'}</span>`;
        }); 
        shareButton.addEventListener('mouseleave', () => {
          shareButton.innerHTML = `<span class="material-icons">${card.shared ? 'share' : 'share_off'}</span>`;
        });

        const likeButton = document.createElement('button');
        likeButton.className = `btn ${card.liked ? 'liked' : 'like'}`;
        likeButton.type = 'button';
        likeButton.id = `lik${cardid + 1}`;
        likeButton.innerHTML = `<span class="material-icons">${card.liked ? 'favorite' : 'heart_broken'}</span>`;
        likeButton.addEventListener('click', () => {
          card.liked = !card.liked;
          likeButton.className = `btn ${card.liked ? 'liked' : 'like'}`;
          likeButton.innerHTML = `<span class="material-icons">${card.liked ? 'favorite' : 'heart_broken'}</span>`;
          cardManager.setLikedCard(cardid, card.liked); // Update the liked status in dataBase MAJ BDD -----------------
        });
        likeButton.addEventListener('mouseenter', () => {
          likeButton.innerHTML = `<span class="material-icons">${card.liked ? 'heart_broken' : 'favorite'}</span>`;
        }); 
        likeButton.addEventListener('mouseleave', () => {
          likeButton.innerHTML = `<span class="material-icons">${card.liked ? 'favorite' : 'heart_broken'}</span>`;
        });
        
        // Dropdown menu
        const dropdownElement = createDropdown(cardid, card.title);

        cardHeader.append(cardIcon, cardTitle, cardDate, shareButton, likeButton, dropdownElement);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.innerHTML = `<p class="card-text"><i>${card.text}</i></p><p class="card-text"><small class="text-body-secondary">Depuis ${diffEnAnneesMoisJours(card.date)}</small></p>`;
        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer text-body-secondary';

        const result = chipsManager.getChipsFromCardId(cardid, cardManager);
        
        result.forEach(chip => {;
          affChip(chip.nom, chip.couleur, chip.contraste, chip.id, cardFooter);
        });

        cardDiv.append(cardHeader, cardBody, cardFooter);
        col.appendChild(cardDiv);
        row.appendChild(col);
      });

      mainContent.appendChild(row);
    }

    lesliens(); // Call the function to display the cards on page load