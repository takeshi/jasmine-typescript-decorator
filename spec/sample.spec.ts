/// <reference path="../src/decrator.ts" />

module app {

	var module = angular.module('app', ['ngMock']);

	beforeEach(angular.mock.module('app'))

	@jasmine.TestSuite("SimpleTest")
	class TestClass {

		constructor(private $http: angular.IHttpService) {
		}

		@jasmine.After
		after() {
			console.log('after');
			console.log(this.$http);
		}

		@jasmine.Before
		before() {
			console.log('before');
			console.log(this.$http);
		}

		@jasmine.Test
		testCase() {
			console.log('testCase');
			console.log(this.$http);
		}

	}

	@jasmine.TestSuite("DoneTest")
	class DoneClass {

		constructor(private $http: angular.IHttpService) {
		}

		@jasmine.AfterWithDone
		afterWidhDone(done: Function) {
			setTimeout(() => {
				console.log('after with done');
				done();
			}, 100);
		}

		@jasmine.BeforeWithDone
		beforeWithDone(done: Function) {
			setTimeout(() => {
				console.log('before with done');
				done();
			}, 100);
		}

		@jasmine.TestWithDone
		testWithDone(done: Function) {
			setTimeout(() => {
				console.log('test with done');
				done();
			}, 100);
		}

	}

}