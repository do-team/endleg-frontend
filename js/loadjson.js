// Documentation available @ http://api.jquery.com/jquery.getjson/
$(document).ready(function () {
    // $('#show-data').click(function () {

        var showData1 = $('#show-player-1');
        $.getJSON('example.json', function (data) {

            // Might be necessary to create tables containing data, simple list is not enough
            // Display card pictures
            var player1 = data.player1.map(function (item1) {
                console.log(item1);
                return 'Player1: ' + item1.name + '  ' +
                    '<img src="img/' + item1.card1 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item1.card2 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item1.card3 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item1.card4 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item1.card5 + '.png" height="40px" width="40px" align="center">'
            });
            showData1.empty();

            var content = '<li href="#" class="list-group-item">' + player1.join('</li><li href="#" class="list-group-item">') + '</li>';
            var list = $('<ul class="list-group">').html(content);

            showData1.append(list);
        });

        showData1.text('Loading the JSON file.');

        // -----

        var showData2 = $('#show-player-2');
        $.getJSON('example.json', function (data) {

            // Display card pictures
            var player2 = data.player2.map(function (item2) {
                console.log(item2);
                return 'Player2: ' + item2.name + '<br>' +
                    '<img src="img/' + item2.card1 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item2.card2 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item2.card3 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item2.card4 + '.png" height="40px" width="40px" align="center">' +
                    '<img src="img/' + item2.card5 + '.png" height="40px" width="40px" align="center">'
            });
            showData2.empty();

            var content = '<li href="#" class="list-group-item">' + player2.join('</li><li href="#" class="list-group-item">') + '</li>';
            var list = $('<ul class="list-group">').html(content);

            showData2.append(list);
        });

        showData2.text('Loading the JSON file.');
});