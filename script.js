let display = document.getElementById('display');
let graphDisplay = document.getElementById('graph');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput !== '' && previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
    clearGraph();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput || '0';
}

function plotFunction() {
    const functionInput = document.getElementById('functionInput').value;
    if (!functionInput) {
        alert('Please enter a function.');
        return;
    }

    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        const y = evaluateFunction(functionInput, x);
        yValues.push(y);
    }

    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter'
    };

    const data = [trace];
    const layout = {
        title: `Graph of ${functionInput}`,
        xaxis: { title: 'x' },
        yaxis: { title: 'f(x)' }
    };

    Plotly.newPlot('graph', data, layout);
}

function clearGraph() {
    Plotly.purge(graphDisplay);
}

function evaluateFunction(func, x) {
    try {
        return math.evaluate(func.replace(/x/g, `(${x})`));
    } catch (error) {
        console.error('Error evaluating function:', error);                                 
        return NaN;
    }
}
