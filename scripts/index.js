/* eslint-disable no-undef */
// import { accordeon } from "./accordeon.js";
import { afficherImageProduit, afficherScores } from "./images.js";
import { afficherTableau } from "./tableau.js";
import { afficherCaracteristiques } from "./caracteristiques.js";
import { afficherIngredients } from "./ingredients.js";

// accordeon();
const $section = $("#section");
const $code = $("#rechercher");
const $formulaire = $("#demande");
const regex = /[0-9]{8,13}/;
let resultat;

/**
 *
 * Lance toute les fonctions d'affichage des données.
 * @param {*} resultat  = json du produit
 */
const afficher = function (resultat) {
    afficherImageProduit(resultat);
    afficherScores(resultat);
    afficherIngredients(resultat);
    afficherCaracteristiques(resultat);
    afficherTableau(resultat);
};

/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la recherche et
 * rend visible la fiche produit.
 */

$formulaire.on("submit", function (e) {
    const $adresseReq =
        "http://fr.openfoodfacts.org/api/v2/search?code=" + $code.val();
    if (regex.test($code.val())) {
        e.preventDefault();

        $.getJSON($adresseReq, function (data) {
            resultat = data;
            if (resultat.count === 0) {
                alert("Le produit n'est pas présent dans la base de données");
            } else {
                console.table(resultat);

                afficher(resultat);
                $section.attr("id", "montrer");
            }
        }).fail(function (err) {
            alert("Le produit n'est pas présent dans la base de données");
            console.log(err.message);
        });
    } else {
        alert("veuillez entrer un code barre valide");
    }
});
