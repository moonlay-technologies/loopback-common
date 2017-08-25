'use strict';

module.exports = function (Base) {
    Base.validate = function (context) {
        return Promise.reject("validate is not implemented");
    };
};
