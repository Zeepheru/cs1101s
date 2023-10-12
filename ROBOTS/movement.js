/*
Yes, there is a lot of boilerplate. 

*/

ev3_speak("program running");

// init variables
const motorL = ev3_motorA();
const motorR = ev3_motorB();
const ultrasonicSensor = ev3_ultrasonicSensor();

const wheel_r = 2.6;
const half_track_width = 6; // half dist btwn centrelines of wheels

const gear_ratio = 1;

const v_default = 20;
const turnrate_default = 30;
const stop_behaviour_default = "coast";

// Blank variables
let ultrasonic_dist = 0;
let total_time = 0;
let stdout = ""; // yes I know stdout is not really correct, but it's "convenient"

// Utils
function convert_to_motor_speed(v) {
    return 180 * v / math_PI / wheel_r * gear_ratio;
}

function console_log_timed(msg) {
    stdout = "T:" + stringify(total_time) + "s - " + msg;
    return display(stdout);
}

function console_log(msg) {
    stdout = msg;
    return display(stdout);
}

function pause(t) {
    total_time = total_time + t / 1000;
    ev3_pause(t);
}

// Movement
function init_motor_defaults() {
    // Initialises default motor speed and stop action. 
    const motor_speed = convert_to_motor_speed(v_default);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);
    
    ev3_motorSetStopAction(motorL, stop_behaviour_default);
    ev3_motorSetStopAction(motorR, stop_behaviour_default);
}

function move_distance_and_stop(v, x) {
    // Moves a distance x cm at a speed v cm/s.
    const motor_speed = convert_to_motor_speed(v);
    const run_time = math_abs(180 * x / math_PI / motor_speed / wheel_r * 1000);
    
    ev3_runForTime(motorL, run_time, motor_speed);
    ev3_runForTime(motorR, run_time, motor_speed);
    pause(run_time);
}

function move_distance_default(x) {
    // Moves a distance x cm at a the default speed. 
    move_distance_and_stop(v_default, x);
}

function start_motors() {
    // Starts both motors. Convenience function. 
    ev3_motorStart(motorL);
    ev3_motorStart(motorR);
}

function move(v) {
    // Begins movement at a speed v cm/s.
    const motor_speed = convert_to_motor_speed(v);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);

    start_motors();
}

function brake() {
    // Stops both motors with the "brake" stop action.
    // stopAction reverts back to default. 
    ev3_motorSetStopAction(motorL, "brake");
    ev3_motorSetStopAction(motorR, "brake");
    
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
    
    ev3_motorSetStopAction(motorL, stop_behaviour_default);
    ev3_motorSetStopAction(motorR, stop_behaviour_default);
}

function neutral_turn(direction) {
    // Begins a neutral turn (both wheels spinning in opposite directions)
    // at the default turn rate in the specified direction. 
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    
    if (direction === "left") {
        ev3_motorSetSpeed(motorL, motor_speed);
        ev3_motorSetSpeed(motorR, -motor_speed);
    } else {
        ev3_motorSetSpeed(motorL, -motor_speed);
        ev3_motorSetSpeed(motorR, motor_speed);
    }
    start_motors();
}

function neutral_turn_to_angle(direction, angle) {
    // Conducts a neutral turn (both wheels spinning in opposite directions)
    // at the default turn rate to the specified angle in the specified direction. 
    const angle_adjust_factor = 1;
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    const run_time = (math_PI * half_track_width * theta / 180 / v_linear * 1000) 
                        * angle_adjust_factor ;
    
    if (direction === "left") {
        ev3_runForTime(motorL, run_time, motor_speed);
        ev3_runForTime(motorR, run_time, -motor_speed);
    } else {
        ev3_runForTime(motorL, run_time, -motor_speed);
        ev3_runForTime(motorR, run_time, motor_speed);
    }
    pause(run_time);
}

// Misc
function check_dist_and_log() {
    // Updates, logs, and returns the current value of the distance
    // in front of the ultrasonic sensor in cm. 
    ultrasonic_dist = ev3_ultrasonicSensorDistance(ultrasonicSensor);
    console_log("[Ultrasonic: " + stringify(ultrasonic_dist) + " cm]");
    
    return ultrasonic_dist;
}