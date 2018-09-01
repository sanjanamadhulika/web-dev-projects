var app = angular.module('myApp', ["ngRoute"]);

app.service("empService", function ($http) {
    var fullEmployeeList = [];
    var copyofSelectedEmployee = null;

    var getDataPromise = $http.get("Employee_Data.JSON").then(function (response) {
        fullEmployeeList = response.data;
    });

    return {
        promise: getDataPromise,
        deleteEmployee: function (employeeToDelete) {
            fullEmployeeList = fullEmployeeList.filter(x => x.id != employeeToDelete.id);
        },
        addEmployee: function (employeeToAdd) {
            var isSame = false;
            for (var i = 0; i < fullEmployeeList.length; i++) {
                if (employeeToAdd.id == fullEmployeeList[i].id) {
                    isSame = true;
                }
            }
            if (!isSame) {
                fullEmployeeList.push(employeeToAdd);
                return null;
            } else {
                return "SSN already exists";
            }
        },
        editEmployee: function (editedData) {
            this.deleteEmployee(editedData);
            this.addEmployee(editedData);
        },
        setEmployeeToEdit: function (employeeToEdit) {
            // making copy of the selected employee so that the main list doesn't change now we will send the variablle to addCtrl
            copyofSelectedEmployee = angular.copy(employeeToEdit);
        },
        getEmployeeToEdit: function () {
            return copyofSelectedEmployee;
        },
        getData: function () {
            return fullEmployeeList;
        },
    };
});

app.service("loginService", function () {
    var admin = 'admin';
    var pass = 'password';
    var isAuthenticated = false;

    return {
        login: function (username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    }
});

app.run(function ($rootScope, $location, loginService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!loginService.isAuthenticated()) {
            // redirect back to login
            $location.path('/');
        }
    });
});

app.controller('logInController', function ($scope, $rootScope, $location, loginService) {
    $scope.formSubmit = function () {
        if (loginService.login($scope.username, $scope.password)) {
            $rootScope.userName = $scope.username;
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $scope.auth = true;
            $location.path('/home');
        } else {
            $scope.auth = false;
            $scope.error = "Incorrect username/password !";
        }
    };
});

app.controller('listController', function ($scope, empService, $location) {
    $scope.sortType = 'firstname';
    $scope.sortReverse = false;
    $scope.searchEmployee = "";

    $scope.myEmployeeList = empService.getData();

    $scope.deleteButton = function (employeeToDelete) {
        empService.deleteEmployee(employeeToDelete);
        $scope.myEmployeeList = empService.getData();
    };

    $scope.editButton = function (employeeToEdit) {
        empService.setEmployeeToEdit(employeeToEdit);
        $location.path("/addEmp");
    };
});

app.controller('addController', function ($scope, empService, $location) {
    // reading empservice variable and assigning the values to employee.
    $scope.employee = empService.getEmployeeToEdit();

    // To Enable or disable the button
    if (!$scope.employee) {
        $scope.isEdit = false;
    } else {
        $scope.isEdit = true;
    }

    // set the value to null so that when we click add new emp from tab the form should be empty
    empService.setEmployeeToEdit(null);

    $scope.addForm = function (employeeToAdd) {
        $scope.ssnError = empService.addEmployee(employeeToAdd);
        if ($scope.ssnError != null) {

        } else {
            $location.path("/empDetails");
        }
    };

    $scope.editForm = function (editedData) {
        empService.editEmployee(editedData);
        $location.path("/empDetails");
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "login.html"
        })
        .when("/home", {
            templateUrl: "home.html"
        })
        .when("/empDetails", {
            templateUrl: "empDetails.html",
            resolve: {
                'empServiceNeeded': function (empService) {
                    return empService.promise;
                }
            }
        })
        .when("/addEmp", {
            templateUrl: "addPage.html",
            resolve: {
                'empServiceNeeded': function (empService) {
                    return empService.promise;
                }
            }
        })
});