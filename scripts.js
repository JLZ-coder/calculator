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
const display = document.querySelector("#display");
const lastResultDisplay = document.querySelector("#lastResult");

let operands = [];
let lastOperator = null;
let operatorButtonActive = false;

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", function() {
    if (this.textContent === "C") {
        clearElement(display, "0");
        this.textContent = "AC";
    }
    else {
        clearElement(display, "0");
        operands = [];
        lastOperator = null;
        deactivateAllOperatorButtons();
        operatorButtonActive = false;
    }
});

const buttonList = document.querySelectorAll(".digitButton");
buttonList.forEach(button => {
    if (button.getAttribute("id") === "dotButton") {
        button.addEventListener("click", () => {
            if (!display.textContent.includes(".")) {
                display.textContent += button.textContent;
            }
            
            clearButton.textContent = "C";
        });
    }
    else {
        button.addEventListener("click", () => {
            if (operatorButtonActive || display.textContent === "0") {
                display.textContent = "";
                operatorButtonActive = false;
            }
            display.textContent += button.textContent;
            //lastOperator = getActiveOperator();
            deactivateAllOperatorButtons();
            if (display.textContent != "0") {
                clearButton.textContent = "C";
            }
        });
    }
});

const operatorButtonList = document.querySelectorAll(".operatorButton");
operatorButtonList.forEach(button => {
    if (button.textContent === "=") {
        button.addEventListener("click", () => {
            if (lastOperator != null) {
                operatorButtonActive = true;
                operands.push(+display.textContent);
                deactivateAllOperatorButtons();
                if (operands.length == 2) {
                    const result = operate(lastOperator, operands[0], operands[1]);
                    if (result == Infinity || result == isNaN) {
                        operands = [];
                        display.textContent = "Error";
                    }
                    else {
                        operands = [result];
                        display.textContent = result;
                    }
                }
            }
        });
    }
    else {
        button.addEventListener("click", () => {
            deactivateAllOperatorButtons();
            button.classList.add("active");
            if (!operatorButtonActive) {
                operatorButtonActive = true;
                operands.push(+display.textContent);
                if (operands.length === 2) {
                    const result = operate(lastOperator, operands[0], operands[1]);
                    if (result == Infinity || result == isNaN) {
                        operands = [];
                        display.textContent = "Error";
                    }
                    else {
                        operands = [result];
                        display.textContent = result;
                    }
                }
            }
            lastOperator = button.textContent;
        });
    }
});

function deactivateAllOperatorButtons() {
    operatorButtonList.forEach(button => {
        button.classList.remove("active");
    });
}

function getActiveOperator() {
    let operator = null;
    operatorButtonList.forEach(button => {
        if (button.classList.contains("active")) {
            operator = button.textContent;
        }
    });
    return operator;
}

function addToElement(element, digit) {
    element.textContent += digit;
}

function clearElement(element, digit="") {
    element.textContent = digit;
}

function operateAndAddToElement(operator) {
    if (display.textContent != "") {
        if (lastResultDisplay.textContent === "") {
            addToElement(lastResultDisplay, `${display.textContent} ${operator}`);
            clearElement(display);
        }
        else {
            let lastOp = lastResultDisplay.textContent.split(" ");
            let lastOpLastIndex = lastOp.length - 1;

            if (lastResultDisplay.textContent.endsWith("= ")) {
                clearElement(lastResultDisplay);
                addToElement(lastResultDisplay, `${display.textContent} ${operator}`);
                clearElement(display);
            }
            else {
                let result = operate(lastOp[lastOpLastIndex], +lastOp[lastOpLastIndex - 1], +display.textContent);
                
                clearElement(lastResultDisplay);

                lastResultDisplay.textContent = `${lastOp[lastOpLastIndex - 1]} ${lastOp[lastOpLastIndex]} ${display.textContent} = `;

                clearElement(display);

                if (operator === "=") {
                    addToElement(display, result);
                }
                else {
                    addToElement(lastResultDisplay, ` ${result} ${operator}`);
                }
            }
        }
    }
}

