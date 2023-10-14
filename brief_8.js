function factorial_while(n) {
    // factorial using while statement
    let acc = 1;
    let k = 1;
    while (k <= n) {
        acc = acc * k;
        k = k + 1;
    }
    return acc;
}

// how to use for loops. 
function how_to_use_for_loops() {
    for (let i = 0; i < 10; i = i + 1) {
        // "loop control variable: i"
        // Cannot assign to LCV in the body
        i;

        // Each "iteration"
    }

    /*
    for (statement1; expression; assignment) {
        body;
    }
    ===
    {
        statement1;
        while (expression) {
            body;
            assignment;
        }
    }
    (won't examine for loop env model)
    */
}

function factorial_for(n) {
    // same performance as the while version above
    let acc = 1;
    for (let k = 1; k <= n; k = k + 1) {
        acc = acc * k;
    }
    return acc;
}

function list_length_loop(xs) {
    let count = 0;
    for (let p = xs; !is_null(p); p = tail(p)) {
        count = count + 1;
    }
    return count;
}

// using loops on arrays
function swap(A, i, j) {
    let temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len - 1; i = i + 1) {
        swap(A, A, len - 1 - i);
    }
}

// matrices
function zero_matrix(m, n) {
    // m x n zero matrix.
    const M = [];
    for (let r = 0; r < m; r = r + 1) {
        M[r] = [];
        for (let c = 0; c < n; c = c + 1) {
            M[r][c] = 0;
        }
    }
    return M;
}