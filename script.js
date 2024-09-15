let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstNumber = null;
let secondNumber = null;
let result = '';
let isOperatorClicked = false;

function appendToDisplay(value) {
    if (isOperatorClicked) {
        currentInput = '';
        isOperatorClicked = false;
    }

    if (value === '.' && currentInput.includes('.')) return;

    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstNumber = null;
    secondNumber = null;
    result = '';
    isOperatorClicked = false;
    display.value = '0';
}

function toggleSign() {
    if (currentInput) {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        display.value = currentInput;
    }
}
function setOperation(op) {
    if (currentInput !== '') {
        if (op === '%') {
            // Directly apply percentage operation when '%' is clicked
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.value = currentInput;
            return;
        }

        if (!firstNumber) {
            firstNumber = parseFloat(currentInput);
        } else if (!isOperatorClicked) {
            calculate();
            firstNumber = result;
        }

        operator = op;
        isOperatorClicked = true;
    }
}

function calculate() {
    if (operator && currentInput !== '') {
        secondNumber = parseFloat(currentInput);

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            display.value = 'Error: Invalid input';
            return;
        }

        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                result = secondNumber !== 0 ? firstNumber / secondNumber : 'Error: Division by zero';
                break;
            default:
                result = 'Error: Invalid operation';
                break;
        }

        display.value = result;
        currentInput = result.toString();
        operator = '';
        firstNumber = result;
    }
}

document.addEventListener('keydown', function(event) {
    let keyPressed = event.key;

    if (/[0-9]/.test(keyPressed)) {
        appendToDisplay(keyPressed);
    } else if (['+', '-', '*', '/'].includes(keyPressed)) {
        setOperation(keyPressed);
    } else if (keyPressed === 'Enter') {
        calculate();
    } else if (keyPressed === 'Escape') {
        clearDisplay();
    } else if (keyPressed === '.') {
        appendToDisplay('.');
    }
});
