$(document).ready(function () {
    // $('#show-data').click(function () {
        var showData = $('#show-data');

        $.getJSON('example.json', function (data) {
            console.log(data);

            var items = data.items.map(function (item) {
                return item.key + ': ' + item.value;
            });

            showData.empty();

            if (items.length) {
                var content = '<a href="#" class="list-group-item">' + items.join('</a><a href="#" class="list-group-item">') + '</a>';
                var list = $('<div class="list-group">').html(content);
                showData.append(list);
            }
        });

        showData.text('Loading the JSON file.');
    // });
});
