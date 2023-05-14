app.factory('database', function($http, $q) {
    const url = 'http://localhost:5000'
    const token = 'AJ4gtC2A'

    return {
        logincheck: function(data) {
            var deferred = $q.defer()
            $http({
                method: 'POST',
                url: `${url}/login`,
                data: data,
                headers: {
                    'Authorization': token
                }
            }).then(function(res) {
                deferred.resolve(res)
            }, function(res) {
                deferred.reject(res)
            })
            return deferred.promise
        },

        selectAll: function(table) {
            var deferred = $q.defer()
            $http({
                method: 'GET',
                url: `${url}/${table}`,
                headers: {
                    'Authorization': token
                }
            }).then(function(res) {
                deferred.resolve(res)
            }, function(res) {
                deferred.reject(res)
            })
            return deferred.promise
        },

        selectByValue: function(table, field, value) {
            var deferred = $q.defer()
            $http({
                method: 'GET',
                url: `${url}/${table}/${field}/${value}`,
                headers: {
                    'Authorization': token
                }
            }).then(function(res) {
                deferred.resolve(res)
            }, function(res) {
                deferred.reject(res)
            })
            return deferred.promise
        },

        insert: function(tablename, values) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: `${url}/${tablename}`,
                data: values,
                headers: {
                    'Authorization': token
                }
            }).then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },

        update: function(tablename, id, values) {
            var deferred = $q.defer();
            $http({
                method: 'PATCH',
                url: `${url}/${tablename}/${id}`,
                data: values,
                headers: {
                    'Authorization': token
                }
            }).then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },

        delete: function(tablename, field, value) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: `${url}/${tablename}/${field}/${value}`,
                headers: {
                    'Authorization': token
                }
            }).then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });
            return deferred.promise;
        }
    }
})