// look at the lecture notes I guess? 

function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}
// linear_search([1,2,3,4,5,6,7,8,9], 5);    

// SEARCHING
// array must be sorted. 
function binary_search(A, v) {
    function search(low, high) {
        if (low > high) {
            return false;
        } else {
            const mid = math_floor((low + high) / 2);
            return (v ===  A [mid]) || 
                    (v < A[mid]
                    ? search(low, mid - 1)
                    : search(mid + 1, high));
        }
    }

    return search(0, array_length(A) - 1);
}

function binary_search_while(A, v) {
    let low = 0;
    let high = array_length(A) - 1;

    while (low <= high) {
        const mid = math_floor((low + high) / 2);

        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return (low <= high);
}

// SORTING
function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
}

function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function selection_sort(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}

function insertion_sort(A) {
    const len = array_length(A);

    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + i]) {
            swap(A, j, j + 1);
            j = j + 1;
        }
    }
}

function insertion_sort_alt(A) {
    // shifting elements right
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j]; // shift right
            j = j - 1;
        }
        A[j + 1] = x;
    }
}

function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}

function merge_sort_helper(A, low, high) {
    if (low < high) {
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}

function merge(A, low, mid, high) {
    const B = [];
    let left = low;
    let right = mid + 1;
    let Bidx = 0;

    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }

    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }

    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }

    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}





// MEMOIZATION
function mfib(n) {
    const mem = [];

    function fib(k) {
        if (mem[k] !== undefined) {
            return mem[k];
        } else {
            const result = k <= 1 ? k : fib(k - 1) + fib(k - 2);
        }
        mem[k] = result;
        return result;
    }
    return fib(n);
}

function memoize(f) {
    const mem = [];

    function mf(x) {
        if (mem[x] !== undefined) {
            return mem[x];
        } else {
            const result = f(x);
            mem[x] = result;
            return result;
        }
    }

    return mf;
}

const mtrib = memoize(n => n === 0 ? 0
                            : n === 1 ? 1
                            : n === 2 ? 1
                            : mtrib(n - 1) + 
                            mtrib(n - 2) + 
                            mtrib(n - 3));
