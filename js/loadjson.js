// Documentation available @ http://api.jquery.com/jquery.getjson/
$(document).ready(function () {

    function getHistoryData(obj) {
        var loadToken = localStorage.getItem('sessionToken');

        var data = null;
        var async = true;
        var url = "https://y3op33lkfd.execute-api.eu-central-1.amazonaws.com/PROD/out";
        var method = "POST";

        var request = new XMLHttpRequest();

        request.withCredentials = false;

        request.open(method, url);
        request.setRequestHeader("content-type", "application/json");
        request.setRequestHeader("sectoken", loadToken);

        request.send();
        // event.preventDefault();
    }

        var record = getHistoryData();
        console.log(record);
        var html = '';
        var showData1 = $('#show-player-data');

        // $.getJSON('example.json', function (data) {
        $.getJSON(record, function (data) {

                console.log(data.body.Item.user);
                // Might be necessary to create tables containing data, simple list is not enough
                // Display card pictures

                html += '<h5>Username: ' + data.body.Item.user +' </h5>';

                html += '<div class="row">';
                html += '<div class="col col-md-4"> Wins : ' + data.body.Item.wins +' </div>';
                html += '<div class="col col-md-4"> Draw : ' + data.body.Item.draw +' </div>';
                html += '<div class="col col-md-4"> Lose : ' + data.body.Item.lose +' </div>';
                html += '</div> </br>';

                html += '<div class="row">';
                html += '<div class="col col-md-12"> <h5>History records: </h5> <br> ' + data.body.Item.history.values +' </div>';

                html += '</div>';

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
        });

        // showData1.text('Loading the JSON file.')

// })