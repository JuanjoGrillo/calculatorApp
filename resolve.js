function compressExpression (expression) {
    let compressedExpression = expression.split('').filter(x=>x!==' ')
    let sectionOfNumbers = ''
    let newExpression = []
    let num = 0
    compressedExpression.forEach(element => {
        num++
        if(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].some(num => num === element)) {
            sectionOfNumbers += element    
            if (num === compressedExpression.length) {
                newExpression.push(sectionOfNumbers)
            }
        } else {
            if(sectionOfNumbers !== '') {
                newExpression.push(sectionOfNumbers)
                newExpression.push(element)
                sectionOfNumbers = ''
            } else {
                newExpression.push(element)
            }
        }
    })
    return newExpression
}
function resolveExpression (expression) {
    return resolveOperations(separateInTerms(checkForRoots(checkForParenthesis(compressExpression(expression)))))
}
function checkForParenthesis (expression) {
    let numberOfParenthesis = expression.filter(chart => chart === '(').length
    for (let i = 0; i < numberOfParenthesis; i++) {
        let firstParenthesis = expression.slice(expression.lastIndexOf('('))
        expression.splice(expression.lastIndexOf('('), firstParenthesis.indexOf(')') + 1, resolveParenthesis(expression.slice(expression.lastIndexOf('('), expression.lastIndexOf('(') + firstParenthesis.indexOf(')')+1)))
    }
    return expression
}
function resolveParenthesis (parenthesis) {
    parenthesis.splice(0, 1)
    parenthesis.splice(-1, 1)
    return resolveOperations(separateInTerms((checkForRoots(parenthesis))))
}
function checkForRoots (expression) {
    const numberOfRoots = expression.filter(chart => chart === '√').length
    for (let i = 0; i < numberOfRoots; i++) {
        let lastRoot = expression.slice(expression.lastIndexOf('√'))
        let root = []
        lastRoot.forEach(chart => {
            root.push(chart)
        })
        expression.splice(expression.lastIndexOf('√'), root.length + 1, resolveRoot(resolveOperations(separateInTerms((root.slice(1))))))
    }
    return expression
}
function resolveRoot (expression) {
    return Math.sqrt(expression).toString()
}
function separateInTerms (expression) {
    let terms = []
    let numberOfTerms = expression.filter(chart=>chart === '+' || chart === '-').length + 1
    for (let i = 0; i < numberOfTerms; i++) {
        let indexOperation = []
        if (expression.indexOf('+') !== -1) {
            if (expression.indexOf('-') !== -1) {
                if (expression.indexOf('+') < expression.indexOf('-')) {
                    indexOperation = [expression.indexOf('+'), '+']
                } else {
                    indexOperation = [expression.indexOf('-'), '-']
                }
            } else {
                indexOperation = [expression.indexOf('+'), '+']
            }
        } else {
            if (expression.indexOf('-') !== -1) {
                indexOperation = [expression.indexOf('-'), '-']
            }
        }
        if ( indexOperation.length !== 0) {
            let term = expression.splice(0, indexOperation[0] + 1)
            term.splice(term.length - 1, 1)
            terms.push(resolveOperations(term))
            terms.push(indexOperation[1])
        } else {
            terms.push(resolveOperations(expression.splice(0, expression.length)))
        }
    }
    return terms
}
function resolveOperations (basicExpression) {
    let num = 0
    basicExpression.push(' ')
    let termTwo = ''
    let operation = ''
    let result = ''
    basicExpression.forEach(chart => {
        num++
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].some(num => chart.includes(num))) {
            if(operation === '') {
                result = parseInt(chart)
            } else {
                termTwo += chart
            }            
        } else if (chart === '²') {
            result **= 2
        } else {
            if(termTwo !== '') {
                if (operation === '+') {
                    result += parseInt(termTwo)
                } else if (operation === '-') {
                    result -= parseInt(termTwo)
                } else if (operation === '*') {
                    result *= parseInt(termTwo)
                } else if (operation === '/') {
                    result /= parseInt(termTwo)
                }
            }
            operation = chart
            termTwo = ''
        }
    })
    return result.toString()
}












