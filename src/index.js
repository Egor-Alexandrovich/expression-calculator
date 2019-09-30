function eval() {
    // Do not use eval!!!
    return;
}
const operators = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 0,
    ')': 0 
  }

function expressionCalculator(expr) {
    let arrayExpr = [];
    let stringExpr = expr.split(' ').join('');
    let i = 0;

    while (stringExpr) {
        if (stringExpr[0] in operators) {
            arrayExpr[i] = stringExpr[0];
            stringExpr = stringExpr.replace(arrayExpr[i], '');
        }
        else {
            arrayExpr[i] = parseFloat(stringExpr);
            stringExpr = stringExpr.replace(arrayExpr[i], '');
        }
        ++i;
    }
    if (arrayExpr.filter(price => price === '(').length != arrayExpr.filter(price => price === ')').length) {
        throw new TypeError('ExpressionError: Brackets must be paired');
    }
    let stackOperator = [];
    let stackOutput = [];
    for (i = 0; i <= arrayExpr.length - 1; i++) {
        
        if (arrayExpr[i] in operators) {
            if (stackOperator.length > 0) {
                if (arrayExpr[i] == '(' || arrayExpr[i] == ')') {
                    if (arrayExpr[i] == '(') {
                        stackOperator.push(arrayExpr[i]);
                    }
                    else {
                        let j = 0;
                        while (j !== '(') {
                            j = stackOperator.pop();
                            if (j !== '(') { stackOutput.push(j) }
                        }
                    }
                }
                else {
                    if (operators[topStack(stackOperator)] >= operators[arrayExpr[i]]) {
                        stackOutput.push(stackOperator.pop());
                        stackOperator.push(arrayExpr[i]);
                    }
                    else {
                        stackOperator.push(arrayExpr[i]);
                    }
                }
            }
            else {
                stackOperator.push(arrayExpr[i]);
            }
        }
        else {
            stackOutput.push(arrayExpr[i]);
        }
        
    }
    
    while (stackOperator.length > 0) {
        stackOutput.push(stackOperator.pop());
    }
    

    return +polak(stackOutput)[0].toFixed(4);
}
function topStack(stack) {
    return stack[stack.length - 1];
}
function polak(vxodstek) {
    let resultStack = [];
    for (let i = 0; i <= vxodstek.length - 1; i++) {
        if (vxodstek[i] in operators) {
            a = resultStack.pop();
            b = resultStack.pop();
            resultStack.push(calculate(a, b, vxodstek[i]))
        }
        else {
            resultStack.push(vxodstek[i]);
        }
    }
    return resultStack;
}
function calculate(a, b, string) {
    if ((a == 0)&&(string == '/')) {
        throw new TypeError('TypeError: Division by zero.');
    }
    if (string == '+') {
        return b + a;
    }
    if (string == '-') {
        return b - a;
    }
    if (string == '*') {
        return b * a;
    }
    if (string == '/') {
        return (b / a);
    }
}

module.exports = {
    expressionCalculator
}