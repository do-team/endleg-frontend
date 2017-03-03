// Documentation available @ http://api.jquery.com/jquery.getjson/
$(document).ready(function () {
    // $('#show-data').click(function () {

        var showData0 = $('#show-player-0');
        var counter = 0;

        $.getJSON('example.json', function (data0) {
            console.log(data0);

            // Display card pictures
            var items0 = data0.items.map(function (item0) {
                counter += 1;
                if (counter <= 5) {
                    return item0.key + ': <img src="img/' + item0.value + '.png" height="50px" width="50px" align="center">';
                }
            });

            showData0.empty();

            if (counter <= 5) {
                console.log(counter);
                var content0 = '<li href="#" class="list-group-item">' + items0.join('</li><li href="#" class="list-group-item">') + '</li>';
                var list0 = $('<ul class="list-group">').html(content0);
                showData0.append(list0);
            }
                var content0 = '<li href="#" class="list-group-item">' + items0.join('</li><li href="#" class="list-group-item">') + '</li>';
                var list0 = $('<ul class="list-group">').html(content0);
                showData0.append(list0);
            // } else {
            //     var content0 = '';
            //     var list0 = $('</ul>').html(content0);
            // }

        });
        showData0.text('Loading the JSON file.');


        var showData1 = $('#show-player-1');

        $.getJSON('example.json', function (data1) {
        console.log(data1);

        // Display card pictures
        var items1 = data1.items.map(function (item1) {
            return item1.key + ': <img src="img/' + item1.value + '.png" height="50px" width="50px" align="center">';
        });

        counter =+ 1;
        showData1.empty();

        if ((items1.length) && (counter > 3)) {
            var content1 = '<li href="#" class="list-group-item">' + items1.join('</li><li href="#" class="list-group-item">') + '</li>';
            var list1 = $('<ul class="list-group">').html(content1);
            showData1.append(list1);
        }
    });
    showData1.text('Loading the JSON file.');
    // });
});
