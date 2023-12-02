/*

AHH

THIS

ONE

:)

*/

// Q1
const increment_repeater = rptr => f => x => f(rptr(f)(x));

const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT"
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T"
                        // four times in orange
                        // (the REPL will display
                        // "A L E R T"a fifth time
                        // [in white] as the value
                        // returned by bigwarn)

// Q2
const pair = (x, y) => f => f(x, y);

const head = p => p((x, y) => x);  // complete lambda expression
const tail = p => p((x, y) => y);  // complete lambda expression

display(head(pair(1, 2)) === 1); // should return true
tail(pair(1, 2)) === 2; // should return true

// Q3
/*

Ω(n)

*/

// Q4, Q5
// no idea 