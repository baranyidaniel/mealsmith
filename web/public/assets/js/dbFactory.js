app.factory('database', function($http, $q) {
    const url = 'http://localhost:5000'

    return {
        logincheck: function(data) {
            var deferred = $q.defer()
            $http({
                method: 'POST',
                url: url + '/login',
                data: data
            }).then(function(res) {
                deferred.resolve(res)
            }, function(res) {
                deferred.reject(res)
            })
            return deferred.promise
        }
    }
})