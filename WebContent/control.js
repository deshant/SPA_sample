	// 
    // Defining Module
    //
    var spApp = angular.module( "ngSpApp", []);
    
//    spApp.config(function($httpProvider){
//      delete $httpProvider.defaults.headers.common['X-Requested-With'];
//  });

    //
    // Controller for Home Page
    //
    spApp.controller( "HomeCtrl", [ '$scope','$http', function($scope,$http) {
      
	$scope.look = function(){
		//$scope.text = 'Hello, this is homepage, under construction';
		$scope.output = getData($scope.symbol);
		console.info($scope.output);
		}
      
}]);
    
function getData(symbol) {
    var url = "http://query.yahooapis.com/v1/public/yql";
    
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
    
	var response = $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env");
        
	$.when(response).done(function (data) {
		
		console.info(data.query.results.quote.LastTradePriceOnly);
		$("#result").text("Bid Price: " + data.query.results.quote.LastTradePriceOnly);
        return 'Bid Price: ' + data.query.results.quote.LastTradePriceOnly;
        
    })
        .fail(function (jqxhr, textStatus, error) {
        	var err = textStatus + ", " + error;
            return 'Request failed: ' + err;
    });
}