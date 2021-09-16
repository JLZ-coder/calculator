//Calculator functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    let result = null;
    switch(operator) {
        case "+":
            result = add(x, y);
            break;
        case "-":
            result = subtract(x, y);
            break;
        case "*":
            result = multiply(x, y);
            break;
        case "/":
            result = divide(x, y);
            break;
        default:
    }
    return result;
}

//Document elements
let alreadyPressedDot = false;

const display = document.querySelector("#display");
const lastResultDisplay = document.querySelector("#lastResult");

const buttonList = document.querySelectorAll(".digitButton");
buttonList.forEach(button => {
    if (button.getAttribute("id") === "dotButton") {
        button.addEventListener("click", () => {
            if (!alreadyPressedDot && display.textContent != "") {
                addToElement(display, button.textContent);
                alreadyPressedDot = true;
            }
        });
    }
    else {
        button.addEventListener("click", () => {
            addToElement(display, button.textContent);
        });
    }
});

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => {
    alreadyPressedDot = false;
    clearElement(display);
});

const operatorButtonList = document.querySelectorAll(".operatorButton");
operatorButtonList.forEach(button => {
    button.addEventListener("click", () => {
        operateAndAddToElement(button.textContent);
    });
});

function addToElement(element, digit) {
    element.textContent += digit;
}

function clearElement(element, digit="") {
    element.textContent = digit;
}

function operateAndAddToElement(operator) {
    if (display.textContent != "") {
        // if (lastResultDisplay.textContent === "" || lastResultDisplay.textContent.endsWith("=")) {
        //     clearElement(lastResultDisplay);
        //     addToElement(lastResultDisplay, `${display.textContent} ${operator}`);
        //     clearElement(display);
        // }
        // else {
        //     let lastOp = lastResultDisplay.textContent.split(" ");
        //     let result = operate(lastOp[1], +lastOp[0], +display.textContent);
        //     lastResultDisplay.textContent = `${lastOp[0]} ${lastOp[1]} ${display.textContent} = ${result} ${operator}`;
        //     clearElement(display);
        //     // if (operator === "=") {
        //     //     lastResultDisplay.textContent = `${lastOp[0]} ${lastOp[1]} ${display.textContent} ${operator} ${result}`;
        //     //     clearElement(display);
        //     //     addToElement(display, result);
        //     // }
        //     // else {
        //     //     lastResultDisplay.textContent = result + " " + operator;
        //     //     clearElement(display);
        //     // }
        // }

        let lastOp = lastResultDisplay.textContent.split(" ");
        let result = operate(lastOp[1], +lastOp[0], +display.textContent);
        clearElement(lastResultDisplay);
        lastResultDisplay.textContent = `${lastOp[0]} ${lastOp[1]} ${display.textContent} = ${result} ${operator}`;
        clearElement(display);
    }
}

