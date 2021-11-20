document.addEventListener("DOMContentLoaded", function() { 
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  const calculator = document.querySelector('.calculator')
  const keys = calculator.querySelector('.calculator__keys') 

  const calculate = (n1, operator, n2) => {
    let result = ''
    
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
    
    return result
  }

  keys.addEventListener("click", e => {
    if(e.target.matches("button")) {
      const key = e.target
      const action = key.dataset.action
      const keyContent = key.textContent
      const display = document.querySelector('.calculator__display')
      const displayedNum = display.textContent

      if (!action) {
        console.log('number key!')
        calculator.dataset.previousKey = 'number'
      }
      
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        console.log('operator key!')
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        const previousKeyType = calculator.dataset.previousKeyType

        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue
          
        // Update calculated value as firstValue
          calculator.dataset.firstValue = calcValue
        } else {
          // If there are no calculations, set displayedNum as the firstValue
          calculator.dataset.firstValue = displayedNum
        }

        key.classList.add('is-depressed')   
        // Add custom attribute
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = action                   
      }
      
      if (action === 'decimal') {
        console.log('decimal key!')
        if (calculator.dataset.previousKeyType === 'operator' ||
          calculator.dataset.previousKeyType === 'calculate') {
          display.textContent = '0.'
        } else if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.'
        }
        calculator.dataset.previousKeyType = 'decimal'
      }
      
      if (action === 'clear') {
        console.log('clear key!')

        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = ''
          calculator.dataset.modValue = ''
          calculator.dataset.operator = ''
          calculator.dataset.previousKeyType = ''
        } else {
          key.textContent = 'AC'
        }

        display.textContent = 0      
        calculator.dataset.previousKeyType = 'clear'
      }
      
      if (action === 'calculate') {
        console.log('equal key!')

        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum
        
        if (firstValue) {
          if (calculator.dataset.previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }
          display.textContent = calculate(firstValue, operator, secondValue)
        }
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'    
      }
      
      const previousKeyType = calculator.dataset.previousKeyType

      if (!action) {
        if (displayedNum === '0' || 
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate') {
          display.textContent = keyContent
        } else {
            display.textContent = displayedNum + keyContent        
        }
        calculator.dataset.previousKeyType = 'number'        
      }

      if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
      }

      Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))      
    }
  })
});


