app.factory('database', function($http, $q) {
    const url = 'http://localhost:5000'

    return {
        selectAll: function(table) {
            var deferred = $q.defer()
            $http({
                method: 'GET',
                url: `${url}/${table}`
            }).then(function(res) {
                deferred.resolve(res)
            }, function(res) {
                deferred.reject(res)
            })
            return deferred.promise
        },

        logincheck: function(data) {
            var deferred = $q.defer()
            $http({
                method: 'POST',
                url: `${url}/login`,
                data: data
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
                url: `${url}/${table}/${field}/${value}`
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
                data: values
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
                data: values
            }).then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },

        selectOne: function(table, id) {
            var deferred = $q.defer()
            $http({
                method: 'GET',
                url: `${url}/${table}/${id}`
            }).then(function(res) {
                deferred.resolve(res)
            }, function(res) {
                deferred.reject(res)
            })
            return deferred.promise
        },

        delete: function(tablename, field, value) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: `${url}/${tablename}/${field}/${value}`
            }).then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },
    }
})