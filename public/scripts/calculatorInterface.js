'use strict';

const modalButtons = document.querySelectorAll('.modalOpen');
const secondPow = document.querySelector('#secondMatrixPow');
const firstPow = document.querySelector('#firstMatrixPow');
const inputMatrix = document.querySelector('.inputMatrix');
const size = document.querySelector('#matrixSize');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

class calculatorInterface {
  constructor() {
    this.firstMatrix = new Matrix(Matrix.generateSquareMatrix(size.value));
    this.secondMatrix = new Matrix(Matrix.generateSquareMatrix(size.value));
  }

  static onChange() {
    (size.value < 1 || size.value > 15) ? size.value = '' : 0;

    this.firstMatrix = Matrix.generateSquareMatrix(size.value);
    this.secondMatrix = Matrix.generateSquareMatrix(size.value);

    let firstTable = '<table id="firstTable">';
    let secondTable = '<table id="secondTable">';

    for (let i = 0; i < size.value; i++) {
      firstTable += '<tr>';
      secondTable += '<tr>';
      for (let j = 0; j < size.value; j++) {
        firstTable += `<td>
                         <input id=${i}_${j} 
                                type="number" 
                                value=${this.firstMatrix[i][j]}
                                oninput="calculatorInterface.cellOnChange()">
                       </td>`;

        secondTable += `<td>
                          <input id=${i}_${j} 
                                 type="number" 
                                 value=${this.secondMatrix[i][j]}
                                 oninput="calculatorInterface.cellOnChange()">
                        </td>`;
      }
      firstTable += '</tr>';
      secondTable += '</tr>';
    }
    firstTable += '</table>';
    secondTable += '</table>';

    inputMatrix.innerHTML = firstTable + secondTable;
  }

  static cellOnChange() {
    inputMatrix.oninput = event => {
      const cellIndex = event.target.attributes['id'].nodeValue;
      const matrixPosition = cellIndex.split('_');
      const id = `${cellIndex}`;
      const firstMatrix = document.querySelector('[id="firstTable"]');
      const secondMatrix = document.querySelector('[id="secondTable"]');

      const firstMatrixCell = firstMatrix.querySelector(`[id="${id}"]`).value;
      const secondMatrixCell = secondMatrix.querySelector(`[id="${id}"]`).value;

      const row = matrixPosition[0];
      const column = matrixPosition[1];

      this.firstMatrix[row][column] = +firstMatrixCell;
      this.secondMatrix[row][column] = +secondMatrixCell;
    };
  }

  static doOperation(operation, matrix = 'firstMatrix') {

    const operations = {
      'multiply': Matrix.multiply(this.firstMatrix, this.secondMatrix),
      'sum': Matrix.sum(this.firstMatrix, this.secondMatrix),
    };

    let computationalMatrix;
    let pow;

    if (matrix === 'firstMatrix') {
      computationalMatrix = this.firstMatrix;
      pow = firstPow.value;
    } else {
      computationalMatrix = this.secondMatrix;
      pow = secondPow.value;
    }

    switch (operation) {
    case 'det':
      operations[operation] = Matrix.determinant(computationalMatrix);
      break;
    case 'transposition':
      operations[operation] = Matrix.transposition(computationalMatrix);
      break;
    case 'power':
      operations[operation] = Matrix.power(computationalMatrix, pow);
      break;
    case 'toBoolean':
      operations[operation] = Matrix.transformToBoolean(computationalMatrix);
      break;
    case 'symmetric':
      operations[operation] = Matrix.symmetricMatrix(computationalMatrix);
      break;
    }

    if (operation === 'transposition' ||
        operation === 'toBoolean' ||
        operation === 'symmetric') {
      calculatorInterface.setNewMatrix(matrix, operations[operation]);
    } else if (operation === 'sum' ||
        operation === 'multiply' ||
        operation === 'power') {
      let tableForResults = '<table id="tableForResults" border="2">';

      for (let i = 0; i < size.value; i++) {
        tableForResults += '<tr>';
        for (let j = 0; j < size.value; j++) {
          const result = operations[operation];
          tableForResults += `<td>${result[i][j]}</td>`;
        }
        tableForResults +=  '</tr>';
      }

      tableForResults +=  '</table>';
      modal.innerHTML = tableForResults;
    } else if (operation === 'det') {
      alert(`Визначник: ${operations[operation]}`);
    }
  }

  static setNewMatrix(matrixNumber, resultMatrix) {
    let table;
    if (matrixNumber === 'firstMatrix') {
      this.firstMatrix = resultMatrix;
      table = document.querySelector('[id="firstTable"]');
    } else if (matrixNumber === 'secondMatrix') {
      this.secondMatrix = resultMatrix;
      table = document.querySelector('[id="secondTable"]');
    }

    for (let i = 0; i < size.value; i++) {
      for (let j = 0; j < size.value; j++) {
        const id = `"${i}_${j}"`;
        table.querySelector(`[id=${id}]`).value = resultMatrix[i][j];
      }
    }
  }

}

modalButtons.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.add('active');
    overlay.classList.add('active');
  });
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});
