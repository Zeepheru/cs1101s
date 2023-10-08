// Lecture 7

// variable assignments <3
let x = 3;
x = 2;
x = x -1;

// can call set_head and set_tail on the pair
// assignment is still not allowed. 
const a = pair(1, 2);
set_head(a, 2);
a;

// WHILE LOOP LFG
function factorial(n) {
    let i = 1;
    let result = 1;
    while (i <= n) {
        result = result * i;
        i = i + 1;
    }
    return result;
}