app.controller('receptLeirasCtrl', function($scope, database, $routeParams) {
    $scope.recept = {}
    $scope.hozzavalok = []
    $scope.bekezdesek = []

    if ($routeParams.id != null){
        $scope.recept = {}

        database.selectByValue('posts', 'id', $routeParams.id).then(function(res) {
            $scope.recept = res.data[0]
            $scope.recept.ingredients.split('|').forEach(item => {
                let hv = {
                    "hozzavalo": item.split(';')[0],
                    "mennyiseg": item.split(';')[1]
                }
                $scope.hozzavalok.push(hv)
            })

            $scope.recept.description.split('\n').forEach(item => {
                $scope.bekezdesek.push({
                    item: item
                })
            });
        })
    }

    $scope.elkeszites = function() {
        let ora = Math.floor($scope.recept.elkeszitesi_ido / 60)
        let perc = $scope.recept.elkeszitesi_ido % 60
        return `${ora != 0 ? ora + " óra" : ""} ${perc != 0 ? perc + " perc" : ""}`
    }
});