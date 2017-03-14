// Documentation available @ http://api.jquery.com/jquery.getjson/
$(document).ready(function () {
    // $('#show-data').click(function () {
        var html = '';
        var showData1 = $('#show-player-data');
        $.getJSON('example.json', function (data) {

            console.log(data.body.Item.user);
            // Might be necessary to create tables containing data, simple list is not enough
            // Display card pictures

            html += '<h5>User name:' + data.body.Item.user +' </h5>';
            html += '<div class="col col-md-6"> Wins : ' + data.body.Item.wins +' </div>';
            html += '<div class="col col-md-6"> Draw : ' + data.body.Item.draw +' </div>';
            html += '<div class="col col-md-6"> Lose : ' + data.body.Item.lose +' </div>';
            // html += '<div class="col col-md-6"> History : ' + data.body.Item.history.values +' </div>';

            // var player = data.player.map(function (record) {
            //     console.log(record);
            //
            //     return 'Player: ' + record.name + '  ' +
            //         '<img src="img/' + record.card1 + '.png" height="40px" width="40px" align="center">' +
            //         '<img src="img/' + record.card2 + '.png" height="40px" width="40px" align="center">' +
            //         '<img src="img/' + record.card3 + '.png" height="40px" width="40px" align="center">' +
            //         '<img src="img/' + record.card4 + '.png" height="40px" width="40px" align="center">' +
            //         '<img src="img/' + record.card5 + '.png" height="40px" width="40px" align="center">'
            // });

            showData1.empty();

            // var content = '<li href="#" class="list-group-item">' + player.join('</li><li href="#" class="list-group-item">') + '</li>';
            var list = $('<table class="table">').html(html);

            showData1.append(list);
        });

        showData1.text('Loading the JSON file.');

});