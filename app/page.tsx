"use client";
import { useState } from "react";

export default function Home() {
  const repoName = "/skyblock_archfiend_dice";
  const [money, setMoney] = useState(100_000_000);
  const [rolling, setRolling] = useState(false);
  const [result2, setResult2] = useState("?");
  const playSoundNormal = () => {
    const normal = new Audio('${repoName}//dice_sound_normal.m4a');
    normal.volume = 0.5;
    normal.play();
  };
  const playSoundWin = () => {
    const win = new Audio('${repoName}//dice_sound_win.m4a');
    win.volume = 0.5;
    win.play();
  };

  return (
    <main>
      <h1>Archfiend Dice Simulator</h1>
      <div className="money">{money.toLocaleString()} coins</div>
      <h2>You rolled {result2}</h2>
      <img src={`${repoName}/dice.webp`} alt="dice" width={150} className="dice" />
      <button
        className="roll-button"
        disabled={rolling}
        onClick={() => {
          if (money < 6_600_000) {
            alert("Not enough money to roll the dice!");
            return;
          }

          setRolling(true);

          const result = rollDice();
          setResult2("?");
          if ([1, 2, 3, 4, 5].includes(result)) {
            playSoundNormal();
          }
          if ([6, 7].includes(result)) {
            playSoundWin();
          }
          setTimeout(() => {
            setResult2(result.toLocaleString());
            setMoney((prev) => prev - 6_600_000);

            if (result === 6) {
              setMoney((prev) => prev + 100_000_000);
            }

            if (result === 7) {
              alert(
                "Congratulations! You rolled a 7 and won an Archfiend Dye! You can sell it for 37 million coins",
              );
            }

            setRolling(false);
          }, 2500);
        }}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      
            <button
        className="roll-button"
        disabled={rolling}
        onClick={() => {
          if (money < 66_000_000) {
            alert("Not enough money to roll 10 dices!");
            return;
          }
          setRolling(true);
          for (let i=0;i<10;i++){

          const result = rollDice();
            setResult2(result.toLocaleString());
            setMoney((prev) => prev - 6_600_000);

            if (result === 6) {
              setMoney((prev) => prev + 100_000_000);
            }

            if (result === 7) {
              alert(
                "Congratulations! You rolled a 7 and won an Archfiend Dye! You can sell it for 37 million coins",
              );
            }

            setRolling(false);
        }
        }}
      >
        {rolling ? "Rolling..." : "Roll x10(66M)"}
      </button>
    </main>
  );
}

function rollDice() {
  const rand = Math.random() * 100;

  if (rand < 18.72) return 1;
  if (rand < 37.44) return 2;
  if (rand < 56.16) return 3;
  if (rand < 74.88) return 4;
  if (rand < 93.6) return 5;
  if (rand < 99.84) return 6;
  return 7;
}
