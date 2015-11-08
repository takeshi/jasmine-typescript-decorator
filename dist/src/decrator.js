/// <reference path="../typings/tsd.d.ts" />
var jasmine;
(function (jasmine) {
    var TestMethodType;
    (function (TestMethodType) {
        TestMethodType[TestMethodType["before"] = 0] = "before";
        TestMethodType[TestMethodType["after"] = 1] = "after";
        TestMethodType[TestMethodType["testmethod"] = 2] = "testmethod";
    })(TestMethodType || (TestMethodType = {}));
    function getTestMethods(prototype, type) {
        var testMethodName = '$$' + type;
        if (!prototype[testMethodName]) {
            prototype[testMethodName] = [];
        }
        return prototype[testMethodName];
    }
    function addTestMethod(prototype, method, option) {
        getTestMethods(prototype, option.type).push({
            method: method,
            option: option
        });
    }
    function Test(prototype, method) {
        addTestMethod(prototype, method, {
            done: false,
            type: TestMethodType.testmethod
        });
    }
    jasmine.Test = Test;
    function TestWithDone(prototype, method) {
        addTestMethod(prototype, method, {
            done: true,
            type: TestMethodType.testmethod
        });
    }
    jasmine.TestWithDone = TestWithDone;
    function After(prototype, method) {
        addTestMethod(prototype, method, {
            done: false,
            type: TestMethodType.after
        });
    }
    jasmine.After = After;
    function AfterWithDone(prototype, method) {
        addTestMethod(prototype, method, {
            done: true,
            type: TestMethodType.after
        });
    }
    jasmine.AfterWithDone = AfterWithDone;
    function Before(prototype, method) {
        addTestMethod(prototype, method, {
            done: false,
            type: TestMethodType.before
        });
    }
    jasmine.Before = Before;
    function BeforeWithDone(prototype, method) {
        addTestMethod(prototype, method, {
            done: true,
            type: TestMethodType.before
        });
    }
    jasmine.BeforeWithDone = BeforeWithDone;
    function TestSuite(description) {
        return function (clazz) {
            describe(description, function () {
                var afterMethods = getTestMethods(clazz.prototype, TestMethodType.after);
                var beforeMethods = getTestMethods(clazz.prototype, TestMethodType.before);
                var testMethods = getTestMethods(clazz.prototype, TestMethodType.testmethod);
                var $scope;
                var testSuite = new Object();
                testSuite.constructor = clazz;
                angular.extend(testSuite, clazz.prototype);
                beforeEach(function () {
                    angular.mock.inject(function ($rootScope, $injector) {
                        $scope = $rootScope.$new();
                        $injector.invoke(clazz, testSuite, {
                            $scope: $scope
                        });
                    });
                });
                beforeMethods.forEach(function (testMethod) {
                    invoke(testMethod, beforeEach);
                });
                testMethods.forEach(function (testMethod) {
                    if (testMethod.option.done) {
                        it(testMethod.method, function (done) {
                            invokeMethod(testMethod.method, done);
                        });
                    }
                    else {
                        it(testMethod.method, function () {
                            invokeMethod(testMethod.method, null);
                        });
                    }
                });
                afterMethods.forEach(function (testMethod) {
                    invoke(testMethod, afterEach);
                });
                afterEach(function () {
                    $scope.$destroy();
                });
                function invoke(testMethod, fn) {
                    if (testMethod.option.done) {
                        fn(function (done) {
                            invokeMethod(testMethod.method, done);
                        });
                    }
                    else {
                        fn(function () {
                            invokeMethod(testMethod.method, null);
                        });
                    }
                }
                function invokeMethod(method, done) {
                    angular.mock.inject(function ($injector) {
                        $injector.invoke(testSuite[method], testSuite, {
                            $scope: $scope,
                            done: done
                        });
                    });
                }
            });
        };
    }
    jasmine.TestSuite = TestSuite;
})(jasmine || (jasmine = {}));
