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

function make_optimized_search_v2(A) {
    // most optimized, n log n
    const array_dupl = [];
    
    for (let i = 1; i < n; i = i + 1) {
        array_dupl[i] = A[i];
    }
    
    merge_sort(array_dupl);
    
    return x => linear_search(array_dupl, x);
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
    
    for (let i = 2; i < n + 1; i = i + 1) {
        // or lte is better
        fib_res[i] = fib_res[i - 1] + fib_res[i - 2];
    }
    
    // display(fib_res);
    return fib_res[n];
}

function fib_alt(n) {
    if (n < 2) {
        return n;
    }
    
    let pp = 0;
    let p = 1;
    
    for (let i = 2; i <= n; i = i + 1) {
        const temp = pp + p;
        pp = p;
        p = temp;
        // or more big brain
        // p = p + pp;
        // pp = p - pp;
    }
    
    return p;
}

// display(fib(14));
// display(fib_alt(14));

// QUESTION 3
// lazy, so neigh