/*function test() {
    let i = 0;
    while (i < 3) {
        i = i + 1;
        let k = i;
    }
}

test();
*/

// question 1
/*function swap(A, i, j) {
 let temp = A[i];
 A[i] = A[j];
 A[j] = temp;
}
function reverse_array(A) {
 const len = array_length(A);
 const half_len = math_floor(len / 2);
 let i = 0;
 while (i < half_len) {
 const j = len - 1 - i;
 swap(A, i, j);
 i = i + 1;
 }
}
const arr = [1, 2, 3, 4, 5];
reverse_array(arr);
arr;*/

// question 2

/*function swap_adj(L) {
    // note on whether the return statements are necessary when assigning?
    if (is_null(tail(L))) {
        return L;
    } else if (head(L) > head(tail(L))) {
        const temp = head(tail(L));
        set_head(tail(L), head(L));
        set_head(L, temp);
    }
    swap_adj(tail(L));
    return L;
}

function check_order(L) {
    if (is_null(tail(L))) {
        return true;
    } else {
        return head(L) <= head(tail(L)) && check_order(tail(L));
    }
}

function bubblesort_list(L) {
    while (!check_order(L)) {
        swap_adj(L);
    }
}
const LL = list(3, 5, 2, 4, 1);

bubblesort_list(LL);
LL;*/

// question 3




function cc_memoized(amt) {
    const denoms = [0, 5, 10, 20, 50, 100];
    const cc_mem = [];
    // const amt_lookup = [];
    
    function cc(amt, coin) {
        if (amt === 0) {
            return 1;
        } else if (coin <= 0 || amt < 0) {
            return 0;
        } else {
            if (cc_mem[amt] !== undefined) {
                if (cc_mem[amt][coin] !== undefined) {
                    return cc_mem[amt][coin];
                }
            } else {
                cc_mem[amt] = [];
            }
            
            const changes = cc(amt, coin - 1)
                            + cc(amt - denoms[coin], coin);
            cc_mem[amt][coin] = changes;
            return changes;
        }
    }
    
    return cc(amt, array_length(denoms) - 1);
}

cc_memoized(100);
