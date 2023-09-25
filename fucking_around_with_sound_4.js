import { 
    make_sound, play, 
    consecutively, simultaneously,
    letter_name_to_frequency, midi_note_to_frequency,
    square_sound, silence_sound, sawtooth_sound, sine_sound, triangle_sound,
    noise_sound, adsr, violin,
    get_duration, get_wave
} from "sound";

import {
    make_point, draw_connected_full_view_proportional
} from "curve";



// make waveform
function show_waveform(sound) {
    // DO NOT USE WITH LONG DURATIONS. IT WILL COMPLETELY HANG.
    const dur = get_duration(sound);
    const draw_freq = 1000; 
    
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

const twopi = 2 * math_PI;


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

function synth_strings_v0(note, f, duration) {
    const freq = twopi * f * 2; // times 2 for strings?
    const nfreq = freq * 1.008;
    
    const wave = t => (
                    0.891 * math_sin(freq * t * 1) + 
                    1.000 * math_sin(freq * t * 2) + 
                    0.335 * math_sin(freq * t * 3) + 
                    0.200 * math_sin(freq * t * 4) + 
                    0.168 * math_sin(freq * t * 5)
                    ) / 7 + (
                    0.891 * math_sin(nfreq * t * 1) + 
                    1.000 * math_sin(nfreq * t * 2)
                    ) / 16
                    ;
                    
    const base_sound = make_sound(wave, duration);
    

    // return adsr(0.01, 0.9, 0, 0.1)(violin(note, duration));
    // return base_sound;
    return adsr(0.2, 0, 0.8, 0.4)(base_sound); 
}

function synth_strings_v1(note, f, duration) {
    const freq = twopi * f * 2; // times 2 for strings?
    const nfreq = freq * 1.008;
    
    const wave = t => (
                    0.791 * math_sin(freq * t * 1) + 
                    0.920 * math_sin(freq * t * 2) + 
                    0.635 * math_sin(freq * t * 3) + 
                    0.900 * math_sin(freq * t * 4) + 
                    0.368 * math_sin(freq * t * 5)
                    ) / 7 + (
                    0.891 * math_sin(nfreq * t * 2) + 
                    1.000 * math_sin(nfreq * t * 3)
                    ) / 16
                    ;
                    
    const base_sound = make_sound(wave, duration);
    

    // return adsr(0.01, 0.9, 0, 0.1)(violin(note, duration));
    // return base_sound;
    return adsr(0.3, 0, 0.8, 0.4)(base_sound); 
}

function synth_strings(note, f, duration) {
    const freq = twopi * f * 2; // times 2 for strings?
    const nfreq = freq * 1.008;
    
    const wave = t => (
                    0.791 * math_sin(freq * t * 1) + 
                    0.920 * math_sin(freq * t * 2) + 
                    0.635 * math_sin(freq * t * 3) + 
                    0.900 * math_sin(freq * t * 4) + 
                    0.368 * math_sin(freq * t * 5)
                    ) / 7 // CHANGE THIS PARAM!
                    ;
                    
    const base_sound = make_sound(wave, duration);
    

    // return adsr(0.01, 0.9, 0, 0.1)(violin(note, duration));
    // return base_sound;
    return adsr(0.3, 0, 0.8, 0.4)(base_sound); 
}

// NEW EFFECTS
function chorus(sound) {
    // params set inside
    // delay LFO freq, in Hz
    const lfo_freq = 7;
    
    function lfo_creator(delay_min, delay_max) {
        const delay_range = (delay_max - delay_min) / 2000;
        const delay_avr = (delay_max + delay_min) / 2000;
        const ang_freq = twopi * lfo_freq;
        
        display(delay_range);
        display(delay_avr);
        display(ang_freq);
        
        return t => delay_range * math_sin(ang_freq * t) + delay_avr;
    }
    
    const lfo = lfo_creator(0, 1);
    display(lfo);
    const sound_dur = get_duration(sound);
    const sound_wave = get_wave(sound);
    
    return make_sound(t => sound_wave(t) + sound_wave(t + lfo(t)), sound_dur);
}

// NOTE TESTING



// test overlapping
function overlap_consec(list_of_sounds) {
    const total_length = length(list_of_sounds);
    
    function perc_helper(current_duration, last_wave, remaining_sounds) {
        if (is_null(remaining_sounds)) {
            return make_sound(last_wave, current_duration);
        } else {
            const current_wave = get_wave(head(remaining_sounds));
            const current_wave_dur = get_duration(head(remaining_sounds));
        
            const new_wave = t => t < current_duration
                            ? last_wave(t)
                            : t < current_duration + current_wave_dur
                            ? last_wave(t) + current_wave(t - current_duration)
                            : 0 ;
            
            return perc_helper(current_duration + current_wave_dur / 1.5, new_wave, tail(remaining_sounds));
        }
    }
    
    return perc_helper(0, t => 0, list_of_sounds);
}


///
 
const kick_1 = kick_sound_1(note_8th);

const cym = cymbal_sound_3(note_8th);
const cym2 = cymbal_sound_2(note_8th);
const snare = snare_perhaps(note_8th);

// const kick_test = consecutively(list(kick_1, kick_1, kick_1, kick_1, kick_1, kick_1, kick_1, kick_1));

// test_show_function();

// show_waveform(drum1);
// play(drum1);

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
    const note_number = math_floor((encoded % 1e7) / 1e5) + 21;
    
    // Override
    // const sound_type = 2;
    const sound_type = math_floor(encoded / 1e7);
    
    
    const duration = bar_duration * nn / dd;
    
    const note_freq = get_freq(note_number);
    
    // can add chords here
    const sound_func = sound_type === 1
                        ? (note, freq, duration) => synth_strings(note, freq, duration * 1.5)
                        : sound_type === 2
                        ? (note, freq, duration) => synth_strings(note, freq, duration)
                        : sound_type === 3
                        ? (note, freq, duration) => sawtooth_sound(freq, duration)
                        : sound_type === 4
                        ? (note, freq, duration) => sine_sound(freq, duration)
                        : sound_type === 5
                        ? (note, freq, duration) => square_sound(freq, duration)
                        : (note, freq, duration) => silence_sound(duration);
    
    return sound_func(note_number, note_freq, duration);
}

// SOUND TESTS //

const rickroll_melody_soundlist = map(generate_sound_t1, list_encoded_rickroll);

// const test_sound = consecutively(rickroll_melody_soundlist);
const test_sound = chorus(overlap_consec(rickroll_melody_soundlist));
play(test_sound);
show_waveform(test_sound);

