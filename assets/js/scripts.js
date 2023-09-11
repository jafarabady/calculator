const buttons = document.querySelectorAll("#calculator button.number");
const operators = document.querySelectorAll("#calculator button.operator:not(.equal):not(.minus2)");
const result = document.querySelector("#calculator .result");
const ac = document.querySelector("#calculator button.clear")
const minus2 = document.querySelector("#calculator button.minus2")
const equal = document.querySelector("#calculator button.equal")
const pageHistory = document.querySelector(".show-history")
let lastOperator = null;
let lastOperatorType = null;
let lastNumber = null;
let lastNumberType = null;
let lastInputType = null;
function handleNumbers() {
    // if (result.textContent.trim() === "0") {
        // result.textContent = this.textContent;
    // } else {
        // result.textContent = result.textContent + this.textContent;
    // }

    let currentNumber = this.textContent;
    let currentNumberType = "integer";
    if (currentNumber.includes(".")) {
        currentNumberType = "float";
    }
    if (lastInputType === "operator" && currentNumberType === "operator") {
        // alert("Cannot have two operators in a row!");
        return;
    }
    result.textContent = result.textContent + currentNumber;
    lastNumber = currentNumber;
    lastNumberType = currentNumberType;
    lastInputType = "number";
}

function handleOperators() {
    // result.textContent = result.textContent + this.textContent

    let currentOperator = this.textContent;
    if (lastInputType === "operator") {
        // alert("Cannot have two operators in a row!");
        return;
    }
    result.textContent = result.textContent + currentOperator;
    lastOperatorType = "operator";
    lastInputType = "operator";


}

function clearResult() {
    result.textContent = '';
}

// function minusResult(){
//     // let currentValue = parseFloat(result.textContent);
//     // let negativeValue = isNegative ? -currentValue : currentValue;
//     // result.textContent = negativeValue;
//
// }

equal.addEventListener("click", calculate)
operators.forEach((operator) => {
    operator.addEventListener("click", handleOperators)
})
buttons.forEach((button) => {
    button.addEventListener("click", handleNumbers);
});

ac.addEventListener("click", clearResult)

// minus2.addEventListener("click", function (){
//     isNegative = !isNegative
//     minusResult()
// })

let history = [];

function calculate() {

    let results = document.querySelector('#calculator .result')
    let expression = results.textContent;
    let rep = expression.replaceAll(`÷`, '/').replaceAll(`×`, '*')
    let resultValue = math.evaluate(rep)
    // let operands = rep.split(/[\+\-\*\/]/);
    // let operators = rep.replace(/[0-9\.]/g, '').split('');
    // let resultValue = parseInt(operands[0]);
    // for (let i = 0; i < operators.length; i++) {
    //     let operand = parseFloat(operands[i + 1]);
    //     switch (operators[i]) {
    //         case '*':
    //             resultValue *= operand;
    //             break;
    //         case '/':
    //             resultValue /= operand;
    //             break;
    //         case '+':
    //             resultValue += operand;
    //             break;
    //         case '-':
    //             resultValue -= operand;
    //             break;
    //         case '%':
    //             resultValue *= operand/100;
    //             break
    //     }
    // }
    results.textContent = resultValue;
    history.push(expression + ' = ' + resultValue);
    showHistory();


}

function showHistory() {
    let historyElement = document.querySelector('.show-history');
    historyElement.textContent = '';
    for (let i = 0; i < history.length; i++) {
        historyElement.innerHTML += history[i] + '<br>';
    }
}

// $('.result').on('input', function() {
//     let divText = this.textContent
//     if (divText.length > 4) {
//        this.textContent(divText.substring(0, 4));
//     }
// });
