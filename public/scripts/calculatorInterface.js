'use strict';

const size = document.querySelector('#matrixSize');
const inputMatrix = document.querySelector('.inputMatrix');

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
                                        value="0" 
                                        oninput="calculatorInterface.cellOnChange()">
                               <\/td>`;

                secondTable += `<td>
                                    <input id=${i}_${j} 
                                        type="number" 
                                        value="0" 
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


}
