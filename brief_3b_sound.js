// Brief 3b - Sound

import { make_sound, play } from "sound";

const pitch_A_wave = t => math_sin(2 * math_PI * 440 * t);

const Cmaj_chord_wave = t => 0.33 * math_sin(2 * math_PI * 261.63 * t) +
                            0.33 * math_sin(2 * math_PI * 329.63 * t) +
                            0.33 * math_sin(2 * math_PI * 392.00 * t);

const doremi_wave = 
                t => t < 0.5
                    ? math_sin(2 * math_PI * 261.63 * t)
                    : t < 1.0 
                    ? math_sin(2 * math_PI * 293.66 * t)
                    : math_sin(2 * math_PI * 329.63 * t);

const pitch_A = make_sound(pitch_A_wave, 1.5);
const Cmaj_chord = make_sound(Cmaj_chord_wave, 1.5);
const doremi = make_sound(doremi_wave, 1.5);

play(doremi);
