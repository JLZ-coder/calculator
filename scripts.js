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
        case "add":
            result = add(x, y);
            break;
        case "subtract":
            result = subtract(x, y);
            break;
        case "multiply":
            result = multiply(x, y);
            break;
        case "divide":
            result = divide(x, y);
            break;
        default:
    }
    return result;
}

//Document elements
function clear(element) {
    element.textContext = "";
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operator = ["+", "-", "*", "/", "="];
const misc = [""]

const buttonList = document.querySelectorAll("buttons");

