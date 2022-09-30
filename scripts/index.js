/* eslint-disable no-undef */
$(".accordion").on("click", function (e) {
    $(this).toggleClass("active");

    /* Toggle between hiding and showing the active panel */
    const $panel = $(this).next();
    if ($panel.is(":visible")) {
        $panel.css("display", "none");
    } else {
        $panel.css("display", "block");
    }
});

const $section = $("#section");
const $code = $("#rechercher");
const $formulaire = $("#demande");
const $imgProduct = $("#imgProduct");
const $imgNutri = $("#imgNutri");
const $imgNova = $("#imgNova");
const $imgEcoscore = $("#imgEcoscore");
const $ingredients = $("#listeIngredients");
const $caracteristiques = $("#carac");
const $tableNut = $("#tableNutri");
const regex = /[0-9]{8,13}/;
let resultat;

/**
 *
 *Affiche l'image du produit.
 * @param {*} resultat = json du produit
 */
const afficherImageProduit = function (resultat) {
    if (resultat.products[0].image_small_url) {
        $imgProduct.attr("src", resultat.products[0].image_small_url);
    } else {
        $imgProduct.attr("src", "/images/pasImage.svg");
    }
};

/**
 *
 *Affiche les image des scores Nova eco et nutri.
 * @param {*} resultat = json  du produit
 */
const afficherScores = function (resultat) {
    switch (resultat.products[0]["nutriscore_grade"]) {
        case "a":
            $imgNutri.attr("src", "/images/nutriscore-a.svg");
            break;
        case "b":
            $imgNutri.attr("src", "/images/nutriscore-b.svg");
            break;
        case "c":
            $imgNutri.attr("src", "/images/nutriscore-c.svg");
            break;
        case "d":
            $imgNutri.attr("src", "/images/nutriscore-d.svg");
            break;
        case "e":
            $imgNutri.attr("src", "/images/nutriscore-e.svg");
            break;
        default:
            $imgNutri.attr("src", "/images/nutriscore-unknown.svg");
    }
    switch (resultat.products[0]["nova_group"]) {
        case 1:
            $imgNova.attr("src", "/images/nova-group-1.svg");
            break;
        case 2:
            $imgNova.attr("src", "/images/nova-grousssszzp-2.svg");
            break;
        case 3:
            $imgNova.attr("src", "/images/nova-group-3.svg");
            break;
        case 4:
            $imgNova.attr("src", "/images/nova-group-4.svg");
            break;
        default:
            $imgNova.attr("src", "/images/nova-group-unknown.svg");
    }
    switch (resultat.products[0]["ecoscore_grade"]) {
        case "a":
            $imgEcoscore.attr("src", "/images/ecoscore-a.svg");
            break;
        case "b":
            $imgEcoscore.attr("src", "/images/ecoscore-b.svg");
            break;
        case "c":
            $imgEcoscore.attr("src", "/images/ecoscore-c.svg");
            break;
        case "d":
            $imgEcoscore.attr("src", "/images/ecoscore-d.svg");
            break;
        case "e":
            $imgEcoscore.attr("src", "/images/ecoscore-e.svg");
            break;
        default:
            $imgEcoscore.attr("src", "/images/ecoscore-unknown.svg");
    }
};

/**
 *afficher la liste des ingrédients si elle existe.
 * @param {*} resultat  = json du produit
 */
const afficherIngredients = function (resultat) {
    if (resultat.products[0]["ingredients_text_with_allergens_fr"]) {
        $ingredients.html(
            resultat.products[0]["ingredients_text_with_allergens_fr"]
        );
    } else if (resultat.products[0]["ingredients_text_en"]) {
        $ingredients.text(resultat.products[0]["ingredients_text_en"]);
    } else {
        $ingredients.text("Liste d'ingrédients indisponible");
    }
};

/**
 * Test pour éviter d'afficher undefind.
 * @param {*} valeur
 * @return {*}
 */
const testValeur = function (valeur) {
    if (valeur !== undefined) {
        return valeur;
    } else {
        return "?";
    }
};

/**
 * Test pour éviter d'afficher undefind.
 * @param {*} valeur
 * @return {*}
 */
const testModificateur = function (valeur) {
    if (valeur === ">") {
        return ">";
    } else if (valeur === "<") {
        return "<";
    } else {
        return "";
    }
};

