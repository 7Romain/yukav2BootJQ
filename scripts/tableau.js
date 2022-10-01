/**
 *Creer le tableau nutritionnel et le remplit si les info existent.
 * @param {*} resultat = json du produit
 *
 */
export const afficherTableau = function (resultat) {
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

    const $tableNut = $("#tableNutri");

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
    heading2.html(
        "pour " + resultat.products[0]["nutrition_data_prepared_per"]
    );
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
            "Fruits, légumes, noix et huiles de colz, noix et olive (estimation par analyse de la liste des ingrédients)"
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
