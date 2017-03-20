// Documentation available @ http://api.jquery.com/jquery.getjson/
$(document).ready(function () {



        console.log('We are going to read data from AuroraDB');

        var html = '';
        var showData1 = $('#show-player-data');

        // $.getJSON('example2.json', function (data) {
    var loadToken = localStorage.getItem('sessionToken');
        $.ajaxSetup({
            headers: {
                sectoken: loadToken
            }
        });
        $.getJSON("https://y3op33lkfd.execute-api.eu-central-1.amazonaws.com/PROD/out", function (data) {

                console.log('Now getting into JSON')
                var response = JSON.parse(data.body);
                console.log(response);
                console.log(response.Item);
                console.log(response.Item.draw);

                // console.log(response.Item.user);
                // Might be necessary to create tables containing data, simple list is not enough
                // Display card pictures

                html += '<h5>Username: ' + response.Item.user +' </h5>';

                html += '<div class="row">';
                html += '<div class="col col-md-4"> Wins : ' + response.Item.wins +' </div>';
                html += '<div class="col col-md-4"> Draw : ' + response.Item.draw +' </div>';
                html += '<div class="col col-md-4"> Lose : ' + response.Item.lose +' </div>';
                html += '</div> </br>';

                html += '<div class="row">';
                html += '<div class="col col-md-12"> <h5>Last game played with ' + response.Item.history.Player2.name + ' : </h5>';
                html += '<img src="img/' + response.Item.history.Player1.card1 + '.png" height="40px" width="40px" align="center">';
                html += '<img src="img/' + response.Item.history.Player1.card2 + '.png" height="40px" width="40px" align="center">';
                html += '<img src="img/' + response.Item.history.Player1.card3 + '.png" height="40px" width="40px" align="center">';
                html += '<img src="img/' + response.Item.history.Player1.card4 + '.png" height="40px" width="40px" align="center">';
                html += '<img src="img/' + response.Item.history.Player1.card5 + '.png" height="40px" width="40px" align="center">';

                html += '</div>';


                showData1.empty();

                // var content = '<li href="#" class="list-group-item">' + player.join('</li><li href="#" class="list-group-item">') + '</li>';
                var list = $('<table class="table">').html(html);

                showData1.append(list);
            });
        });

        // showData1.text('Loading the JSON file.')

// });