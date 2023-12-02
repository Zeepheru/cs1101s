// Q1
// Task 1

function cut_sound(sound, duration) {
    return make_sound(get_wave(sound), duration);
}

// Play test sound.
play(cut_sound(noise_sound(2), 1));

// Q2
// Task 2

function sine_sound(freq, duration) {
    const angular_freq = 2 * math_PI * freq;
    const sine_wave = t => math_sin(angular_freq * t);
    
    return make_sound(sine_wave, duration);
}

// Play test sound.
play(sine_sound(500, 1));

// Q3
// Task 3

// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const angular_freq = 2 * math_PI * freq;
    const sine_wave = t => math_sin(angular_freq * t);
    
    return make_sound(sine_wave, duration);
}

function two_consecutively(s1, s2) {
    const t1 = get_duration(s1);
    const t2 = get_duration(s2);
    
    const w1 = get_wave(s1);
    const w2 = get_wave(s2);
    
    const t_conseq = t1 + t2;
    const w_conseq = t => 
                t < t1
                ? w1(t)
                : w2(t - t1);
                
    return make_sound(w_conseq, t_conseq);
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1, my_sine_2));


// Q4
// Task 4
function sine_sound(freq, duration) {
    const angular_freq = 2 * math_PI * freq;
    const sine_wave = t => math_sin(angular_freq * t);
    
    return make_sound(sine_wave, duration);
}

function two_consecutively(s1, s2) {
    const t1 = get_duration(s1);
    const t2 = get_duration(s2);
    
    const w1 = get_wave(s1);
    const w2 = get_wave(s2);
    
    const t_conseq = t1 + t2;
    const w_conseq = t => 
                t < t1
                ? w1(t)
                : w2(t - t1);
                
    return make_sound(w_conseq, t_conseq);
}

function consecutively(list_of_sounds) {
    return is_null(tail(list_of_sounds))
            ? head(list_of_sounds)
            : two_consecutively(head(list_of_sounds), 
                                consecutively(tail(list_of_sounds)));
}

const my_sine_1 = sine_sound(500, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(625, 0.5);

// Play test sound.
play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));

// Q5
// Task 5
function sine_sound(freq, duration) {
    const angular_freq = 2 * math_PI * freq;
    const sine_wave = t => math_sin(angular_freq * t);
    
    return make_sound(sine_wave, duration);
}

function two_consecutively(s1, s2) {
    const t1 = get_duration(s1);
    const t2 = get_duration(s2);
    
    const w1 = get_wave(s1);
    const w2 = get_wave(s2);
    
    const t_conseq = t1 + t2;
    const w_conseq = t => 
                t < t1
                ? w1(t)
                : w2(t - t1);
                
    return make_sound(w_conseq, t_conseq);
}

function consecutively(list_of_sounds) {
    return is_null(tail(list_of_sounds))
            ? head(list_of_sounds)
            : two_consecutively(head(list_of_sounds), 
                                consecutively(tail(list_of_sounds)));
}

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(800, dot_duration);
const dash_sound = sine_sound(800, dash_duration);
const dot_pause = silence_sound(dot_duration);
const dash_pause = silence_sound(dash_duration);

// Create sounds for each letter.
const S_sound = consecutively(
                        list(dot_sound, dot_pause, dot_sound,
                            dot_pause, dot_sound));

const O_sound = consecutively(
                        list(dash_sound, dot_pause, dash_sound,
                            dot_pause, dash_sound));

// Build the signal out of letter sounds and pauses.
const distress_signal = consecutively(
                                list(S_sound, dash_pause, O_sound,
                                    dash_pause, S_sound));

// Play distress signal.
play(distress_signal);