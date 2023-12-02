// Q1
// Your program here.
ev3_speak("Hello World!");

// Q2
// Your program here.

ev3_runForTime(ev3_motorA(), 1000, 175);
ev3_runForTime(ev3_motorB(), 1000, 175);
ev3_pause(1000);

// Q3
// Your program here.
function turn_90(direction) { 
    const runTime = 1778; 
    const ang = 108; 
     
    if (direction === "left") { 
        ev3_runForTime(ev3_motorA(), runTime, -ang); 
        ev3_runForTime(ev3_motorB(), runTime, ang); 
        ev3_pause(runTime); 
    } else if (direction === "right") { 
        ev3_runForTime(ev3_motorA(), runTime, ang); 
        ev3_runForTime(ev3_motorB(), runTime, -ang); 
        ev3_pause(runTime); 
    } else { 
         
    } 
}

turn_90("left");

// Q4
function turn_90(direction) { 
    const runTime = 1778; 
    const ang = 108; 
     
    if (direction === "left") { 
        ev3_runForTime(ev3_motorA(), runTime, -ang); 
        ev3_runForTime(ev3_motorB(), runTime, ang); 
        ev3_pause(runTime); 
    } else if (direction === "right") { 
        ev3_runForTime(ev3_motorA(), runTime, ang); 
        ev3_runForTime(ev3_motorB(), runTime, -ang); 
        ev3_pause(runTime); 
    } else { 
         
    } 
} 
 
function moveForward(dist) { 
    // speed = 10cm/s 
    const left_wheel = ev3_motorA(); 
    const right_wheel = ev3_motorB(); 
    const time = 100 * dist 
     
    // Every 1000ms is 10cm. 
    ev3_runForTime(left_wheel, time, 175); 
    ev3_runForTime(right_wheel, time, 175); 
    ev3_pause(time);     
} 
 
// Sequence 
moveForward(10); 
turn_90("left"); 
moveForward(5); 
turn_90("right"); 
moveForward(15);