"use strict";
var Acessor = /** @class */ (function () {
    //constructor 
    function Acessor(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    Object.defineProperty(Acessor.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acessor.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Acessor;
}());
var myAccessor = new Acessor('Manoj', 'Padarthi');
console.log(myAccessor.firstName);
console.log(myAccessor.lastName);