/**
 *Creer le tableau nutritionnel et le remplit si les info existent.
 * @param {*} resultat = json du produit
 *
 */
const afficherTableau = function (resultat) {
    $tableNut.html("");
    const tableauNutri = $("<table></table>");
    const thead = $("<thead></thead>");
    const tbody = $("<tbody></tbody>");
    tableauNutri.addClass("table-style");
    tableauNutri.append(thead);
    tableauNutri.append(tbody);

    $tableNut.append(tableauNutri);
    const row1 = $("<tr></tr>");
    const heading1 = $("<th></th>");
    heading1.html(" ");

    const heading2 = $("<th></th>");
    heading2.html("pour " + resultat.products[0]["nutrition_data_per"]);
    row1.append(heading1);
    row1.append(heading2);
    thead.append(row1);

    if (resultat.products[0]["nutriments"]["energy-kj"]) {
        const row2 = $("<tr></tr>");
        const row2Data1 = $("<td></td>");
        row2Data1.html("Energie");
        const row2Data2 = $("<td></td>");
        row2Data2.html(
            testValeur(resultat.products[0]["nutriments"]["energy-kj"]) + " kj"
        );
        row2.append(row2Data1);
        row2.append(row2Data2);
        tbody.append(row2);
    }

    if (resultat.products[0]["nutriments"]["fat_100g"]) {
        const row3 = $("<tr></tr>");
        const row3Data1 = $("<td></td>");
        row3Data1.html("Matières grasses");
        const row3Data2 = $("<td></td>");
        row3Data2.html(
            testValeur(resultat.products[0]["nutriments"]["fat_100g"]) + " g"
        );
        row3.append(row3Data1);
        row3.append(row3Data2);
        tbody.append(row3);
    }

    if (resultat.products[0]["nutriments"]["saturated-fat_100g"]) {
        const row4 = $("<tr></tr>");
        const row4Data1 = $("<td></td>");
        row4Data1.html("Acides gras saturés");
        const row4Data2 = $("<td></td>");
        row4Data2.html(
            testValeur(
                resultat.products[0]["nutriments"]["saturated-fat_100g"]
            ) + " g"
        );
        row4.append(row4Data1);
        row4.append(row4Data2);
        tbody.append(row4);
    }

    if (resultat.products[0]["nutriments"]["carbohydrates_100g"]) {
        const row5 = $("<tr></tr>");
        const row5Data1 = $("<td></td>");
        row5Data1.html("Glucides");
        const row5Data2 = $("<td></td>");
        row5Data2.html(
            testValeur(
                resultat.products[0]["nutriments"]["carbohydrates_100g"]
            ) + " g"
        );
        row5.append(row5Data1);
        row5.append(row5Data2);
        tbody.append(row5);
    }

    if (resultat.products[0]["nutriments"]["sugars_100g"]) {
        const row6 = $("<tr></tr>");
        const row6Data1 = $("<td></td>");
        row6Data1.html("Sucres");
        const row6Data2 = $("<td></td>");
        row6Data2.html(
            testValeur(resultat.products[0]["nutriments"]["sugars_100g"]) + " g"
        );
        row6.append(row6Data1);
        row6.append(row6Data2);
        tbody.append(row6);
    }

    if (resultat.products[0]["nutriments"]["fiber_modifier"]) {
        const row7 = $("<tr></tr>");
        const row7Data1 = $("<td></td>");
        row7Data1.html("Fibres alimentaires");
        const row7Data2 = $("<td></td>");
        row7Data2.html(
            testModificateur(
                resultat.products[0]["nutriments"]["fiber_modifier"]
            ) +
                " " +
                testValeur(resultat.products[0]["nutriments"]["fiber_100g"]) +
                " g"
        );
        row7.append(row7Data1);
        row7.append(row7Data2);
        tbody.append(row7);
    }

    if (resultat.products[0]["nutriments"]["proteins_100g"]) {
        const row8 = $("<tr></tr>");
        const row8Data1 = $("<td></td>");
        row8Data1.html("Protéines");
        const row8Data2 = $("<td></td>");
        row8Data2.html(
            testValeur(resultat.products[0]["nutriments"]["proteins_100g"]) +
                " g"
        );
        row8.append(row8Data1);
        row8.append(row8Data2);
        tbody.append(row8);
    }

    if (resultat.products[0]["nutriments"]["salt_100g"]) {
        const row9 = $("<tr></tr>");
        const row9Data1 = $("<td></td>");
        row9Data1.html("Sel");
        const row9Data2 = $("<td></td>");
        row9Data2.html(
            testValeur(resultat.products[0]["nutriments"]["salt_100g"]) + " g"
        );
        row9.append(row9Data1);
        row9.append(row9Data2);
        tbody.append(row9);
    }

    if (resultat.products[0]["nutriments"]["alcohol"]) {
        const row10 = $("<tr></tr>");
        const row10Data1 = $("<td></td>");
        row10Data1.html("Alcool");
        const row10Data2 = $("<td></td>");
        row10Data2.html(
            testValeur(resultat.products[0]["nutriments"]["alcohol"]) + " g"
        );
        row10.append(row10Data1);
        row10.append(row10Data2);
        tbody.append(row10);
    }

    if (
        resultat.products[0]["nutriments"][
            "fruits-vegetables-nuts-estimate-from-ingredients_100g"
        ]
    ) {
        const row11 = $("<tr></tr>");
        const row11Data1 = $("<td></td>");
        row11Data1.html(
            "Fruits‚ légumes‚ noix et huiles de colza‚ noix et olive (estimation par analyse de la liste des ingrédients)"
        );
        const row11Data2 = $("<td></td>");
        row11Data2.html(
            testValeur(
                resultat.products[0]["nutriments"][
                    "fruits-vegetables-nuts-estimate-from-ingredients_100g"
                ]
            ) + " g"
        );
        row11.append(row11Data1);
        row11.append(row11Data2);
        tbody.append(row11);
    }
};

