const sumUp = (number1) => {
	return (number2) => {
		return number1 + number2
	}
}

const subtract = (minuend) => {
	return (subtrahend) => {
		return minuend - subtrahend
	}
}

const multiplication = (number1) => {
	return (number2) => {
		return number1 * number2
	}
}

const division = (divident) => {
	return (divisor) => {
		return divident / divisor
	}
}

const isBiggerThan = (number1) => {
	return (number2) => {
		return number1 > number2
	}
}

const isSmallerThan = (number1) => {
	return (number2) => {
		return number1 < number2
	}
}

export {
  sumUp,
  subtract,
  multiplication,
  division,
  isBiggerThan,
  isSmallerThan
};
