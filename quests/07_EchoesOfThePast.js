// Q1
// TEST SOUNDS //
function doremi(t_note) {
    return consecutively(list(
                    sine_sound(261.63, t_note), 
                    sine_sound(293.66, t_note),
                    sine_sound(329.63, t_note)));
}

const test_sound = doremi(0.5);
// TEST SOUNDS END //



// ANSWERS
function backward(sound) {
    const duration = get_duration(sound);
    return make_sound(t => get_wave(sound)(duration - t), duration);
}

play(test_sound);
play(backward(test_sound));

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(backward(my_voice()));          // step 3 in REPL


// Q2
// ANSWERS
function repeat(n, sound) {
    function repeat_helper(n) {
        return n === 0
            ? null
            : pair(sound, repeat_helper(n - 1));
    }
    return consecutively(repeat_helper(n));
}

// Test
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);

play(my_repeated);

// Q3
// TEST SOUNDS //
function doremi(t_note) {
    return consecutively(list(
                    sine_sound(261.63, t_note), 
                    sine_sound(293.66, t_note),
                    sine_sound(329.63, t_note)));
}

const test_sound = doremi(0.5);
// TEST SOUNDS END //



// ANSWERS
function fast_forward(n, sound) {
    const duration = get_duration(sound);
    return make_sound(t => get_wave(sound)(t * n), duration / n);
}

play(fast_forward(3, test_sound));

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(fast_forward(2, my_voice()));   // step 3 in REPL


// Q4
// ANSWERS
// function echo_v0(n, d, sound) {
//     const duration = get_duration(sound);
    
//     function echo_helper(n, last_sound) {
//         const half_sound = make_sound(
//                                     t => 0.5 * get_wave(last_sound)(t), 
//                                     duration);
        
//         return n === 0
//             ? pair(last_sound, null)
//             : pair(last_sound, 
//                     pair(silence_sound(d), 
//                         echo_helper(n - 1, half_sound)));
//     }
//     return consecutively(echo_helper(n, sound));
// }

function echo(n, d, sound) {
    const duration = get_duration(sound);
    const wave = get_wave(sound);
    
    function echo_helper(current_n, last_wave, current_duration) {
        const half_sound_wave = t => math_pow(0.5, current_n) * wave(t);
        
        const new_wave = t => t < current_duration
                        ? last_wave(t)
                        : t < current_duration + d
                        ? 0
                        : half_sound_wave(t - current_duration - d);
        
        return current_n === n + 1
            ? make_sound(last_wave, current_duration)
            : echo_helper(current_n + 1, new_wave, current_duration + d + duration);
    }
    return echo_helper(1, wave, duration);
}

// Test
const test_sound = sine_sound(800, 0.2);
const echo_sound = echo(5, 0.1, test_sound);
play(echo_sound);

// Q5
// TEST SOUNDS //
function doremi(t_note) {
    return consecutively(list(
                    sine_sound(261.63, t_note), 
                    sine_sound(293.66, t_note),
                    sine_sound(329.63, t_note)));
}

const test_sound = doremi(0.5);
// TEST SOUNDS END //


// ANSWERS
function backward(sound) {
    const duration = get_duration(sound);
    return make_sound(t => get_wave(sound)(duration - t), duration);
}

function repeat(n, sound) {
    function repeat_helper(n) {
        return n === 0
            ? null
            : pair(sound, repeat_helper(n - 1));
    }
    return consecutively(repeat_helper(n));
}

function fast_forward(n, sound) {
    const duration = get_duration(sound);
    return make_sound(t => get_wave(sound)(t * n), duration / n);
}

function echo(n, d, sound) {
    const duration = get_duration(sound);
    const wave = get_wave(sound);
    
    function echo_helper(current_n, last_wave, current_duration) {
        const half_sound_wave = t => math_pow(0.5, current_n) * wave(t);
        
        const new_wave = t => t < current_duration
                        ? last_wave(t)
                        : t < current_duration + d
                        ? 0
                        : half_sound_wave(t - current_duration - d);
        
        return current_n === n + 1
            ? make_sound(last_wave, current_duration)
            : echo_helper(current_n + 1, new_wave, current_duration + d + duration);
    }
    return echo_helper(1, wave, duration);
}

function make_alien_jukebox(sound) {
    // assuming variant is an int in [0, 4]
    return variant => variant === 0 
                    ? play(sound)
                    : variant === 1
                    ? play(backward(sound))
                    : variant === 2
                    ? play(fast_forward(0.5, sound))
                    : variant === 3
                    ? play(repeat(3, fast_forward(2, sound)))
                    : play(echo(4, 0.3, backward(sound)));
}

// TEST - play variations of test_sound
const j = make_alien_jukebox(test_sound);
const n = 4;

j(n);


// Press "Run"

// Then test in REPL:

// init_record();

// const erksh_voice = record_for(1, 0.2);

// const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording

// j(1);  // plays it backward

// j(2);  // plays it at half speed

// j(3);  // plays it at double speed, three times in a row

// j(4);  // plays it backward with 4-times echo,
//        //     with 0.3 seconds echo delay