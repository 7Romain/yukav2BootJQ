/**
 *
 *Affiche l'image du produit.
 * @param {*} resultat = json du produit
 */
export const afficherImageProduit = function (resultat) {
    const $imgProduct = $("#imgProduct");
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
export const afficherScores = function (resultat) {
    const $imgNutri = $("#imgNutri");
    const $imgNova = $("#imgNova");
    const $imgEcoscore = $("#imgEcoscore");
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
