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
const distance_ratio = 1;

let verbose = true;
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
    // t is in ms.
    total_time = total_time + t / 1000;
    ev3_pause(t);
}

function verbose_log(msg) {
    return verbose ? console_log(msg) : msg;
}

// Movement
function init_motor_defaults() {
    // Initialises default motor speed and stop action. 
    verbose_log("Initialising motor defaults: V=" + stringify(v_default) + " cm/s, stop_behaviour="+stop_behaviour_default);
    const motor_speed = convert_to_motor_speed(v_default);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);
    
    ev3_motorSetStopAction(motorL, stop_behaviour_default);
    ev3_motorSetStopAction(motorR, stop_behaviour_default);
}

function move_distance_and_stop(v, x) {
    // Moves a distance x cm at a speed v cm/s.
    verbose_log("Moving distance " + stringify(x) + "cm at a speed " + stringify(v));
    const motor_speed = convert_to_motor_speed(v);
    const run_time = math_abs(180 * x / math_PI / motor_speed / wheel_r * 1000);
    
    ev3_runForTime(motorL, run_time, motor_speed);
    ev3_runForTime(motorR, run_time, motor_speed);
    pause(run_time);
}

function move_distance_default(x) {
    // Moves a distance x cm at a the default speed. 
    verbose_log("Moving distance " + stringify(x) + "cm");
    move_distance_and_stop(v_default, x);
}

function start_motors() {
    // Starts both motors. Convenience function. 
    verbose_log("Starting both motors.");
    ev3_motorStart(motorL);
    ev3_motorStart(motorR);
}

function stop_motors() {
    // Stops both motors. Convenience function. 
    verbose_log("Stopping both motors.");
    ev3_motorStart(motorL);
    ev3_motorStart(motorR);
}

function move(v) {
    // Begins movement at a speed v cm/s.
    verbose_log("Starting movement at " + stringify(v) + "cm/s");
    const motor_speed = convert_to_motor_speed(v);
    ev3_motorSetSpeed(motorL, motor_speed);
    ev3_motorSetSpeed(motorR, motor_speed);

    start_motors();
}

function brake() {
    // Stops both motors with the "brake" stop action.
    // stopAction reverts back to default. 
    verbose_log("Braking.");
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
    verbose_log("Starting neutral turn to the " + direction);
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
    verbose_log("Starting neutral turn at" + stringify(angle) + "°/s to the " + direction);
    const angle_adjust_factor = 1;
    const v_linear = math_PI / 180 * half_track_width * turnrate_default;
    const motor_speed = convert_to_motor_speed(v_linear);
    const run_time = (math_PI * half_track_width * angle / 180 / v_linear * 1000) 
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
    ultrasonic_dist = distance_ratio * ev3_ultrasonicSensorDistance(ultrasonicSensor);
    console_log("[Ultrasonic: " + stringify(ultrasonic_dist) + " cm]");
    
    return ultrasonic_dist;
}

// __________________________________________________________________________________________________________________________________________
// Main robot code!
// 

/*
   ___  _   _ ___ ___ _____ ___ ___  _  _   ___ 
  / _ \| | | | __/ __|_   _|_ _/ _ \| \| | |_  )
 | (_) | |_| | _|\__ \ | |  | | (_) | .` |  / / 
  \__\_\\___/|___|___/ |_| |___\___/|_|\_| /___|
                                                
*/
function question2() {
    init_motor_defaults();
    move(v_default);
    
    while (check_dist_and_log() <= 10) {
        pause(10); // check every 10 ms????
    }
    
    brake();
    console_log_timed("Reached 10 cm from obstacle. Reversing...")
    move_distance_and_stop(-v_default, 30);
}

question2();

/*
   ___  _   _ ___ ___ _____ ___ ___  _  _   ____
  / _ \| | | | __/ __|_   _|_ _/ _ \| \| | |__ /
 | (_) | |_| | _|\__ \ | |  | | (_) | .` |  |_ \
  \__\_\\___/|___|___/ |_| |___\___/|_|\_| |___/
                                    
*/
const min_distance = 15;

const delta_threshold_ratio = 2;
const overshoot_distance = 15;

// ms
const distance_sample_period = 50;

function collision_avoidance() {
    const directions = list("left", "right");
    const turn_direction = list_ref(directions, math_round(math_random()));
    const opp_turn_direction = head(remove(turn_direction, directions));
    
    let turn_angle = 0;
    let forward_distance_deltas = pair(min_distance, min_distance);
    let corner_distance = 0;
    
    function check_distances() {
        // corner detection
        const d_0 = head(forward_distance_deltas);
        const d_1 = tail(forward_distance_deltas);
        
        if (d_0 <= delta_threshold_ratio * d_1) {
            set_head(forward_distance_deltas, d_1);
            set_tail(forward_distance_deltas, check_dist_and_log);
            return false;
        } else {
            corner_distance = d_0;
            return true;
        }
    }
    
    console_log("Obstacle detected. Turning " + turn_direction);
    neutral_turn(turn_direction);
    
    while (!check_distances()) {
        turn_angle = turn_angle
                    + turnrate_default * distance_sample_period / 1000;
        pause(distance_sample_period);
    }
    
    const a = min_distance;
    const b = corner_distance;
    const parallel_dist_to_corner = math_sqrt(a * a + b * b - 2 * a * b * math_cos(turn_angle));
    const additional_turn_angle = math_asin(a * math_sin(turn_angle) / parallel_dist_to_corner);
    
    verbose_log("Target corner detected " + stringify(b) + " cm away at " + stringify(b) + "°");
    verbose_log("Continuing to turn " + stringify(additional_turn_angle) + "° then move " + stringify(parallel_dist_to_corner) + "cm");
    verbose = false;
    
    stop_motors();
    neutral_turn_to_angle(turn_direction, additional_turn_angle);
    move_distance_default(parallel_dist_to_corner + overshoot_distance);
    
    verbose = true;
    
    neutral_turn_to_angle(opp_turn_direction, additional_turn_angle + turn_angle);
    verbose_log("Collision avoidance maneuver complete.");
}

function question3() {
    init_motor_defaults();
    move(v_default);
    
    while (check_dist_and_log() <= 10) {
        pause(distance_sample_period);
    }
    
    collision_avoidance();
    move_distance_default(15);
}

function question3_inf() {
    init_motor_defaults();
    move(v_default);
    
    while (true) {
        if (check_dist_and_log() <= 10) {
            pause(distance_sample_period);
        } else {
            collision_avoidance();
            move(v_default);
        }
    }
}

question3();
