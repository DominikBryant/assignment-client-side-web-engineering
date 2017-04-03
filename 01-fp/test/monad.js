import test from 'ava';
import monade from '../src/monad';

test('sum', t => {
	let calculator = monade(4);
	calculator.sumUp(4)
	t.is(calculator.result, 8);
	calculator.sumUp(4).sumUp(4);
	t.is(calculator.result, 16);
});

test('subtract', t => {
	let calculator = monade("(4*100)-396");
	calculator.subtract(4)
	t.is(calculator.result, 0);
	calculator.subtract(4).subtract(4);
	t.is(calculator.result, -8);
});


test('multiplication', t => {
	let calculator = monade(0);
	t.is(calculator.multiplication(10000).result, 0);
	t.is(calculator.sumUp(1).multiplication(10000).result, 10000);
});

test('division', t => {
	let calculator = monade(100);
	t.is(calculator.division(25).result, 4);
	let calculator1 = monade(0);
	t.is(calculator1.multiplication(10000).result, 0);
	t.is(calculator1.sumUp(1).multiplication(10000).result, 10000);
});

test('chaining', t => {
	let calculator = monade(0);
	calculator.sumUp(1).subtract(100).multiplication(100).division(-99)
	t.is(calculator.result, 100);
});
