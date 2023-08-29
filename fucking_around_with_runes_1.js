import { 
    stack, heart, show, stackn, stack_frac, make_cross, rcross, sail, circle, 
    corner, nova, blank, random_color, beside_frac, quarter_turn_left, 
    quarter_turn_right, translate, scale, overlay_frac, repeat_pattern,
    rotate, color, turn_upside_down, scale_independent
} from "rune";

// remove the first rune layer !!!!

const r = 0.9;
const g = 0.2;
const b = 0.51;

const r1 = 0.92;
const g1 = 0.72;
const b1 = 0.3;

function set_gradient(n, n_current, rune) {
    const g_lvl = n_current / n;
    
    function get_avr(value_0, value_1, g_lvl) {
        return value_0 * g_lvl + value_1 * (1 - g_lvl) + math_random() / 128;
    }
    
    return color(
                rune, 
                get_avr(r, r1, g_lvl), 
                get_avr(g, g1, g_lvl), 
                get_avr(b, b1, g_lvl));
}

function cone(n, rune){
    
    function iter(n, n_current, current_rune, input_rune) {
        // var names!
        return n === n_current
               ? current_rune
               : iter(
                    n, n_current + 1,
                    overlay_frac(
                        math_pow(1 / (n_current + 1), 1.1),
                        scale((n - n_current) / n * 1.1, input_rune),
                        current_rune),
                    rotate(
                        (2 * math_PI) * 0.0009,
                        set_gradient(n, n_current, input_rune)));
    }
    
    return iter(n, 1, rune, rune);
}

// MAKE SOME NICE IMAGES
// const result_0 = cone(570, overlay_frac(0.01,
//                         heart,
//                         turn_upside_down(heart)));
                        
const result_0 = cone(1200, scale_independent(0.7, 1.2, circle));
                        
const result_1 = scale(0.7, result_0);

show(result_1);
