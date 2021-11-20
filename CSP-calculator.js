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

        key.classList.add('is-depressed')   
        // Add custom attribute
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.firstValue = displayedNum
        calculator.dataset.operator = action                   
      }
      
      if (action === 'decimal') {
        console.log('decimal key!')
        display.textContent = displayedNum + '.'
        calculator.dataset.previousKeyType = 'decimal'
      }
      
      if (action === 'clear') {
        console.log('clear key!')
        calculator.dataset.previousKeyType = 'clear'
      }
      
      if (action === 'calculate') {
        console.log('equal key!')

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        
        if (firstValue) {
          display.textContent = calculate(firstValue, operator, secondValue)
        }

        calculator.dataset.previousKeyType = 'calculate'    
      }
      
      const previousKeyType = calculator.dataset.previousKeyType

      if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
          display.textContent = keyContent
        } else {
            display.textContent = displayedNum + keyContent        
        }
      }
      if (action === 'decimal') {
        display.textContent = displayedNum + '.'
      }

      Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))      
    }
  })
});


