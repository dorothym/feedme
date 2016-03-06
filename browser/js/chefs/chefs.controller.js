app.controller('AllChefsController', function ($scope) {

	$scope.angularTest = "successful"

});

app.controller('ChefController', function ($scope, $state, ChefFactory,theChef) {
	console.log("chef controller. URL param is",$state.params.id)

	$scope.chef = theChef;
	console.log($scope.chef)

	$scope.chef = theChef;

	// $scope.chefId = $state.params.id;

	// $scope.chefName = "Allie Stackton"

	// $scope.chefBio = "Small batch disrupt farm-to-table everyday carry, kale chips quinoa thundercats tumblr photo booth cardigan typewriter direct trade craft beer literally bitters. Post-ironic 3 wolf moon chillwave celiac disrupt, green juice marfa banh mi. Chillwave cold-pressed flexitarian, mumblecore craft beer DIY church-key photo booth health goth meh brooklyn freegan."

	// $scope.mealName = "Chicken Surprise"

	// $scope.mealDescription = "Keytar actually lomo, messenger bag shabby chic mustache chartreuse fanny pack kitsch kickstarter franzen put a bird on it chicharrones retro wolf. "	


    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);

});