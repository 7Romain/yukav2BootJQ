/**
 *afficher la liste des ingrédients si elle existe.
 * @param {*} resultat  = json du produit
 */
export const afficherIngredients = function (resultat) {
    const $ingredients = $("#listeIngredients");

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
