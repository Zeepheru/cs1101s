// S3b

function expt(b, n) {
    return n === 0 ? 1 : b * expt(b, n - 1);
}

/*
as n grows, \Theta(n) for both
as b grows, \Theta(1)

*/


function fast_expt(b, n) {
    // b is base, n is exponent
    return n === 0
            ? 1
            : n % 2 === 0
            ? fast_expt(b, n / 2) * fast_expt(b, n / 2)
            : b * fast_expt(b, n - 1);
}

function fast_expt_with_neg(b, n) {
    return n === 0
            ? 1
            : n < 0
            ? 1 / fast_expt(b, -1 * n)
            : n % 2 === 0
            ? fast_expt(b, n / 2) * fast_expt(b, n / 2)
            : b * fast_expt(b, n - 1);
}

fast_expt(32, 33);

// pretty interesting how it's \Theta(log(n))

// iterative version basically does: 
/*

2 ^ 8 = 4 ^ 4
2 ^ 7 = 4 * 6

benefit is that its space is \Theta(1) instead of \Theta(log(n))

*/