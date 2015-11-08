/// <reference path="../typings/tsd.d.ts" />
declare module jasmine {
    function Test(prototype: any, method: string): void;
    function TestWithDone(prototype: any, method: string): void;
    function After(prototype: any, method: string): void;
    function AfterWithDone(prototype: any, method: string): void;
    function Before(prototype: any, method: string): void;
    function BeforeWithDone(prototype: any, method: string): void;
    function TestSuite(clazz: any): void;
}
