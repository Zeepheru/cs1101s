import { 
    make_sound, play, 
    consecutively, simultaneously,
    letter_name_to_frequency, midi_note_to_frequency,
    square_sound, silence_sound, sawtooth_sound, sine_sound, triangle_sound,
    noise_sound, adsr,
    get_duration, get_wave
} from "sound";

import {
    make_point, draw_connected_full_view_proportional
} from "curve";



// make waveform
function show_waveform(sound) {
    // DO NOT USE WITH LONG DURATIONS. IT WILL COMPLETELY HANG.
    const dur = get_duration(sound);
    const draw_freq = 1000; // standard for most audio formats
    
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

const list_encoded_rickroll = list(915203008, 915403008, 914701004, 915403008, 915603008, 915901016, 915701016, 915601016, 915201016, 915203008, 915403008, 914701004, 900005008, 914715256, 900001256, 914701016, 914901016, 915201016, 914901016, 915201016, 915203008, 915403008, 914701004, 915403008, 915603008, 915901016, 915701016, 915601016, 915201016, 915203008, 915403008, 914701004);

const bpm = 120;
// assuming 4/4
const beat = 1 / bpm * 60;
const bar_duration = beat * 4;
const measure  = beat * 4;
const note_8th = beat / 2;
const note_16th = beat / 4;
const note_32nd = beat / 8;

const rest_16th = silence_sound(note_16th);
const rest_8th = silence_sound(note_8th);
const rest_beat = silence_sound(beat);


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
                            (math_sin(100 * math_sqrt(t * 2)) - 0.073 * math_cos(200 * math_sqrt(t)) - 
                            0.186 * math_cos(1200 * t));
    return make_sound(wave, duration);
}

function snare_perhaps(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
     
    const wave = t => math_exp(-4 * t / duration) * (math_exp(-5 * t / duration) 
                            * (math_sin(160 * math_sqrt(t * 2)))
                            - (noise(t)));
    return (make_sound(wave, duration));
}

function cymbal_sound_1(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const wave = t => math_exp(-7 * t / duration) * (noise(t) * noise(t) - 1 * 
                        math_sin(10 * math_sqrt(t)));
    
    return adsr(0.05, 0, 0.8, 0.1)(make_sound(wave, duration));
}

function cymbal_sound_2(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const wave = t => math_exp(-10 * t / duration) * 1.4 * (noise(t) * noise(t));
    
    return adsr(0.05, 0, 0.8, 0.1)(make_sound(wave, duration));
}

function cymbal_sound_3(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const wave = t => math_exp(-15 * t / duration) * (noise(t));
    
    return adsr(0.02, 0, 0.8, 0.1)(make_sound(wave, duration));
}

// TRY OUT SOME NEW WAVES

function synth_strings(freq, duration) {
    // adsr(0.1, 0.3, 0.4, 0.2)(simultaneously(list(sine_sound(freq, duration), sine_sound(freq * 2, duration))))
    // const wave = t => math_exp(-0.6 * t / duration)
    //             * ( math_sin(freq * t) );
                    
    // const base_sound = make_sound(wave, duration);
    
    
    
    
    return adsr(0.02, 0.9, 0, 0.1)(base_sound);
}


// const test_note = clean_tone_empirical(220, 6);

// show_waveform(test_note);
// play(test_note);

///
 
const kick_1 = kick_sound_1(note_8th);

const cym = cymbal_sound_3(note_8th);
const cym2 = cymbal_sound_2(note_8th);
const snare = snare_perhaps(note_8th);

// const kick_test = consecutively(list(kick_1, kick_1, kick_1, kick_1, kick_1, kick_1, kick_1, kick_1));

// test_show_function();

// show_waveform(drum1);
// play(drum1);

// const d1 = consecutively(list(double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal, double_kick_metal));
const d1 = consecutively(list(kick_1, kick_1, snare, rest_8th));
const d2 = consecutively(list(cym, cym2, cym, cym));

const drums = simultaneously(list(d1, d2));

const drums_x4 = consecutively(list(drums, drums, drums, drums));
const drum_test = consecutively(list(drums_x4, drums_x4, drums_x4, drums_x4));
// show_waveform(drums_x4);



// try and generate sounds from t1 encoded numbers
function generate_sound_t1(encoded_0) {
    function get_freq(note_number) {
        return note_number === 0
                ? 0
                : midi_note_to_frequency(note_number);
    }
    const encoded = encoded_0 - 9e8;
    
    const dd = encoded % 1000;
    const nn = ((encoded - dd) / 1000) % 100;
    const sound_type = math_floor(encoded / 1e7);
    const note_number = math_floor((encoded % 1e7) / 1e5) + 21;
    
    // display(dd);
    // display(nn);
    // display(note_number);
    // display(nn/dd);
    
    const duration = bar_duration * nn / dd;
    
    const note_freq = get_freq(note_number);
    
    // can add chords here
    const sound_func = sound_type === 1
                        ? synth_strings
                        : sound_type === 2
                        ? triangle_sound
                        : sound_type === 3
                        ? sawtooth_sound
                        : sound_type === 4
                        ? sine_sound
                        : sound_type === 5
                        ? square_sound
                        : (freq, duration) => silence_sound(duration);
    
    return sound_func(note_freq, duration);
}

// SOUND TESTS //

// const test_sound = consecutively(apply_function_to_list(generate_sound_t1, list_encoded_megalovania_riff));
// play(simultaneously(list(drum_test, consecutively(list(test_sound, test_sound)))));


const test_sound = consecutively(apply_function_to_list(generate_sound_t1, list_encoded_rickroll));
play(test_sound);

