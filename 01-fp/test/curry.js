import test from 'ava';
import * as curry from '../src/curry';

test('sum', t => {
		t.is(curry.sumUp(1)(2), 3)
});

test('subtract', t => {

	t.is(curry.subtract(100)(50), 50)
});


test('multiplication', t => {

	t.is(curry.multiplication(100)(50), 5000)
});

test('division', t => {
		t.is(curry.division(100)(20), 5)
	t.is(curry.division(100)(50), 2)
});

test('biggerthan', t => {
		t.is(curry.isBiggerThan(100)(50), true)
});

test('smallerthan', t => {

	t.is(curry.isSmallerThan(100)(50), false)
});

