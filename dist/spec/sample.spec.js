/// <reference path="../src/decrator.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var app;
(function (app) {
    var module = angular.module('app', ['ngMock']);
    beforeEach(angular.mock.module('app'));
    var TestClass = (function () {
        function TestClass($http) {
            this.$http = $http;
        }
        TestClass.prototype.after = function () {
            console.log('after');
            console.log(this.$http);
        };
        TestClass.prototype.before = function () {
            console.log('before');
            console.log(this.$http);
        };
        TestClass.prototype.testCase = function () {
            console.log('testCase');
            console.log(this.$http);
        };
        Object.defineProperty(TestClass.prototype, "after",
            __decorate([
                jasmine.After
            ], TestClass.prototype, "after", Object.getOwnPropertyDescriptor(TestClass.prototype, "after")));
        Object.defineProperty(TestClass.prototype, "before",
            __decorate([
                jasmine.Before
            ], TestClass.prototype, "before", Object.getOwnPropertyDescriptor(TestClass.prototype, "before")));
        Object.defineProperty(TestClass.prototype, "testCase",
            __decorate([
                jasmine.Test
            ], TestClass.prototype, "testCase", Object.getOwnPropertyDescriptor(TestClass.prototype, "testCase")));
        TestClass = __decorate([
            jasmine.TestSuite("SimpleTest")
        ], TestClass);
        return TestClass;
    })();
    var DoneClass = (function () {
        function DoneClass($http) {
            this.$http = $http;
        }
        DoneClass.prototype.afterWidhDone = function (done) {
            setTimeout(function () {
                console.log('after with done');
                done();
            }, 100);
        };
        DoneClass.prototype.beforeWithDone = function (done) {
            setTimeout(function () {
                console.log('before with done');
                done();
            }, 100);
        };
        DoneClass.prototype.testWithDone = function (done) {
            setTimeout(function () {
                console.log('test with done');
                done();
            }, 100);
        };
        Object.defineProperty(DoneClass.prototype, "afterWidhDone",
            __decorate([
                jasmine.AfterWithDone
            ], DoneClass.prototype, "afterWidhDone", Object.getOwnPropertyDescriptor(DoneClass.prototype, "afterWidhDone")));
        Object.defineProperty(DoneClass.prototype, "beforeWithDone",
            __decorate([
                jasmine.BeforeWithDone
            ], DoneClass.prototype, "beforeWithDone", Object.getOwnPropertyDescriptor(DoneClass.prototype, "beforeWithDone")));
        Object.defineProperty(DoneClass.prototype, "testWithDone",
            __decorate([
                jasmine.TestWithDone
            ], DoneClass.prototype, "testWithDone", Object.getOwnPropertyDescriptor(DoneClass.prototype, "testWithDone")));
        DoneClass = __decorate([
            jasmine.TestSuite("DoneTest")
        ], DoneClass);
        return DoneClass;
    })();
})(app || (app = {}));