/**
 *Creer la fiche caractéristique et la remplit.
 * @param {*} resultat = json du produit
 *
 */
const afficherCaracteristiques = function (resultat) {
    let texte = "";
    if (resultat.products[0]["product_name_fr"]) {
        texte +=
            "<span class= 'gras' >Nom : </span>" +
            resultat.products[0]["product_name_fr"] +
            "<br/><br/>";
    } else if (resultat.products[0]["product_name_en"]) {
        texte +=
            "<span class= 'gras' >Nom Générique : </span>" +
            resultat.products[0]["product_name_en"] +
            "<br/><br/>";
    } else {
        texte += "Nom inconnu" + "<br/><br/>";
    }

    if (resultat.products[0]["brands_imported"]) {
        texte +=
            "<span class= 'gras' >Marque : </span>" +
            resultat.products[0]["brands_imported"] +
            "<br/><br/>";
    } else if (resultat.products[0]["brands"]) {
        texte += "Marque : " + resultat.products[0]["brands"] + "<br/><br/>";
    }

    if (resultat.products[0]["quantity"]) {
        texte +=
            "<span class= 'gras' >Quantité : </span>" +
            resultat.products[0]["quantity"] +
            "<br/><br/>";
    }

    if (resultat.products[0]["packaging_text_fr"]) {
        texte +=
            "<span class= 'gras' >Conditionnement : </span>" +
            resultat.products[0]["packaging_text_fr"] +
            "<br/><br/>";
    }

    if (resultat.products[0]["categories_old"]) {
        texte +=
            "<span class= 'gras' >Catégories : </span>" +
            resultat.products[0]["categories_old"] +
            "<br/><br/>";
    }

    if (resultat.products[0]["preparation_fr"]) {
        texte +=
            "<span class= 'gras' >Préparation : </span>" +
            resultat.products[0]["preparation_fr"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["traces_imported"]) {
        texte +=
            "<span class= 'gras' >Traces : </span>" +
            resultat.products[0]["traces_imported"] +
            "<br/><br/>";
    }

    if (resultat.products[0]["stores"]) {
        texte +=
            "<span class= 'gras' >Magasins : </span>" +
            resultat.products[0]["stores"] +
            "<br/><br/>";
    }

    if (resultat.products[0]["conservation_conditions_fr"]) {
        texte +=
            "<span class= 'gras' >Conservation : </span>" +
            resultat.products[0]["conservation_conditions_fr"] +
            "<br/><br/>";
    }

    $caracteristiques.html(texte);
};

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
