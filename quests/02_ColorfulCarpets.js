// Q1
function besiden(n, rune) {
    return n === 1
           ? rune
           : beside_frac(1 / n, rune,
                        besiden(n - 1, rune));
}



// Test
show(besiden(7, heart));

// Q2
function besidem(m, rune) {
    return m === 1
           ? rune
           : beside_frac(1 / m, rune,
                        besidem(m - 1, rune));
}

function carpet(n, m, rune) {
    // n is no of rows, m is no of columns
    return stackn(n, besidem(m, rune));
}

// Test
show(carpet(7, 5, heart));
// show(carpet(10, 10, random_color(heart)));

// Q3
/*
Enter your answers here
(answer each question in one or two complete sentences):

(a)
A 10x10 patchwork carpet where every heart has the same color is shown. The 
color is different every time the function is called. 

(b)
Since Source uses applicative order reduction, all arguments in the function 
are evaluated first before execution, hence the random_color(heart) function is 
evaluated and executed first. So, when the function carpet is called, the rune 
argument that is used within the function to generate the carpet is already
a heart with a random color already applied.

(c)
If Source uses normal order reduction, the function random_color would not be
executed until each time a rune is being added recursively. Hence, each rune
would have a random color independent of the other runes in the carpet.
*/

// Q4
function besidem_random_color(m, rune) {
    return m === 1
           ? rune
           : beside_frac(1 / m, random_color(rune),
                        besidem_random_color(m - 1, random_color(rune)));
}

function randomly_colored_carpet(n, m, rune) {
    return n === 0
           ? rune
           : stack_frac(1 / n, besidem_random_color(m, rune),
                       randomly_colored_carpet(n - 1, m, rune));
                        
}

// Test
show(randomly_colored_carpet(10, 10, heart));
// should produce a carpet as shown in the title picture of this quest.

