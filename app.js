angular.module('example', ['ui.bootstrap'])
    .controller('myApp', ['$http', function($http) {
        var self = this;

        self.exampleString = 'By Viviane Alves';

        self.peopleList = [];

        function peopleListRefresh() {
            $http.get('https://apicrudruby.herokuapp.com/people').then(function(response) {
                self.peopleList = response.data;
            }, function(response) {
                alert('Erro enquanto atualiza a listagem');
                console.log(response);
            });
        }
        peopleListRefresh();

        self.personAdd = function() {
            $http.post('https://apicrudruby.herokuapp.com/people', { 'name': self.personNewName, 'age': self.personNewAge }).then(function(response) {
                peopleListRefresh();
                self.personNewName = '';
                self.personNewAge = '';
            }, function(response) {
                alert('Erro enquanto adicionava');
                console.log(response);
            });
        };

        self.personRemove = function(todoId) {
            $http.delete('https://apicrudruby.herokuapp.com/people' + todoId).then(function(response) {
                peopleListRefresh();
            }, function(response) {
                alert('Erro enquanto removia');
                console.log(response);
            });
        };

    }]);