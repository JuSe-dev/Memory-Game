"use strict";

const init_board = () => {
    
    // Intialize cards on gameboard
    for (let row = 0; row < 4; row++) {
        let card_row = document.createElement("div");
        card_row.setAttribute("class", "card_row");
        card_row.setAttribute("id", "row" + row.toString());

        for (let col = 0; col < 4; col++) {
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card_row.appendChild(card);
        }
        document.querySelector(".gameBoard").appendChild(card_row);
    }

    // Setting values/icons to cards
    set_card_values();
    press_functionality();
}


// Function for setting card values/icons
const set_card_values = () => {
    
    let all_cards = document.querySelectorAll(".card");
    let icons = ["&#9824", "&#9825", "&#9826", "&#9827", "&#9828", "&#9829", "&#9830", "&#9831"];
    // Double the array with same values
    icons = icons.concat(icons);

    // Shuffle order of the array values
    shuffle_array(icons);

    for (let i = 0; i < all_cards.length; i++) {

        let card_icon = document.createElement("span");
        card_icon.setAttribute("class", icons[i]);
        card_icon.innerHTML = icons[i];

        // This if-loop is just extra step, because "black" and "white" unicode icons are different size
        // So I have to make the white ones smaller
        if (icons[i] == "&#9825" || icons[i] == "&#9826" || icons[i] == "&#9828" || icons[i] == "&#9831") {
            card_icon.style.fontSize = "1.6rem";
        }
        else {
            card_icon.style.fontSize = "2rem";
        }

        all_cards[i].appendChild(card_icon);
        all_cards[i].setAttribute("id", icons[i].toString() + i.toString());
    }
}


// Function for shuffling array and returning result
const shuffle_array = (parameter_array) => {

    let array = parameter_array;

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


// Function to set press functionality
const press_functionality = () => {
    let cards = document.querySelectorAll(".card");
    let times_clicked = 0;
    let chosen_cards = [];
    let fails = 0;
    let score = 0;
    let founded_pairs = 0;

    // Go through all cards and for each set functionality
    cards.forEach((card) => {
        card.addEventListener("click", (e) => {
            let clicked = e.target;

            // Some styling
            // And poinetrEvent for disabling chosen cards
            clicked.style.pointerEvents = "none";
            clicked.style.backgroundColor = "gold";
            clicked.style.color = "black";
            clicked.firstChild.style.visibility = "visible";

            // If last pair to choose alert and some styling
            // And adding last score point
            if (times_clicked > 0 && founded_pairs === 7) {
                chosen_cards[0].style.backgroundColor = "green";
                clicked.style.backgroundColor = "green";
                setTimeout(() => {
                    alert("All pairs found!")
                }, 1000);

                score++;
            }

            // If clicked twice -> check if it's pair or not
            // Here thecheck function return boolean
            if (times_clicked === 2) {

                let check_cards = check(chosen_cards);

                if (check_cards) {
                    score++;
                    founded_pairs += 1;
                }
                else {
                    fails++;
                }
                chosen_cards = [];
                times_clicked = 0;
            }

            chosen_cards.push(clicked);            
            set_fail(fails);
            set_score(score);
            times_clicked++;
        });
    });
}


// Function with parameter to check chosen pair and to make changes on element styles
// Also returns boolean, which is used function above
const check = (arr) => {
    let card1 = arr[0];
    let card2 = arr[1];
    let result = false;

    if (card1.firstChild.className === card2.firstChild.className) {
        card1.style.backgroundColor = "green";
        card2.style.backgroundColor = "green";
        result = true
    }
    else {
        card1.firstChild.style.visibility = "hidden";
        card2.firstChild.style.visibility = "hidden";

        card1.style.backgroundColor = "black";
        card2.style.backgroundColor = "black";

        card1.style.pointerEvents = "auto";
        card2.style.pointerEvents = "auto";
    }
    return result;
}


// Functions to display score/fails on index.html elements
const set_score = (nbr) => {
    document.getElementById("score").innerHTML = nbr;
}

const set_fail = (nbr) => {
    document.getElementById("failed").innerHTML = nbr;
}


// Initialize
init_board();

// Set new game
document.getElementById("btn").addEventListener("click", () => {
    document.querySelector(".gameBoard").innerHTML = "";
    document.getElementById("score").innerHTML = 0;
    document.getElementById("failed").innerHTML = 0;
    init_board();
});    



