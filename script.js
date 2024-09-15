let display = document.getElementById('display');
let currentInput = ''; // Stores current number input
let operator = '';     // Stores current operator
let firstNumber = null;
let secondNumber = null;
let result = '';
let isOperatorClicked = false; // Tracks if an operator was clicked

// Function to append numbers and decimal points to the display
function appendToDisplay(value) {
    if (isOperatorClicked) {
        currentInput = '';  // Clear display after operator is clicked for new number
        isOperatorClicked = false;
    }

    if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals

    currentInput += value;
    display.value = currentInput;
}

// Function to clear the display and reset variables
function clearDisplay() {
    currentInput = '';
    operator = '';
    firstNumber = null;
    secondNumber = null;
    result = '';
    isOperatorClicked = false;
    display.value = '0'; // Show 0 when cleared
}

// Function to toggle positive/negative sign of the current number
function toggleSign() {
    if (currentInput) {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        display.value = currentInput;
    }
}

// Function to set the operation and store the first number
function setOperation(op) {
    if (currentInput !== '') {
        if (!firstNumber) {
            firstNumber = parseFloat(currentInput);
        } else if (!isOperatorClicked) {
            calculate();  // If an operation is clicked after inputting numbers, calculate the result
            firstNumber = result;  // The result becomes the first number for the next calculation
        }

        operator = op;
        isOperatorClicked = true;  // Indicates that the operator was clicked
    }
}

// Function to perform the calculation based on the operator
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
            case '%':
                result = firstNumber / 100;
                break;
            default:
                result = 'Error: Invalid operation';
                break;
        }

        display.value = result;
        currentInput = result.toString();
        operator = '';
        firstNumber = result;  // Store result as firstNumber for chained calculations
    }
}

// Function to handle keyboard input
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
