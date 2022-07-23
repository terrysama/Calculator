let displayValue = '0';
let firstNum = null;
let secondNum = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

function displayInput(){
    const display = document.querySelector('#display');
    display.textContent = displayValue;
    if(displayValue.length > 12){
        display.textContent = displayValue.substring(0, 12);
    }
}
displayInput();

// window.addEventListener("keypress", function(event){
//     let key = event.key;
//     console.log(key);
//     if(key == clickBtn()){
//         displayInput();
//     }
// });


function inputNum(value) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            // first number input
            displayValue = value;
        } 
        else if(displayValue === firstNum) {
            // after calling inputEquals()
            displayValue = value;
        } else {
            displayValue += value;
        }
    } else {
        // second number input
        if(displayValue === firstNum) {
            displayValue = value;
        } else {
            displayValue += value;
        }
    }
}

function inputDecimal(decimal){
    if(displayValue === firstNum || displayValue === secondNum){
        displayValue = '0';
        displayValue += decimal;
    }
    else if(!displayValue.includes(decimal)){
        displayValue += decimal;
    }
}

function operate(op, a, b) {
    if(op === '+') {
        return a + b;
    } else if(op === '-') {
        return a - b;
    } else if(op === '*') {
        return a * b;
    } else if(op === '/') {
        if(b === 0) {
            // cannot divide by zero; infinity
            return 'lol Einstein';
        } else {
        return a / b;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        // inputting second operator
        secondOperator = operator;
        secondNum = displayValue;
        result = operate(firstOperator, Number(firstNum), Number(secondNum));
        displayValue = parseFloat(result.toFixed(6));
        firstNum = displayValue;
        result = null;
    } else if(secondOperator != null) {
        // a new operator called as secondOperator
        secondNum = displayValue;
        result = operate(secondOperator, Number(firstNum), Number(secondNum));
        secondOperator = operator;
        displayValue = parseFloat(result.toFixed(6));
        firstNum = displayValue;
        result = null;
    } else { 
        // first operator input
        firstOperator = operator;
        firstNum = displayValue;
    }
}

function inputEquals(){
    if(firstOperator != null && secondOperator === null){
        secondNum = displayValue;
        result = operate(firstOperator, Number(firstNum), Number(secondNum));
        if(result === 'lol Einstein') {
            displayValue = 'lol Einstein';
        } else {
            displayValue = parseFloat(result.toFixed(6));
            firstNum = displayValue;
            secondNum = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
    else if(secondOperator != null){
        secondNum = displayValue;
        result = operate(secondOperator, Number(firstNum), Number(secondNum));
        if(result === 'lol Einstein') {
            displayValue = 'lol Einstein';
        } else {
            displayValue = parseFloat(result.toFixed(6));
            firstNum = displayValue;
            secondNum = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
    else {
        displayValue = displayValue;
    }
}

function inputSign(num){
    displayValue = (num * -1);
}

function inputPercent(num){
    displayValue = (num / 100);
}

function clear(){
    displayValue = '0';
    firstNum = null;
    secondNum = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function del() {
    if(displayValue == 'lol Einstein' || displayValue == 'NaN' || displayValue == '0'){
        displayValue = '0';
    }
    else if(displayValue.length == '1'){
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
} 

function clickBtn(){
    buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
            if(this.classList.contains('num')){
                inputNum(this.value);
                displayInput();
            }
            else if(this.classList.contains('decimal')){
                inputDecimal(this.value);
                displayInput();
            }
            else if(this.classList.contains('operator')){
                inputOperator(this.value);
                displayInput();
            }
            else if(this.classList.contains('equals')){
                inputEquals();
                displayInput();
            }
            else if(this.classList.contains('sign')){
                inputSign(displayValue);
                displayInput();
            }
            else if(this.classList.contains('percent')){
                inputPercent(displayValue);
                displayInput();
            }
            else if(this.classList.contains('clear')){
                clear();
                displayInput();
            }
            else if(this.classList.contains('delete')){
                del();
                displayInput();
            }
        });
    });
}
clickBtn();



// **** CONSOLE ****
// function add(a,b){
//     return a + b;
// }

// function subtract(a , b){
//     return a - b;
// }

// function multiply(a , b){
//     return a * b;
// }

// function divide(a , b){
//     return a / b;
// }

// function inputPercent(num){
//     return (num/100).toString();
// }

// function inputSign(num){
//     return (num * -1).toString();
// }

// function operate(op, a, b){
//     if(op === divide && b === 0){
//         return 'lol Einstein';
//     }
//     return op(a,b);
// }