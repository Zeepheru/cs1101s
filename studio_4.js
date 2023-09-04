// Studio 4

function pascal(row, position) {
    // recursive
    return (position === 0 || row + 1 === position)
            ? 0
            : row === 1
            ? 1
            : pascal(row - 1, position) + pascal(row - 1, position - 1);
}

display(pascal(4, 3));
