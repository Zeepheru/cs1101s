// Lecture 4: Intro to Data Abstraction
// pairs and empty lists

// point (x, y) represented as a function
function make_point(x, y) {
    return component => component === 0 ? x : y;
}