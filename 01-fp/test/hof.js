import test from 'ava';
import * as hof from '../src/hof';

test('sum', t => {
	t.is(hof.calculate(hof.sumUp, 1, 2, 3), 6)
});

test('subtract', t => {
	t.is(hof.calculate(hof.subtract, 100, 50, 1), 49)
});


test('multiplication', t => {
	t.is(hof.calculate(hof.multiplication, 100, 50, 2), 10000)
});

test('division', t => {
	t.is(hof.calculate(hof.division, 100, 50), 2)
	t.is(hof.calculate(hof.division, 100, 20, 2), 2.5)
});

test('biggerthan', t => {
	t.is(hof.calculate(hof.isBiggerThan, 100, 50), true)
	t.is(hof.calculate(hof.isBiggerThan, 50, 100), false)
});

test('smallerthan', t => {
	t.is(hof.calculate(hof.isSmallerThan, 50, 100), true)
	t.is(hof.calculate(hof.isSmallerThan, 100, 50), false)
});
