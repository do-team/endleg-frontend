var app = angular.module('myApp', []);

app.controller('ctrl', function($scope) {

    $scope.user = null;
    $scope.loggedIn = false;
    $scope.loggingIn = false;

    $scope.errorMessage = "";
    $scope.tokenMessage = "";

    $scope.todoItems = []
    $scope.loadingItems = false;


    /**
     * Logs the user in
     */
    $scope.login = function(username, password) {
        if(!username || !password)
            return; // do nothing

        if($scope.loggingIn || $scope.loggedIn)
            return; // do nothing

        $scope.user = null;
        $scope.loggingIn = true;
        $scope.errorMessage = "";


        var payload = {username:username, password:password};
        callLambdaWithoutAuth('loginUser_JS', payload,  function(err, data) {
            console.log(data.Payload);
            var tmp = JSON.parse(data.Payload)

            if(err || tmp.errorMessage) {
                if(tmp.errorMessage) {
                    $scope.errorMessage = tmp.errorMessage;
                } else {
                    $scope.errorMessage = "Could not register";
                }
                $scope.loggingIn = false;
                $scope.loggedIn = false;
                $scope.$apply();

            } else {
                $scope.user = JSON.parse(data.Payload);
                $scope.loggingIn = false;
                $scope.loggedIn = true;
                $scope.$apply();

                $scope.getTodoItems();
            }
        });
    }


    /**
     * Register the user and log them in
     */
    $scope.register = function(username, password) {
        if(!username || !password)
            return; // do nothing

        if($scope.loggingIn || $scope.loggedIn)
            return; // do nothing

        $scope.user = null;
        $scope.loggingIn = true;
        $scope.errorMessage = "";


        var payload = {username:username, password:password};
        callLambdaWithoutAuth('registerUser_JS', payload,  function(err, data) {
            console.log(data.Payload);
            var tmp = JSON.parse(data.Payload)

            if(err || !tmp.username) {
                if(tmp.errorMessage) {
                    $scope.errorMessage = tmp.errorMessage;
                } else {
                    $scope.errorMessage = "Could not register";
                }

                $scope.loggingIn = false;
                $scope.loggedIn = false;
                $scope.$apply();

            } else {
                $scope.user = JSON.parse(data.Payload);
                $scope.loggingIn = false;
                $scope.loggedIn = true;
                $scope.$apply();

                $scope.getTodoItems();
            }
        });
    }

    /**
     * Displays token if user is logged in
     */

    $scope.getToken = function() {

        if ($scope.tokenMessage.length > 0)
            return $scope.tokenMessage.length;
        else
            return false;
    };


    /**
     * Gets the TODO items of the current user
     */
    $scope.getTodoItems = function() {
        $scope.loadingItems = true;
        $scope.errorMessage = "";

        callLambdaWithAuth('getTodoItems_JS', "", function(err, data) {
            if(err) {
                $scope.loadingItems = false;
                $scope.errorMessage = "Failed to get TODO items";
                $scope.$apply(); // refresh all bindings
            } else {
                var items = JSON.parse(data.Payload);
                angular.forEach(items, function(item){
                    item.created = new Date(item.created);
                    item.createdStr = $scope.formatDate(item.created);
                });
                items.sort(function(a,b){ return b.created-a.created; });

                $scope.todoItems = items;
                $scope.loadingItems = false;
                $scope.$apply(); // refresh all bindings
            }
        });
    }

    $scope.hasItems = function() {
        return $scope.todoItems.length > 0;
    }

    $scope.hasError = function() {
        return $scope.errorMessage.length > 0;
    }

    $scope.hasToken = function(token) {
        $scope.tokenMessage = "We got a token!";
        return $scope.tokenMessage.length > 0;
    }


    /**
     * Creates a TODO item for the current user
     */
    $scope.createTodoItem = function(message) {
        console.log('Creating item '+message);
        $scope.errorMessage = "";

        var todoItem = {message: message};
        $('#todo-input').val('');

        callLambdaWithAuth('createTodoItem_JS', todoItem, function(err, data) {
            if(err) {
                $scope.loadingItems = false;
                $scope.errorMessage = "Failed to create TODO item";
                $scope.$apply(); // refresh all bindings
            } else {
                var item = JSON.parse(data.Payload);
                item.created = new Date(item.created);
                item.createdStr = $scope.formatDate(item.created);
                $scope.todoItems.unshift(item);
                $scope.loadingItems = false;
                $scope.$apply(); // refresh all bindings
            }
        });
    }

    $scope.formatDate = function(input) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var month = monthNames[input.getMonth()];

        var day = input.getDate();
        if(day == 1 || day == 21 || day == 31)
            day = day + 'st';
        else if(day == 2 || day == 22)
            day = day + 'nd';
        else if(day == 3 || day == 23)
            day = day + 'rd';
        else
            day = day + 'th';

        var hour = input.getHours();
        if(hour < 10) hour = '0'+hour;
        var min = input.getMinutes();
        if(min < 10) min = '0'+min;

        return month+" "+day+" - "+hour+":"+min;
    }


    $scope.toggleItemDone = function(index) {
        var targetItem = $scope.todoItems[index];
        targetItem.done = !targetItem.done;
    }


    $scope.hasDoneItems = function() {
        for(var i=0; i<$scope.todoItems.length; i++){
            if($scope.todoItems[i].done)
                return true;
        }
        return false;
    }


    $scope.deleteTodoItem = function(index) {
        $scope.errorMessage = "";

        var targetItem = $scope.todoItems[index];
        $scope.todoItems.splice(index, 1);

        callLambdaWithAuth('deleteTodoItem_JS', targetItem, function(err, data) {
            if(err) {
                $scope.errorMessage = "Failed to delete TODO item";
                $scope.todoItems.splice(index, 0, targetItem);
                $scope.$apply(); // refresh all bindings
            } else {
                // do nothing
            }
        });
    }


    $scope.deleteDoneItems = function() {
        var oldItems = $scope.todoItems;
        $scope.todoItems = [];
        var toDelete = [];

        angular.forEach(oldItems, function(item){
            if(item.done) {
                toDelete.push(item.todoId);
            } else {
                $scope.todoItems.push(item);
            }
        });

        if(toDelete.length > 0) {
            callLambdaWithAuth('deleteTodoItems_JS', toDelete, function(err, data) {
                if(err) {
                    $scope.errorMessage = "Failed to delete TODO items";
                    $scope.todoItems = oldItems;
                    $scope.$apply(); // refresh all bindings
                } else {
                    // do nothing
                }
            });
        }
    }




    function callLambdaWithoutAuth(funcName, payload, callback) {

        // Credentials for anonymous requests
        AWS.config.update({
            accessKeyId: '<<< ACC_ID >>>',
            secretAccessKey: '<<< SEC_ACC_KEY >>>',
            region: "<<< REGION >>>"
        });

        var params = {
            FunctionName: funcName,
            LogType: 'Tail',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(payload)
        };

        var lambda = new AWS.Lambda();
        lambda.invoke(params, callback);
    }


    function callLambdaWithAuth(funcName, payload, callback) {

        // Credentials for current user
        var creds = $scope.user.credentials;
        AWS.config.update({
            accessKeyId: creds.accessKeyId,
            secretAccessKey: creds.secretAccessKey,
            sessionToken: creds.sessionToken,
            region: "<<< REGION >>>"
        });

        var params = {
            FunctionName: funcName,
            LogType: 'Tail',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(payload)
        };

        var lambda = new AWS.Lambda();
        lambda.invoke(params, callback);
    }

});