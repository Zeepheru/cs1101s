// Lecture 4: Intro to Data Abstraction
// pairs and empty lists

// point (x, y) represented as a function
function make_point(x, y) {
    return component => component === 0 ? x : y;
}

// selectors
const x_of = point => point(0); 
const y_of = point => point(1);

// pair and head (another way, from the quest lol)
const pair = (x, y) => f = f(x, y);