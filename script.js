const fs = require('fs');

//decode y-values
function decodeY(base, value) {
    return parseInt(value, base);
}

//compute Lagrange Interpolation
function lagrangeInterpolation(roots, k) {
    let constantTerm = 0;

    // Iterating over each root for interpolation
    for (let i = 0; i < k; i++) {
        const { x: xi, y: yi } = roots[i];
        let term = yi;

        // Computing Lagrange basis polynomial L_i(0)
        for (let j = 0; j < k; j++) {
            if (i === j) continue;
            const { x: xj } = roots[j];
            term *= -xj / (xi - xj);
        }

        // Adding to the constant term
        constantTerm += term;
    }

    return Math.round(constantTerm); 
}

//processing a test case
function processTestCase(filePath) {
    const testCase = JSON.parse(fs.readFileSync(filePath));
    const { n, k } = testCase.keys;
    const roots = [];

    // Parsing and decode roots
    for (let key in testCase) {
        if (key === "keys") continue;
        const x = parseInt(key, 10); 
        const { base, value } = testCase[key];
        const y = decodeY(parseInt(base, 10), value); 
        roots.push({ x, y });
    }

    roots.sort((a, b) => a.x - b.x);
    return lagrangeInterpolation(roots, k);
}

// Main Execution
try {
    const result1 = processTestCase('testcase1.json');
    const result2 = processTestCase('testcase2.json');

    console.log(`Secret for Test Case 1: ${result1}`);
    console.log(`Secret for Test Case 2: ${result2}`);
} catch (error) {
    console.error("Error processing test cases:", error.message);
}
