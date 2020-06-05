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
        if (size.value < 1 || size.value > 15) {
            size.value = '';
        }

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
                               <\/td>`;

                secondTable += `<td>
                                    <input id=${i}_${j} 
                                        type="number" 
                                        value=${this.secondMatrix[i][j]}
                                        oninput="calculatorInterface.cellOnChange()">
                                <\/td>`;
            }
            firstTable += '<\/tr>';
            secondTable += '<\/tr>';
        }
        firstTable += '<\/table>';
        secondTable += '<\/table>';

        inputMatrix.innerHTML = firstTable + secondTable;
    }

    static cellOnChange() {
        inputMatrix.oninput = event => {
            const cellIndex = event.target.attributes['id'].nodeValue;
            const matrixPosition = cellIndex.split('_');
            const correctId = `${cellIndex}`;
            const elementOfFirstMatrix = document.querySelector(`[id="firstTable"] [id=\"${correctId}\"]`).value;
            const elementOfSecondMatrix = document.querySelector(`[id="secondTable"] [id=\"${correctId}\"]`).value;

            this.firstMatrix[matrixPosition[0]][matrixPosition[1]] = +elementOfFirstMatrix;
            this.secondMatrix[matrixPosition[0]][matrixPosition[1]] = +elementOfSecondMatrix;
        };
    }

    static doOperation(operation, matrix = 'firstMatrix') {
        let matrixNum = 0;
        if (matrix === 'secondMatrix') {
            matrixNum = 1;
        }

        const operations = {
            'det': !matrixNum ? Matrix.determinant(this.firstMatrix) : Matrix.determinant(this.secondMatrix),
            'power': !matrixNum ? Matrix.power(this.firstMatrix, +firstPow.value) : Matrix.power(this.secondMatrix, +secondPow.value),
            'transposition': !matrixNum ? Matrix.transposition(this.firstMatrix) : Matrix.transposition(this.secondMatrix),
            'toBoolean': !matrixNum ? Matrix.transformToBoolean(this.firstMatrix) : Matrix.transformToBoolean(this.secondMatrix),
            'symmetric': !matrixNum ? Matrix.symmetricMatrix(this.firstMatrix) : Matrix.symmetricMatrix(this.secondMatrix),
            'multiply': Matrix.multiply(this.firstMatrix, this.secondMatrix),
            'sum': Matrix.sum(this.firstMatrix, this.secondMatrix),
        };

        if (operation === 'transposition' ||
            operation === 'toBoolean' ||
            operation === 'symmetric'
        ) {
            calculatorInterface.setNewMatrix(matrix, operations[operation]);
        } else if (operation === 'sum' || operation === 'multiply' || operation === 'power') {
            let tableForResults = '<table id="tableForResults" border="2">';

            for (let i = 0; i < size.value; i++) {
                tableForResults += '<tr>';
                for (let j = 0; j < size.value; j++) {
                    tableForResults += `<td>${operations[operation][i][j]}<\/td>`;
                }
                tableForResults +=  '<\/tr>';
            }

            tableForResults +=  '<\/table>';
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
                table.querySelector(`[id=\"${i}_${j}\"]`).value = resultMatrix[i][j];
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



