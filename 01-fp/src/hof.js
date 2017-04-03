const calculate = (func, ...numbers) => {
	return func(numbers)
}

const sumUp = (numbers) => {
	return numbers.reduce((pv, acc) => pv + acc, 0);
}

const subtract = (numbers) => {
	let minuend = numbers.shift();
	return numbers.reduce((pv, acc) => pv - acc, minuend);
}

const multiplication = (numbers) => {
	return numbers.reduce((pv, acc) => pv * acc, 1);
}

const division = (numbers) => {
	let dividend = numbers.shift();
	return numbers.reduce((pv, acc) => pv / acc, dividend);
}

const isBiggerThan = (numbers) => {
	let first = numbers.shift();
	let second = numbers.shift();
	return first > second;
}

const isSmallerThan = (numbers) => {
	let first = numbers.shift();
	let second = numbers.shift();
	return first < second;
}

export {
  calculate,
  sumUp,
  subtract,
  multiplication,
  division,
  isBiggerThan,
  isSmallerThan
};
