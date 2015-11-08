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
    var SampleService = (function () {
        function SampleService($timeout) {
            this.$timeout = $timeout;
        }
        SampleService.prototype.invoke = function (cb) {
            this.$timeout(function () {
                cb('done');
            });
        };
        return SampleService;
    })();
    module.service('sampleService', SampleService);
    var SimpleTest = (function () {
        function SimpleTest(sampleService) {
            this.sampleService = sampleService;
        }
        SimpleTest.prototype.after = function () {
            console.log('after');
        };
        SimpleTest.prototype.before = function () {
            console.log('before');
        };
        SimpleTest.prototype.testCase = function ($timeout) {
            console.log('testCase');
            var message = 'init';
            this.sampleService.invoke(function (out) {
                message = out;
            });
            $timeout.flush();
            assert.strictEqual('done', message);
        };
        Object.defineProperty(SimpleTest.prototype, "after",
            __decorate([
                jasmine.After
            ], SimpleTest.prototype, "after", Object.getOwnPropertyDescriptor(SimpleTest.prototype, "after")));
        Object.defineProperty(SimpleTest.prototype, "before",
            __decorate([
                jasmine.Before
            ], SimpleTest.prototype, "before", Object.getOwnPropertyDescriptor(SimpleTest.prototype, "before")));
        Object.defineProperty(SimpleTest.prototype, "testCase",
            __decorate([
                jasmine.Test
            ], SimpleTest.prototype, "testCase", Object.getOwnPropertyDescriptor(SimpleTest.prototype, "testCase")));
        SimpleTest = __decorate([
            jasmine.TestSuite("SimpleTest")
        ], SimpleTest);
        return SimpleTest;
    })();
    var DoneTest = (function () {
        function DoneTest(sampleService) {
            this.sampleService = sampleService;
        }
        DoneTest.prototype.afterWidhDone = function (done) {
            setTimeout(function () {
                console.log('after with done');
                done();
            }, 100);
        };
        DoneTest.prototype.beforeWithDone = function (done) {
            setTimeout(function () {
                console.log('before with done');
                done();
            }, 100);
        };
        DoneTest.prototype.testWithDone = function (done) {
            setTimeout(function () {
                console.log('test with done');
                done();
            }, 100);
        };
        Object.defineProperty(DoneTest.prototype, "afterWidhDone",
            __decorate([
                jasmine.AfterWithDone
            ], DoneTest.prototype, "afterWidhDone", Object.getOwnPropertyDescriptor(DoneTest.prototype, "afterWidhDone")));
        Object.defineProperty(DoneTest.prototype, "beforeWithDone",
            __decorate([
                jasmine.BeforeWithDone
            ], DoneTest.prototype, "beforeWithDone", Object.getOwnPropertyDescriptor(DoneTest.prototype, "beforeWithDone")));
        Object.defineProperty(DoneTest.prototype, "testWithDone",
            __decorate([
                jasmine.TestWithDone
            ], DoneTest.prototype, "testWithDone", Object.getOwnPropertyDescriptor(DoneTest.prototype, "testWithDone")));
        DoneTest = __decorate([
            jasmine.TestSuite("DoneTest")
        ], DoneTest);
        return DoneTest;
    })();
})(app || (app = {}));
