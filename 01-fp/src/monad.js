const calculator = function (input) {

  let result;

  if(typeof input === 'number'){
    input = input;
  }

  if(typeof input === 'string'){
    input = eval(input)
  }

  const sumUp = function (summanden) {
    this.old_result = this.result;
    input += summanden;
    this.result = input;
    return this;
  };

  const subtract = function (subtrahend) {
    this.old_result = this.result;
    input -= subtrahend;
    this.result = input;
    return this;
  };

  const multiplication = function (multiplicator) {
    this.old_result = this.result;
    input *= multiplicator;
    this.result = input;
    return this;
  }

  const division = function (divisor) {
    this.old_result = this.result;
    input /= divisor;
    this.result = input;
    return this;
  }

  const stepBack = function () {
    if(this.old_result != undefined){
      this.result = this.old_result;
      this.old_resul = undefined;

    }
    return this;
  }

  return {
    sumUp,
    subtract,
    multiplication,
    division,
    result,
    stepBack
  };
};

export default calculator;
