function filter_tests() {
    var search_yaml = $('#search-yaml').val();
    var search_json = $('#search-json').val();
    var search_events = $('#search-events').val();
    var search_tags = $('#search-tags').val();
    /*
    console.log(search_yaml);
    console.log(search_json);
    console.log(search_events);
    console.log(search_tags);
    */
    var found = 0;
    $.each( alltests, function( id, value ) {
        var found_yaml = 1;
        var found_json = 1;
        var found_events = 1;
        var found_tags = 1;
        if (search_yaml.length) {
            found_yaml = 0;
            var index = value.in_yaml.indexOf(search_yaml);
            if (index >= 0) {
                found_yaml = 1;
            }
        }
        if (search_json.length) {
            found_json = 0;
            var in_json = (value.in_json != null) ? value.in_json : '';
            var index = in_json.indexOf(search_json);
            if (index >= 0) {
                found_json = 1;
            }
        }
        if (search_events.length) {
            found_events = 0;
            var index = value.test_event.indexOf(search_events);
            if (index >= 0) {
                found_events = 1;
            }
        }
        if (search_tags.length) {
            found_tags = 0;
            var tags = value.tags;
            $.each( tags, function( i, value ) {
                if (value == search_tags) {
                    found_tags = 1;
                }
            });
        }
        if (found_yaml && found_tags && found_json && found_events) {
            found++;
            $('#tr-title-' + id).show();
            $('#tr-content-' + id).show();
        }
        else {
            $('#tr-title-' + id).hide();
            $('#tr-content-' + id).hide();
        }
    });
    $('#td-info').html('Showing ' + found + '/' + testcount + ' tests');
}

