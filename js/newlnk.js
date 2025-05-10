const newLnk = document.getElementById('newlink');
newLnk.addEventListener('click', newLink);
document.getElementById("newformlink").style.display = "none";


function newLink() {
    document.getElementById("listeContainer").style.display = "none";
    document.getElementById("newformlink").style.display = "block";
    document.getElementById("research").style.display = "none";
    clearChips();
    whereselect.set('itemvalide');
    openSidePanel(); // Ouvre le volet
}

