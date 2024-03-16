function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let theStatus = "first";
const screen = document.querySelector("#screen");
const resultScreen = document.querySelector("#result");

function updateNumber(btn, number) {
    return number + btn.id;
}

function deleteDigit(number) {
    numberDigits = number.split("");
    numberDigits.pop();
    return numberDigits.join("");
}

function calculateResult() {
    let num1 = parseFloat(firstNum);
    let num2 = parseFloat(secondNum);
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function calculate() {
    result = calculateResult();
    firstNum = "";
    secondNum = "";
    operator = "";
    theStatus = "done";
}

const numberBtns = document.querySelectorAll(".number");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#back-space");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equal");

function render() {
    screen.textContent = firstNum + operator + secondNum;
    resultScreen.textContent = result;
}

deleteBtn.addEventListener("click", () => {
    if (theStatus === "first") {
        if (firstNum !== "") {
            firstNum = deleteDigit(firstNum);
            render();
        }
    }

    if (theStatus === "second") {
        if (secondNum !== "") {
            secondNum = deleteDigit(secondNum);
        } else if (secondNum === "") {
            operator = "";
            theStatus = "first";
        }
        render();
    }
})

clearBtn.addEventListener("click", () => {
    firstNum = "";
    secondNum = "";
    operator = "";
    theStatus = "first";
    result = "";
    render();
})

for (let btn of numberBtns) {
    btn.addEventListener("click", () => {
        if (theStatus === "first") {
            firstNum = updateNumber(btn, firstNum);
            render();
        } if (theStatus === "second") {
            secondNum = updateNumber(btn, secondNum);
            render();
        }
    })
}

for (let btn of operatorBtns) {
    btn.addEventListener("click", () => {
        if (theStatus === "second") {

        } else if (theStatus === "first") {
            operator = btn.id;
            theStatus = "second";
        } else if (theStatus === "done") {
            firstNum = result.toString();
            /*
            bug here:In the first version, I used firstNum = result here, which caused a tiny problem that after one calculation is done, and the result of the calculation
            is used as the firstNum of next calculation, it will be regarded as a numerical value(because the result is calculated by the calculation function which returns a 
            numerical value),but not a string as expected. This will cause the "delete" function not workingproperly for the logic of the delete operation is based on string
            type, so by simply adding a "toString()" function here, the problem got fixed.
            */
            theStatus = "second";
            operator = btn.id;
            result = "";
        }
        render();
    })
}

equalBtn.addEventListener("click", () => {
    calculate();
    render();
})