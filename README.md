Editable-Directive
==================

This is repository for containing the generic **directive** to make a text **inline editable**.

**A very common use case**: We want to make some text **editable**. By word **editable**, I mean, when we click on that text, an input field should appear with that text, where we can update value of that text, and after updating that text new value should also reflect into **scope** and database(by sending ajax request to server with new value). So for this, I have written a small **directive**. Lets first try to use this **editable directive**, then we will understand how this **directive** is actually working.

**editable.html**
```html
<!DOCTYPE html>
<html ng-app="editableApp">
<head>
    <title>Admin Module</title>
    <!-- Require AngularJS -->
    <script type="application/javascript" src="./js/angular.min.js"></script>
    <!-- Require editableDemo JS -->
    <script type="application/javascript" src="./js/editableDemo.js"></script>
</head>

<body>
<ul ng-controller="UserController as userCtrl">
    <li>
        <span>Id </span> |
        <span>Name</span> |
        <span>Age</span> |
        <span>Salary</span>
    </li>
    <li ng-repeat="user in userCtrl.users track by user._id">
        <span><span ng-bind="user._id"></span></span> |
        <span editable="user.name"></span> |
        <span editable="user.age"></span> |
        <span editable="user.salary"></span>
    </li>
</ul>
</body>
</html>
```

**editableDemo.js**
```javascript
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
                        console.log("Send request if you want to update on server.");
                    }
                };
                var inputElement = element.find("input")[0];
                element.on("click", function () {
                    changeEditStat(true);
                    inputElement.focus();
                });
                angular.element(inputElement).on("blur", function() {
                    changeEditStat(false);
                });
                element.on("keydown", function (event) {
                    if (event.keyCode === 13) {
                        changeEditStat(false);
                    }
                });
            }
        };
    });
})();
```

**editableTemplate.html**
```html
<span ng-hide="edit" ng-bind="value"></span>
<input ng-show="edit" ng-model="value">
```

We are using **editable directive** for making name, age and salary **editable**, for this we just have to mark that element/node with **editable directive** and provide value/text to this which should be **editable**. e.g.
```html
<span editable="user.name"></span>
```

That's it, after marking name field with **editable directive**, if we click on name, then it will hide name and will show a text field with text name where we can update name and after updating the name it will also reflect into scope, and we can also send ajax request for real time update(to update database).

Lets understand how **editable directive** is actually working?

```javascript
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
            var inputElement = element.find("input")[0];
            element.on("click", function () {
                changeEditStat(true);
                inputElement.focus();
            });
            angular.element(inputElement).on("blur", function() {
                changeEditStat(false);
            });
            element.on("keydown", function (event) {
                if (event.keyCode === 13) {
                    changeEditStat(false);
                }
            });
        }
    };
});
```

We can see **editable directive** is having **[isolated scope](http://codechutney.in/blog/angularjs/scope-in-angularjs/)** and we are assigning text into property value via **[== notation symbol](http://codechutney.in/blog/angularjs/notation-symbols-in-isolated-scope/)**. So **two-way-binding** will happen between property value of **isolated scope** and the property of parent scope which is passed with **editable directive**. We are making **directive** [restrict](http://codechutney.in/blog/angularjs/component-in-angularjs/) to 'A', so it can be used as attribute only. And we are providing html with [templateUrl](http://codechutney.in/blog/angularjs/component-in-angularjs/), which contains the html which will be inserted into marked element/node. And with the help **link** property we are attaching **editable** behavior to that node/element.

Follow Me
---
[Github](https://github.com/AmitThakkar)

[Twitter](https://twitter.com/amit_thakkar01)

[LinkedIn](https://in.linkedin.com/in/amitthakkar01)

[More Blogs By Me](https://amitthakkar.github.io/)