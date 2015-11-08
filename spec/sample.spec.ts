/// <reference path="../src/decrator.ts" />

module app {

	var module = angular.module('app', ['ngMock']);

	beforeEach(angular.mock.module('app'))
	
	interface SampleCallback{
		(message:string);
	}
	
	class SampleService{
		constructor(private $timeout:angular.ITimeoutService){			
		}
		invoke(cb:SampleCallback){
			this.$timeout(()=>{
				cb('done');
			});
		}
	}
	
	module.service('sampleService',SampleService);
	

	@jasmine.TestSuite("SimpleTest")
	class SimpleTest {

		constructor(private sampleService:SampleService) {
		}

		@jasmine.After
		after() {
			console.log('after');
		}

		@jasmine.Before
		before() {
			console.log('before');
		}

		@jasmine.Test
		testCase($timeout:angular.ITimeoutService) {
			console.log('testCase');
			
			var message = 'init';
			this.sampleService.invoke((out)=>{
				message = out;
			});
			$timeout.flush();

			assert.strictEqual('done',message);
			
		}

	}

	@jasmine.TestSuite("DoneTest")
	class DoneTest {

		constructor(private sampleService:SampleService) {
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