// Q1
function make_withdraw(balance, acc_password) {
    // much secure
    // const acc_password = password;
    let remaining_incorrect_tries = 3;
    
    function withdraw(amount, password) {
        if (remaining_incorrect_tries <= 0) {
            return "Account disabled";
        } else if (acc_password !== password) {
            remaining_incorrect_tries = remaining_incorrect_tries - 1;
            return "Wrong password; no withdraw";
        } else if (balance < amount) {
            remaining_incorrect_tries = 3; // here as well yes
            return "Insufficient funds";
        } else {
            remaining_incorrect_tries = 3; // ???? - yes
            balance = balance - amount;
            return balance;
        }
    }
    return withdraw;
}

const acc = make_withdraw(100, "my_password");
acc(30, "his_passcode"); // returns "Wrong password; no withdraw"
acc(30, "my_password"); // returns 70
acc(10, "sesame"); // returns "Wrong password; no withdraw"
acc(15, "canola"); // returns "Wrong password; no withdraw"
acc(25, "olive"); // returns "Wrong password; no withdraw"
acc(30, "my_password"); // returns "Account disabled"
acc(30, "his_passcode"); // returns "Account disabled"

// Q2
// let commission = 25;
// function make_price_calculator(tax_rate) {
//     function calculator(cost) {
//         return (commission + cost) * (1 + tax_rate);
//     }
//     return calculator;
// }

// const calc = make_price_calculator(0.07);
// commission = 125;
// calc(75);

// Q3
// function curry(f) {
//     return x => y => f(x, y);
// }

// (curry(math_pow))(3)(4);