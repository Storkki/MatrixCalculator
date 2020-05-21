'use strict'
//TODO SUBTRACTION
//TODO MULTIPLY ON SIMPLE NUMBER
//TODO ADD IDENTITY MATRIX, CONNECTIVITY MATRIX etc
//TODO DETERMINANT
//TODO ZERO MATRIX
//TODO FUNC FOR FILLING MATRIX;

class Matrix{
    constructor(matrix) {
        this.matrix = matrix;
        this.length = length;
    }

    getMatrix() {
        return this.matrix;
    }

    getTranspositionMatrix() {
        return Matrix.transposition(this.matrix);
    }

    getSymmetricMatrix() {
        return Matrix.symmetricMatrix(this.matrix);
    }

    getBooleanMatrix() {
        return Matrix.transformToBoolean(this.matrix);
    }

    isSymmetric() {
        return Matrix.isSymmetric(this.matrix);
    }

    getSum(matrix) {
        return Matrix.sum(this.matrix, matrix)
    }

    getMultiply(matrix) {
        return Matrix.multiply(this.matrix, matrix);
    }

    getMatrixInPow(n) {
        return Matrix.power(this.matrix, n);
    }

    //Static methods
    static isSymmetric(matrix) {
        for (let i = 1; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] !== matrix[j][i]) return false;
            }
        }
        return true;
    }

    static symmetricMatrix(matrix) {
        const newMatrix = JSON.parse(JSON.stringify(matrix));
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (newMatrix[i][j] === 1) {
                    newMatrix[j][i] = 1;
                }
            }
        }
        return newMatrix;
    }

    static transposition(matrix) {
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === 1) {
                    newMatrix[j][i] = 1;
                }
            }
        }
        return newMatrix;
    }

    static transformToBoolean(matrix) {
        const booleanV = [];
        for (let i = 0; i < matrix.length; i++) {
            booleanV[i] = [];
            for (let j = 0; j < matrix.length; j++) {
                matrix[i][j] !== 0 ? booleanV[i][j] = 1 : booleanV[i][j] = 0;
            }
        }
        return booleanV;
    }

    static sum(matrix1, matrix2) {
        const matrixOfSum = [];
        for (let i = 0; i < matrix1.length; i++) {
            matrixOfSum[i] = [];
            for (let j = 0; j < matrix1.length; j++) {
                matrixOfSum[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        return matrixOfSum;
    }

    static multiply(matrix1, matrix2) {
        const multipliedElementOfMatrix = (row, column, matrix1, matrix2) => {
            let item = 0;
            for (let i = 0; i < matrix1.length; i++) {
                item += matrix1[row][i] * matrix2[i][column];
            }
            return item;
        };

        const newMatrix = [];
        for (let i = 0; i < matrix1.length; i++) {
            const row = [];
            for (let j = 0; j < matrix1.length; j++) {
                row.push(multipliedElementOfMatrix(i, j, matrix1, matrix2));
            }
            newMatrix.push(row);
        }
        return newMatrix;
    }

    static power(matrix, n) {
        if (n === 1) return matrix;

        let resMatrix = JSON.parse(JSON.stringify(matrix));
        let finalMatrix = [];

        for (let i = 1; i < n; i++) {
            finalMatrix = Matrix.multiply(resMatrix, matrix);
            resMatrix = finalMatrix;
        }

        return finalMatrix;
    }
}

