// QUESTION 1
function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}

function make_optimized_search(A) {
    const mem = [];
    
    function memoized_search(x) {
        if (mem[x] === undefined) {
            mem[x] = linear_search(A, x);
        } 
        return mem[x];
    }
    
    return memoized_search;
}

// test cases
// const my_array = [1, 2, 4, 5];
// const my_arr_search = make_optimized_search(my_array);
// display(my_arr_search(1));
// display(my_arr_search(1));
// display(my_arr_search(2));

// QUESTION 2

function fib(n) {
    const fib_res = [0, 1];
    
    for (let i = 2; i <= n; i = i + 1) {
        fib_res[i] = fib_res[i - 1] + fib_res[i - 2];
    }
    
    // display(fib_res);
    return fib_res[n];
}

function fib_alt(n) {
    if (n < 2) {
        return n < 1 ? 0 : 1;
    }
    
    let pp = 0;
    let p = 1;
    
    for (let i = 2; i <= n; i = i + 1) {
        const temp = pp + p;
        pp = p;
        p = temp;
    }
    
    return p;
}

// display(fib(14));
// display(fib_alt(14));

// QUESTION 3
// lazy, so neigh