// States for "All Chefs" and single chef

app.config(function ($stateProvider) {

    $stateProvider.state('allChefs', {
        url: '/chefs',
        controller: 'AllChefsController',
        templateUrl: 'js/chefs/allchefs.html', 
        resolve: {
            allChefs: function(ChefFactory) {
                return ChefFactory.getAllChefs();
            }
        }
    });

});

app.config(function ($stateProvider) {
    $stateProvider.state('chef', {
        url: '/chefs/:id',
        controller: 'ChefController',
        templateUrl: 'js/chefs/chef.html',
        resolve: {
			theChef: function(ChefFactory, $stateParams) {
          		return ChefFactory.getChef($stateParams.id)
            },
            meals: function(ChefFactory, $stateParams) {
                return ChefFactory.getMeals($stateParams.id)
            }
        }
    });

});



