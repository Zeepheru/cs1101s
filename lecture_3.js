/*
  _      ______ _____ _______ _    _ _____  ______     ____  
 | |    |  ____/ ____|__   __| |  | |  __ \|  ____|   |___ \ 
 | |    | |__ | |       | |  | |  | | |__) | |__        __) |
 | |    |  __|| |       | |  | |  | |  _  /|  __|      |__ < 
 | |____| |___| |____   | |  | |__| | | \ \| |____     ___) |
 |______|______\_____|  |_|   \____/|_|  \_\______|   |____/ 
                                                             
*/
// Function Funsies

// nested constant declaration
function foo(x) {
    const a = x + 1;
    return x * a + a;
}

// even works (with if...else) to replace tree recursion to linear recursion
function f_tree(x, n) {
    return n === 0
            ? x
            : f_tree(x, n - 1) + f_tree(x, n - 1);
}

function f_linear(x, n) {
    // Conditional Statements
    // IF ELSE IF ELSE IF ELSE IF ELSE BABY
    if (n === 0) {
        return x;
    } else {
        const f_int = f_linear(x, n - 1);
        return f_int + f_int;
    }
}

// f_linear(4, 4);
// f_tree(4, 4);

function hmc(cents) {
    // lcd is 5
    return cents % 5 !== 0
            ? math_floor(cents / 5)
            : cents === 0
            ? 1
            : cents < 0
            ? 0
            : hmc(cents - 5) + hmc(cents - 10) + hmc(cents - 20) +
                hmc(cents - 50) + hmc(cents - 100);
}

// display(hmc_2(20));
// hmc(20);


// HIGHER ORDER FUNCTIONS
function f(g, x) {
    return g(x);
}

function g(y) {
    return y + 1;
}

// display(f(g, 6));

// LAMBDA EXPRESSIONS
x => x + 1;
const plus_one = x => x + 1;

// plus_one(5);

// Wtf this works too:
function adder(x) {
    // function add(y) {
    //     return x + y;
    // }
    // return add;
    return y => x + y;
}
const plus_two = adder(2);
plus_two(4); // 4 + 2 = 6