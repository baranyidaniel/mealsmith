app.controller('profilCtrl', function($scope, database, $rootScope, $location, $routeParams, $filter) {

  $scope.user = {}
  $scope.userRecipes = []
  $scope.userFollowed = false
  $scope.favorites = []
  $scope.likes = []
  $scope.followersNumber = 0

  $scope.editProfile = function() {
    $location.path('/editprofile/' + $routeParams.id)
  }

  $scope.getFollowersNumber = function() {
    database.selectByValue('follows', 'kovetett_user_id', $routeParams.id).then(function(res) {
      $scope.followersNumber = res.data.length
    })
  }

  $scope.getProfilePictures = function() {
    database.selectAll('users').then(function(res) {
      $scope.userRecipes.forEach(item => {
        item.profilePic = res.data.find(x => x.id == item.user_id).img
      })
    })
  }

  $scope.determineFollowed = function() {
    if ($rootScope.loggedUser != null && $routeParams.id != $rootScope.loggedUser.id) {
      database.selectByValue('follows', 'user_id', $rootScope.loggedUser.id).then(function(res) {
        if (res.data.find(x => x.kovetett_user_id == $routeParams.id)) {
          document.getElementById('kovetBtn').innerText = 'Követés leállítása'
          $scope.getFollowersNumber()
          return true;
        }
        document.getElementById('kovetBtn').innerText = 'Követés'
        $scope.getFollowersNumber()
        return false;
      })
    }
  }

  $scope.determineFavorited = function() {
    if ($rootScope.loggedUser != null) {
      $scope.favorites = []
      database.selectAll('favorites').then(function(res) {
        $scope.favorites = res.data

        $scope.userRecipes.forEach(item => {
          item.favorited = false
          if ($scope.favorites.find(x => x.post_id == item.id && x.user_id == $rootScope.loggedUser.id)) {
            item.favorited = true
            document.getElementById('star_' + item.id).classList.replace('bi-star', 'bi-star-fill')
          }
        })
      })
    }
  }

  $scope.determineLiked = function() {
    if ($rootScope.loggedUser != null) {
      $scope.likes = []
      database.selectAll('likes').then(function(res) {
        $scope.likes = res.data

        $scope.userRecipes.forEach(item => {
          item.liked = false
          if ($scope.likes.find(x => x.post_id == item.id && x.user_id == $rootScope.loggedUser.id)) {
            item.liked = true
            document.getElementById('heart_' + item.id).classList.replace('bi-heart', 'bi-heart-fill')
          }
        })
      })
    }
  }

  $scope.userRegTime = function(){
    return moment($rootScope.loggedUser.reg).format('YYYY-MM-DD')
  }

  $scope.userLastLoginTime = function(){
    return moment($rootScope.loggedUser.last).format('YYYY-MM-DD')
  }

  $scope.showRecept = function(id) {
    $location.path('/receptek/' + id)
  }

  $scope.addToFollow = function (id){
    let element = document.getElementById('kovetBtn')
    let follows = []
    database.selectByValue('follows', 'user_id', $rootScope.loggedUser.id).then(function(res) {
      follows = res.data

      if (follows.find(x => x.kovetett_user_id == id)) {
        database.delete('follows', 'id', follows.find(x => x.kovetett_user_id == id).id).then(function() {
          element.innerText = 'Követés'
          $scope.userFollowed = false
          $scope.getFollowersNumber()
        })
      }
      else 
      {
        let data = {
          user_id: $rootScope.loggedUser.id,
          kovetett_user_id: id
        }
  
        database.insert('follows', data).then(function() {
          element.innerText = 'Követés leállítása'
          $scope.userFollowed = true
          $scope.getFollowersNumber()
        })
      }
    })
  }

  $scope.like = function(id) {
    if ($rootScope.loggedUser != null) {
      let recept = $scope.userRecipes.find(x => x.id == id)
  
      if (recept.liked) {
        recept.points--
        database.delete('likes', 'id', $scope.likes.find(x => x.post_id == id && x.user_id == $rootScope.loggedUser.id).id).then(function(res) {
          database.update('posts', recept.id, {points: recept.points}).then(function(res) {
            database.update('users', recept.user_id, {points: recept.points}).then(function() {
              $scope.determineLiked()
            })
          })
        })
      } else {
        recept.points++
        let data = {
          user_id: $rootScope.loggedUser.id,
          post_id: id
        }

        database.insert('likes', data).then(function() {
          database.update('posts', id, {points: recept.points}).then(function(res) {
            database.update('users', recept.user_id, {points: recept.points}).then(function() {
              $scope.determineLiked()
            })
          })
        })
      }
    }
  }

  $scope.addToFavorites = function(id) {
    if ($rootScope.loggedUser != null) {
      let recept = $scope.userRecipes.find(x => x.id == id)
      
      if (recept.favorited) {
        database.delete('favorites', 'id', $scope.favorites.find(x => x.post_id == id).id).then(function(res) {
          $scope.determineFavorited()
        })
      } else {
        let data = {
          user_id: $rootScope.loggedUser.id,
          post_id: id
        }

        database.insert('favorites', data).then(function() {
          $scope.determineFavorited()
        })
      }
    }
  }

  $scope.elkeszites = function(id) {
    let idx = $scope.userRecipes.findIndex(item => item.id === id);

    let ora = Math.floor($scope.userRecipes[idx].elkeszitesi_ido / 60)
    let perc = $scope.userRecipes[idx].elkeszitesi_ido % 60

    return `${ora != 0 ? ora + " óra" : ""} ${perc != 0 ? perc + " perc" : ""}`
  }

  $scope.heartHover = function(id) {
    if (!$scope.userRecipes.find(x => x.id == id).liked) {
      document.getElementById('heart_' + id).classList.replace('bi-heart', 'bi-heart-fill')
    } else {
      document.getElementById('heart_' + id).classList.replace('bi-heart-fill', 'bi-heart')
    }
  }

  $scope.heartLeave = function(id) {
    if (!$scope.userRecipes.find(x => x.id == id).liked) {
      document.getElementById('heart_' + id).classList.replace('bi-heart-fill', 'bi-heart')
    } else {
      document.getElementById('heart_' + id).classList.replace('bi-heart', 'bi-heart-fill')
    }
  }

  $scope.starHover = function(id) {
    if (!$scope.userRecipes.find(x => x.id == id).favorited) {
      document.getElementById('star_' + id).classList.replace('bi-star', 'bi-star-fill')
    } else {
      document.getElementById('star_' + id).classList.replace('bi-star-fill', 'bi-star')
    }
  }

  $scope.starLeave = function(id) {
    if (!$scope.userRecipes.find(x => x.id == id).favorited) {
      document.getElementById('star_' + id).classList.replace('bi-star-fill', 'bi-star')
    } else {
      document.getElementById('star_' + id).classList.replace('bi-star', 'bi-star-fill')
    }
  }

  $scope.getFollowersNumber()
  $scope.determineFollowed()

  if ($routeParams.id != null){
    database.selectByValue('posts', 'user_id', $routeParams.id)
    .then(function(res) {
      $scope.userRecipes = res.data
      $scope.userRecipes = $filter('orderBy')($scope.userRecipes, '-points')
    })

    database.selectByValue('users', 'id', $routeParams.id)
    .then(function(res){
      $scope.user = res.data[0]
    })

    if ($routeParams.id != $rootScope.loggedUser.id) {
      $scope.userFollowed = $scope.determineFollowed()
    }

    $scope.determineFavorited()
    $scope.determineLiked()
    $scope.getProfilePictures()
  }
})