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
    const draw_freq = 6000; 
    
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

function tom_perhaps(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
     
    const wave = t => (math_exp(-2 * t / duration) 
                            * (math_sin(545.1 * t) + math_sin(843.1 * t)  + math_sin(1012.3 * t)) / 2);
    return adsr(0,0,1,0.3)(make_sound(wave, duration));
}

function snare_perhaps(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
     
    const wave = t => math_exp(-4 * t / duration) * (math_exp(-5 * t / duration) 
                            * (math_sin(160 * math_sqrt(t * 2)))
                            - 0.05 * (noise(t)));
    return (make_sound(wave, duration));
}

function snare_v2(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
     
    const wave = t => math_exp(-4 * t / duration) * (noise(t) - 1 * (math_sin(120 * twopi * t)));
    return adsr(0,0,1,0.3)(make_sound(wave, duration));
}


function cymbal_sound_1(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const wave = t => math_exp(-7 * t / duration) * (noise(t) * noise(t) - 1 * 
                        math_sin(10 * math_sqrt(t)));
    
    return adsr(0.01, 0, 0.8, 0.1)(make_sound(wave, duration));
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

function cymbal_sound_4(duration) { 
    const noise = t => get_wave(noise_sound(duration))(t);
    const wave = t => 0.5 * math_exp(-8 * t / duration) * (noise(t) - 0.5 * math_sin(240 * twopi * t)) ;
    
    return (make_sound(wave, duration));
}

function cymbal_sound_rings(dur) { 
    const duration = dur * 2;
    const noise = t => get_wave(noise_sound(duration))(t);
    
    const ahfunc = t => 1 / (2 + 4 * (t - dur) * (t - dur));
    
    const wave = t => 0.5 * math_exp(-5 * t / duration) * (noise(t)) + 
                      0.4 * math_exp(-4 * t / duration) * ahfunc(t) * (math_sin(3000 * t) + 0.4 * math_sin(1500 * t)) ;
    
    return adsr(0.01, 0.3, 0.8, 0.2)(make_sound(wave, duration));
}

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

function overlap_consec_times(list_of_sounds, times) {
    // time - each note's actual time
    // const total_length = length(list_of_sounds);
    
    function perc_helper(current_duration, last_wave, remaining_sounds, times) {
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
            
            return perc_helper(current_duration + head(times), new_wave, tail(remaining_sounds), tail(times));
        }
    }
    
    return perc_helper(0, t => 0, list_of_sounds, times);
}


///

// FOR THY INTRO
/*
160 Hz to 90 Hz or so drop (1000 -> 550)

*/

function introdrum1(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
     
    const wave = t => math_exp(-2 * t / duration) * (
                            (math_sin(145 * math_sqrt(t * 5)) 
                            - 0.073 * math_cos(200 * math_sqrt(t))
                            - 0.2 * noise(t)
                            ));
    return adsr(0.01, 0.3, 0.8, 0.2)(make_sound(wave, duration));
}

function introdrum2(duration) {
    const noise = t => get_wave(noise_sound(duration))(t);
    const frequency = x => 1100 - x * (2 / duration);
     
    const wave = t => math_exp(-2 * t / duration) * (
                            (math_sin(frequency(t) * t) 
                            - 0.073 * math_cos(2 * frequency(t) * t)
                            - 0.2 * noise(t)
                            ));
    return adsr(0.01, 0.3, 0.8, 0.2)(make_sound(wave, duration));
}

// NEW EFFECTS
function chorus(sound) {
    // params set inside
    // delay LFO freq, in Hz
    const lfo_freq = 3;
    
    function lfo_creator(delay_min, delay_max) {
        const delay_range = (delay_max - delay_min) / 2000;
        const delay_avr = (delay_max + delay_min) / 2000;
        const ang_freq = twopi * lfo_freq;
        
        return t => delay_range * math_sin(ang_freq * t) + delay_avr;
    }
    
    const lfo = lfo_creator(5, 6);
    const sound_dur = get_duration(sound);
    const sound_wave = get_wave(sound);
    
    return make_sound(t => 0.5 * (sound_wave(t) + sound_wave(t + lfo(t))), sound_dur);
}

// make all into pairs

function drum_exp_drop(duration) {
    return make_sound(t => math_exp(-1 * t / note_16th), duration);
}

function drum_exp_drop_partial(amplitude, duration) {
    return make_sound(t => amplitude * math_exp(-1 * t / note_16th), duration);
}

const intro_length = note_16th * 10;
const intro_noise = t => get_wave(noise_sound(intro_length))(t);

const id1 = introdrum2(note_8th);

function sine_decrease_sound(start, stop, duration) {
    const start_f = start * twopi;
    const end_f = stop * twopi;
    const m = (end_f - start_f) / duration;
    
    const freq = t => m * t + start_f;
    
    const sound_wave = t => 
                        math_sin(freq(t) * t)
                        + 0.25 * math_sin(2 * freq(t) * t);
                        
    return make_sound(sound_wave, duration);
}

const intro_sine_sounds = consecutively(list(
                    sine_decrease_sound(270, 200, note_8th + note_16th),
                    sine_decrease_sound(260, 210, note_8th * 2),
                    sine_decrease_sound(230, 145, note_8th + note_16th)
                    ));
                                
const intro_drum_envelopes = consecutively(list(
                    drum_exp_drop(note_16th),
                    drum_exp_drop_partial(0.6, note_8th),
                    drum_exp_drop(note_16th),
                    drum_exp_drop(note_16th),
                    drum_exp_drop_partial(0.4, note_16th),
                    drum_exp_drop_partial(0.2, note_16th),
                    drum_exp_drop(note_16th),
                    drum_exp_drop(note_16th),
                    drum_exp_drop(note_16th)
                    ));                       

function gimme_intro(sines, drums) {
    const duration = get_duration(drums);
    const sine_waves = get_wave(sines);
    const drum_waves = get_wave(drums);
    
    const new_wave = t => sine_waves(t) * drum_waves(t);
    
    return make_sound(new_wave, duration);
}

const drum_intro = gimme_intro(intro_sine_sounds, intro_drum_envelopes);

show_waveform(drum_intro);
play(drum_intro);





 
const kick_1 = kick_sound_1(beat);

const cym = cymbal_sound_1(beat);
const cym2 = cymbal_sound_2(beat);
const hh_closed = cymbal_sound_4(note_8th);
const hh_open = cymbal_sound_rings(note_8th);
const snare = snare_v2(note_8th);


const tester = tom_perhaps(beat);


// test_show_function();

// Main drums test
// const cymbal_times = list(note_8th, note_16th, note_16th,
//                             note_8th, note_16th, note_16th,
//                             note_8th, note_16th, note_16th,
//                             note_8th, note_16th, note_16th);
// const cymbals = map((x) => hh_closed, cymbal_times);
// const cymbal_line = overlap_consec_times(cymbals, cymbal_times);

// const kick_line = overlap_consec_times(list(kick_1, kick_1, kick_1, kick_1), list(beat, beat, beat, beat));
// const snare_line = overlap_consec_times(list(snare, snare), list(beat +  beat, beat + beat));

// const full_drums_bar = simultaneously(list(cymbal_line, kick_line, snare_line));



// DRUM TESTS
// show_waveform(full_drums_bar);
// play(full_drums_bar);




