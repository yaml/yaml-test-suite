function toggle_framework(fw) {
    $( "." + fw ).toggleClass("hide");
}

function toggle_type(fwtype) {
    var on = $('#type-' + fwtype).prop("checked");
    $( ".selector-" + fwtype ).each(function(cb) {
        if ($(this).prop("checked") != on) {
            toggle_framework($(this).data("fw"));
            $(this).prop("checked", ! $(this).prop("checked"));
        }
    });
}
