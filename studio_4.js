// Studio 4

function pascal(row, position) {
    // recursive
    
    // note that this is a streamlined version with less conditions, 
    // but still the right implementation
    return position === 0 || row === position
            ? 1
            : pascal(row - 1, position) + pascal(row - 1, position - 1);
}

display(pascal(4, 3));


// 3A


