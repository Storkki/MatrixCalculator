'use strict';
//TODO SUBTRACTION
//TODO MULTIPLY ON SIMPLE NUMBER
//TODO ADD IDENTITY MATRIX, CONNECTIVITY MATRIX etc

class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
        this.length = length;
        this.isSqr = Matrix.isSquare(this.matrix);
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

    isBoolean() {
        return Matrix.isBoolean(this.matrix);
    }

    getSum(matrix) {
        return Matrix.sum(this.matrix, matrix);
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

    static isBoolean(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] !== 1 && matrix[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    static symmetricMatrix(matrix) {
        const booleanMatrix = Matrix.transformToBoolean(matrix);
        const newMatrix = JSON.parse(JSON.stringify(booleanMatrix));
        for (let i = 0; i < booleanMatrix.length; i++) {
            for (let j = 0; j < booleanMatrix.length; j++) {
                if (newMatrix[i][j]) {
                    newMatrix[j][i] = newMatrix[i][j];
                }
            }
        }
        return newMatrix;
    }

    static transposition(matrix) {
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            const row = [];
            for (let j = 0; j < matrix.length; j++) {
                row.push(matrix[j][i]);
            }
            newMatrix.push(row);
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
            let element = 0;
            for (let i = 0; i < matrix1.length; i++) {
                element += matrix1[row][i] * matrix2[i][column];
            }
            return element;
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

    static isSquare(matrix) {
        return (matrix.length === matrix[0].length);
    }

    static determinant(matrix) {
        if (Matrix.isSquare(matrix)) {
            if (matrix.length === 1) {
                return matrix[0][0];
            } else {
                let determinant = 0;
                for (let i = 0; i < matrix.length; i++) {
                    const element = matrix[0][i];
                    if (!element) continue;
                    const newMatrix = [];

                    for (let m = 1; m < matrix.length; m++) {
                        const row = [];
                        for (let n = 0; n < matrix.length; n++) {
                            if (n === i) continue;
                            row.push(matrix[m][n]);
                        }
                        newMatrix.push(row);
                    }

                    const det = Matrix.determinant(newMatrix);
                    determinant += element * Math.pow(-1, i) * det;
                }
                return determinant;
            }
        } else {
            throw Error('Matrix must be square(rows = columns)!');
        }
    }

    static generateSquareMatrix(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }

}
