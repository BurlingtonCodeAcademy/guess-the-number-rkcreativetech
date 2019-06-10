const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let loNum = 0;
let hiNum = 100;
let yesOrNo = "n";
let numTries = 0;

start();

async function start() {
  console.log(
    "\nPlease think of a number between 1 and 100 (inclusive)\nand I will try to guess it.\n"
  );
  let secretNumber = await ask(
    "What is your secret number? I won't peek, I promise... "
  );
  console.log("\nOK, let's begin the game.\n");

  while (yesOrNo === "n") {
    guess = Math.floor((loNum + hiNum) / 2);
    numTries = numTries + 1;
    let yesOrNo = await ask("Is your number " + guess + "? (y/n) ");
    if (yesOrNo === "y") {
      console.log("\nYour number was " + guess + "!");
      console.log("The number of tries I needed was " + numTries + ".\n\n");
      process.exit();
    } else {
      let hiOrLo = await ask("Is your number higher (h) or lower (l)? ");
      if (hiOrLo === "h") {
        loNum = guess;
      } else {
        hiNum = guess;
      }
    }
  }
}
