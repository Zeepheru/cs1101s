import {
    make_sound, get_duration, get_wave, silence_sound, play
} from "sound";

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
    draw_data(list_of_sounds);
    return is_null(tail(list_of_sounds))
            ? head(list_of_sounds)
            : two_consecutively(consecutively(tail(list_of_sounds)), head(list_of_sounds));
}
