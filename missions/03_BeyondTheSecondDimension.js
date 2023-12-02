// Q1
function mosaic(r1, r2, r3, r4) {
    return stack(
        beside(r1, r4),
        beside(r3, r2));
}

function steps(r1, r2, r3, r4){
    // check function indentation again! 
    return overlay_frac(
                1 / 4, 
                mosaic(r4, blank, blank, blank), 
                overlay_frac(
                    1 / 3,
                    mosaic(blank, blank, r3, blank),
                    overlay(
                        mosaic(blank, r2, blank, blank),
                        mosaic(blank, blank, blank, r1))));
}

// Tests
show(steps(rcross, triangle, corner, nova));
hollusion(steps(rcross, triangle, corner, nova));

// Q2
function cone(n, rune){
    
    function iter(n, n_current, current_rune, input_rune) {
        // var names!
        return n === n_current
               ? current_rune
               : iter(n, 
                    n_current + 1, 
                    overlay_frac(
                        1 / (n_current + 1),
                        scale((n - n_current) / n, input_rune),
                        current_rune),
                    input_rune);
    }
    
    return iter(n, 1, rune, rune);
}

// Tests
show(cone(4, circle));
show(cone(15, circle));


// Miscellany for recursion visualisation
/*
r0 = input
r1 = overlay_frac(1 / 2, scale(3/4, rune), r0)
r2 = overlay_frac(1 / 3, scale(2/4, rune), r1)
r3 = overlay_frac(1 / 4, scale(1/4, rune), r2)
*/