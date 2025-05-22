#!/bin/bash

# Remplacez ceci par votre token d'authentification réel
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NzI0MjU0NywianRpIjoiNzUyNjhjYTQtMjIwMy00NWU4LThlZTMtMTkxNWFhYmIyMTg1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InN1aXZpIiwibmJmIjoxNzQ3MjQyNTQ3LCJjc3JmIjoiNDgxY2EzNjEtYmExZi00ZTBhLWJmNjUtNzJjYTA5MTljMzkwIiwiZXhwIjoxNzQ3MjQzNDQ3fQ.E2lPkpNFKHynAwS4rtmy2IR5BuWrxHu59CcIdlxdd0Q"
API_URL="https://duss.alwaysdata.net/mylinks//tags"
JSON_FILE="couleurs_avec_contraste.json"

# Vérifier que jq est installé
if ! command -v jq &> /dev/null
then
    echo "Erreur : 'jq' n'est pas installé. Installez-le avec : sudo apt install jq"
    exit 1
fi

# Lire chaque objet du fichier JSON et envoyer une requête POST
jq -c '.[]' "$JSON_FILE" | while read -r row; do
    name=$(echo "$row" | jq -r '.nom')
    color=$(echo "$row" | jq -r '.couleur')

    echo "Ajout du tag: $name ($color)"

    curl -s -X POST "$API_URL" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"$name\", \"color\": \"$color\"}"

    echo # saut de ligne
done

