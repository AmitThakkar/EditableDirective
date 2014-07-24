/**
 * Created by Amit Thakkar on 24/7/14.
 */
(function () {
    'use strict';

    /*
     * Dummy User list.
     * */
    var users = [
        {
            _id: 1,
            name: "Amit Thakkar",
            age: 25,
            salary: 100000
        },
        {
            _id: 2,
            name: "Shreyance Jain",
            age: 26,
            salary: 200000
        }
    ];

    /*	
     * Defining editable Module.
     * */
    var editableApp = angular.module('editableApp', []);

    /*
     * Defining the UserController.
     * */
    editableApp.controller("UserController", function () {
        this.users = angular.copy(users);
    });

    editableApp.directive("editable", function () {
        return {
            scope: {
                value: "=editable"
            },
            restrict: "A",
            templateUrl: "./editableTemplate.html",
            link: function (scope, element) {
                var oldValue = scope.value;
                var changeEditStat = function (stat) {
                    scope.$apply(function () {
                        scope.edit = stat;
                    });
                    if (!stat && scope.value !== oldValue) {
                        console.log("Send Request if you want to update on server.");
                    }
                };
                element.on("click", function () {
                    var inputElement = element[0].children[1];
                    changeEditStat(true);
                    inputElement.focus();
                });
                element.on("keydown", function (event) {
                    if (event.keyCode === 13 || event.keyCode === 9) {
                        changeEditStat(false);
                    }
                });
            }
        };
    })
})();
