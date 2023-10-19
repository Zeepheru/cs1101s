let test_arr_1 = [2, 4, 5, 6, 12, 5, 6, 4, 5, 6, 23, 4, 3, 3];
let test_arr_2 = [2, 3, 1, 5, 1];

function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function quicksort(A) {
    return partition(A, 0, array_length(A) - 1);
}

function partition(A, lo, hi) {
    if (lo >= hi || lo < 0 || hi >= array_length(A)) {
        return A;
    }
    
    let pivot = math_floor((lo + hi) / 2);
    display("Pivot: " + stringify(pivot));
    
    let j = hi;
    let i = lo;
    
    while (i < j) {
        display(A);
        
        display("Pointers: " + stringify(i) + ", "  + stringify(j));
        display("Values: " + stringify(A[i]) + ", "  + stringify(A[j]));
        
        if (A[i] >= A[pivot] && A[j] <= A[pivot]) {
            swap(A, i, j);
            display("Swap");
            display("NOTE Pivot: " + stringify(pivot));
            
            if (i === pivot) {
                pivot = j;
            } else if (j === pivot) {
                pivot = i;
            }
            
        } else if (A[i] < A[pivot]) {
            i = i + 1;
        } else if (A[j] >= A[pivot]) {
            j = j - 1;
        }
        
    }
    
    display("NEW Pivot: " + stringify(pivot));
    
    display(">>>>__________________");
    partition(A, lo, pivot - 1);
    partition(A, pivot + 1, hi);
}

// partition(test_arr_1, 0, 13, 1);
// test_arr_1;
const test = test_arr_1;
quicksort(test);
test;