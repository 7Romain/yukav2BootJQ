export function accordeon() {
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
}
