(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// import * as hof from './hof';
// import * as curry from './curry';
// import calculator from './monad';

// console.log(hof.calculate(hof.sumUp, 1, 2, 3))
// console.log(hof.calculate(hof.subtract, 100, 50, 1))
// console.log(hof.calculate(hof.multiplication, 100, 50, 2))
// console.log(hof.calculate(hof.division, 100, 20, 2))
// console.log(hof.calculate(hof.division, 100, 50))
// console.log(hof.calculate(hof.isBiggerThan, 100, 50))
// console.log(hof.calculate(hof.isSmallerThan, 100, 50))

// console.log(curry.sumUp)
// console.log(curry.sumUp(1)(2))
// console.log(curry.subtract(100)(50))
// console.log(curry.multiplication(100)(50))
// console.log(curry.division(100)(20))
// console.log(curry.division(100)(50))
// console.log(curry.isBiggerThan(100)(50))
// console.log(curry.isSmallerThan(100)(50))

// var calculator1 = calculator("(4*100)-396");
// var calculator2 = calculator(1);

// console.log(`${calculator1.sumUp(4).result} is 8 ${calculator1.result === 8}`);
// calculator1.sumUp(4).division(3);
// console.log(`${calculator1.result} is 4 ${calculator1.result === 4}`);
// calculator1.multiplication(4).subtract(1);
// console.log(`${calculator1.result} is 15 ${calculator1.result === 15}`);
// calculator1.stepBack();
// console.log(`${calculator1.result} is 16 ${calculator1.result === 16}`);
// calculator1.stepBack();
// console.log(`${calculator1.result} is 16 ${calculator1.result === 16}`);


// console.log(calculator2.sumUp(4).subtract(8).result);
"use strict";

},{}]},{},[1]);
