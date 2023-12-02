// Q1
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function bass_drum(note, duration) {
    const f1 = 79; // prime
    const f2 = 149; // prime
    
    return drum_envelope(simultaneously(list(
                                    sine_sound(f1, duration), 
                                    sine_sound(f2, duration))));
}

function mute(note, duration) {
    return silence_sound(duration);
}

// Test
// play(snare_drum(50, 0.2));
// play(bass_drum(50, 0.2));

play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                        mute(0, 0.2),
                        snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));

// Q2
function generate_list_of_note(letter_name, list_of_interval) {
    return reverse(accumulate(
                        (curr, wish) => pair(head(wish) + curr, wish), 
                        list(letter_name_to_midi_note(letter_name)), 
                        reverse(list_of_interval)));
}

function list_to_sound(list_of_midi_note, duration, instrument) {
    return accumulate(
                    (curr, wish) => consecutively(list(
                                instrument(
                                    curr, duration), 
                                wish)),
                    silence_sound(0), list_of_midi_note);
}


// Scale intervals:
const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);
const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


// Generating and playing the scales:
const c_major_scale = generate_list_of_note("C4", major_scale_interval);
// const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
// play(c_major_scale_sound);

const c_harmonic_minor_scale = generate_list_of_note("C4", harmonic_minor_scale_interval);
// const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
// play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4", melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
play(c_melodic_minor_scale_sound);


// Q3
// copy your functions generate_list_of_note and list_to_sound
// from the previous Question here
function generate_list_of_note(letter_name, list_of_interval) {
    return accumulate(
                (curr, wish) => pair(head(wish) - curr, wish), 
                list(letter_name_to_midi_note(letter_name)), 
                list_of_interval);
}

function list_to_sound(list_of_midi_note, duration, instrument) {
    return accumulate(
                    (curr, wish) => consecutively(list(
                                instrument(
                                    curr, duration), 
                                wish)),
                    silence_sound(0), list_of_midi_note);
}


const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each, instrument) {
    if (length(arpeggio) < 4) {
        return silence_sound(0);
    } else {
        const note = number => 
                        instrument(
                            number, duration_each);
        const arp_4 = consecutively(list(
                        note(list_ref(arpeggio, 0)), 
                        note(list_ref(arpeggio, 1)),
                        note(list_ref(arpeggio, 2)),
                        note(list_ref(arpeggio, 3))));
                        
        return consecutively(list(
                        arp_4,
                        arpeggiator_up(
                            tail(arpeggio), duration_each, instrument)));
    }

}

// Test
const test_sawtooth = arpeggiator_up(
                                generate_arpeggio(
                                    "C4", major_arpeggio_interval), 
                                0.1, cello);
                                
const test_sawtooth_fail = arpeggiator_up(
                                    generate_arpeggio(
                                        "C4", list(4, 3)), 
                                    0.1, cello);

play(test_sawtooth);

// Q4
function repeat_list(xs, n) {
    return n === 0 
            ? null
            : is_number(tail(xs))
            ? repeat_list(head(xs), tail(xs))
            : append(xs, repeat_list(xs, n - 1));
}

function simplify_rhythm(rhythm) {
    return is_null(rhythm)
            ? null
            : is_number(tail(rhythm))
            ? simplify_rhythm(repeat_list(head(rhythm), tail(rhythm)))
            : append(
                ( is_number(head(rhythm))
                ? list(head(rhythm))
                : simplify_rhythm(head(rhythm))
                ), simplify_rhythm(tail(rhythm)));
}

// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);

display_list(my_simple_rhythm);

const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
equal(my_simple_rhythm, correct_simple_rhythm);


// Q5
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function mute(note, duration) {
    return silence_sound(duration);
}

function repeat_list(xs, n) {
    return n === 0 
            ? null
            : is_number(tail(xs))
            ? repeat_list(head(xs), tail(xs))
            : append(xs, repeat_list(xs, n - 1));
}

function simplify_rhythm(rhythm) {
    return is_null(rhythm)
            ? null
            : is_number(tail(rhythm))
            ? simplify_rhythm(repeat_list(head(rhythm), tail(rhythm)))
            : append(
                ( is_number(head(rhythm))
                ? list(head(rhythm))
                : simplify_rhythm(head(rhythm))
                ), simplify_rhythm(tail(rhythm)));
}


function percussions(distance, list_of_sounds, rhythm) {
    const rhythm_length = length(rhythm);
    const sounds_in_rhythm = map(n => list_ref(list_of_sounds, n), rhythm);
    
    function perc_helper(current_n, last_wave, remaining_sounds) {
        const current_duration = current_n * distance;
        
        if (current_n === rhythm_length) {
            return make_sound(last_wave, current_duration);
        } else {
            const current_wave = get_wave(head(remaining_sounds));
        
            const new_wave = t => t < current_duration
                            ? last_wave(t)
                            : last_wave(t) + current_wave(t - current_duration);
            
            return perc_helper(current_n + 1, new_wave, tail(remaining_sounds));
        }
    }
    
    return perc_helper(0, t => 0, sounds_in_rhythm);
}

// Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);

const percussion_sound = percussions(0.5,
         list(my_mute_sound,
              my_snare_drum,
              my_cello,
              my_bell),
         list(1,2,1,0,3,1,0));
         
// draw_sound_2d(percussion_sound);
play(percussion_sound);
