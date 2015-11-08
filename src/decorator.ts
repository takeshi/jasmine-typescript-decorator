/// <reference path="../typings/tsd.d.ts" />

module jasmine {
	enum TestMethodType {
		before, after, testmethod
	}

	interface TestMethod {
		method: string;
		option: TestOption;
	}
	interface TestOption {
		type: TestMethodType;
		done: boolean;
	}

	function getTestMethods(prototype: any, type: TestMethodType): TestMethod[] {
		var testMethodName = '$$' + type;
		if (!prototype[testMethodName]) {
			prototype[testMethodName] = [];
		}
		return prototype[testMethodName];
	}

	function addTestMethod(prototype: any, method: string, option: TestOption) {
		getTestMethods(prototype, option.type).push({
			method: method,
			option: option
		});
	}

	export function Test(prototype: any, method: string) {
		addTestMethod(prototype, method, {
			done: false,
			type: TestMethodType.testmethod
		})
	}

	export function TestWithDone(prototype: any, method: string) {
		addTestMethod(prototype, method, {
			done: true,
			type: TestMethodType.testmethod
		})
	}

	export function After(prototype: any, method: string) {
		addTestMethod(prototype, method, {
			done: false,
			type: TestMethodType.after
		})
	}

	export function AfterWithDone(prototype: any, method: string) {
		addTestMethod(prototype, method, {
			done: true,
			type: TestMethodType.after
		})
	}

	export function Before(prototype: any, method: string) {
		addTestMethod(prototype, method, {
			done: false,
			type: TestMethodType.before
		})
	}

	export function BeforeWithDone(prototype: any, method: string) {
		addTestMethod(prototype, method, {
			done: true,
			type: TestMethodType.before
		})
	}

	export function TestSuite(description: string) {
		return function(clazz: any) {
			describe(description, () => {

				var afterMethods = getTestMethods(clazz.prototype, TestMethodType.after);
				var beforeMethods = getTestMethods(clazz.prototype, TestMethodType.before);
				var testMethods = getTestMethods(clazz.prototype, TestMethodType.testmethod);

				var $scope: angular.IScope;
				var testSuite = new Object();
				testSuite.constructor = clazz;
				angular.extend(testSuite, clazz.prototype);

				beforeEach(() => {
					angular.mock.inject(
						($rootScope: angular.IRootScopeService,
							$injector: angular.auto.IInjectorService
						) => {
							$scope = $rootScope.$new();
							$injector.invoke(clazz, testSuite, {
								$scope: $scope
							});
						});
				});

				beforeMethods.forEach((testMethod) => {
					invoke(testMethod, beforeEach);
				});

				testMethods.forEach((testMethod) => {
					if (testMethod.option.done) {
						it(testMethod.method, (done) => {
							invokeMethod(testMethod.method, done);
						});

					} else {
						it(testMethod.method, () => {
							invokeMethod(testMethod.method, null);
						});
					}
				});

				afterMethods.forEach((testMethod) => {
					invoke(testMethod, afterEach);
				});

				afterEach(() => {
					$scope.$destroy();
				});

				function invoke(testMethod: TestMethod, fn: Function) {
					if (testMethod.option.done) {
						fn((done) => {
							invokeMethod(testMethod.method, done);
						});

					} else {
						fn(() => {
							invokeMethod(testMethod.method, null);
						});
					}
				}

				function invokeMethod(method: string, done: Function) {
					angular.mock.inject(
						($injector: angular.auto.IInjectorService) => {
							$injector.invoke(
								testSuite[method],
								testSuite, {
									$scope: $scope,
									done: done
								}
							)
						});

				}
			});
		}
	}
}