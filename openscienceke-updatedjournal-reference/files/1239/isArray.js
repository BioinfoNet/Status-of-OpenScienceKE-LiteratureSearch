'use strict';

var AOP = AOP || {};

AOP.isArray = Array.isArray || function (arr) {
    return {}.toString.call(arr) === '[object Array]';
  };
