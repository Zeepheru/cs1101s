import { 
    make_sound, play, 
    consecutively, simultaneously,
    letter_name_to_frequency, midi_note_to_frequency,
    square_sound, silence_sound, sawtooth_sound, sine_sound, triangle_sound,
    noise_sound, adsr,
    get_duration, get_wave
} from "sound";

// setting params

import {
    make_point, draw_connected_full_view_proportional
} from "curve";



// make waveform
function show_waveform(sound) {
    const dur = get_duration(sound);
    const draw_freq = 48000; // standard for most audio formats
    
    const wave = t => get_wave(sound)(t);
    
    const waveform_curve = x => make_point(x * 2, wave(x * dur) / 2);
    
    draw_connected_full_view_proportional(draw_freq * dur)(waveform_curve);
}

function test_show_function() {
    // const f = x => (1 + math_expm1(-x / 1)) * (2 + math_expm1(-25 * (x / 1 - 0.001)));
    const f = x => (math_expm1(-25 * (x / 1 - 0.001)));
    
    const test_func = x => make_point(x * 2, f(x * 2));
    draw_connected_full_view_proportional(1000)(test_func);
}

function apply_function_to_list(f, lst) {
    return is_null(lst)
            ? null
            : pair(f(head(lst)), apply_function_to_list(f, tail(lst)));
}


const bpm = 120;
// assuming 4/4
const beat = 1 / bpm * 60;
const measure  = beat * 4;
const note_8th = beat / 2;
const note_16th = beat / 4;


// ok lets try to make a sound reminiscent of a kick\
function sigmoid(d, x) {
    return (1 + math_exp(-25 * (x / d - 0.001)));
}

function kick_sound_1(duration) {
    const kick_wave = t => math_exp(-3.3 * t / duration) * 
                            math_sin(100 * math_sqrt(t * 2)) *
                            sigmoid(duration, t);
    return adsr(0.02, 0, 0.8, 0.1)(make_sound(kick_wave, duration)); // no need sigmoid now?
}

function some_other_drum(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
     
    const wave = t => math_exp(-2 * t / duration) * 
                            (math_sin(100 * math_sqrt(t * 3)) - 0.073 * math_cos(200 * math_sqrt(t)) - 
                            0.186 * math_cos(1200 * math_sqrt(t)));
    return make_sound(wave, duration);
}

function cymbal_sound_1(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const wave = t => math_exp(-7 * t / duration) * (noise(t) * noise(t) - 1 * 
                        math_sin(10 * math_sqrt(t)));
    
    return adsr(0.05, 0, 0.8, 0.1)(make_sound(wave, duration));
}

function cymbal_sound_2(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const wave = t => math_exp(-10 * t / duration) * 1.4 * (get_wave(noise)(t) * noise(t) 
                        - 0.1 * 
                        math_sin(1000 * math_sqrt(t)));
    
    return adsr(0.05, 0, 0.8, 0.1)(make_sound(wave, duration));
}
 
const kick_1 = kick_sound_1(beat);

const drum1 = cymbal_sound_2(beat);

// const kick_test = consecutively(list(kick_1, kick_1, kick_1, kick_1, kick_1, kick_1, kick_1, kick_1));

// test_show_function();

show_waveform(drum1);
play(drum1);