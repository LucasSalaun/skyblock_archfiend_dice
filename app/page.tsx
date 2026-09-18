"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const repoName = "";

  // États pour l'écran d'accueil (remplace le prompt)
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [inputMoney, setInputMoney] = useState<string>("200000000");
  const [inputDice, setInputDice] = useState<string>("1");

  const [message, setMessage] = useState<string | null>(null);
  const [dye, setDye] = useState<number>(0);
  const [dice, setDice] = useState<number>(0);
  const [money, setMoney] = useState<number>(0);
  const [rolling, setRolling] = useState<boolean>(false);
  const [result2, setResult2] = useState<string>("?");

  if (!hasStarted) {
    return (
      <main
        style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1>Archfiend Dice Simulator</h1>
        <p className="money">How much money do you have?</p>
        <input
          type="number"
          className="buyDiceButton"
          value={inputMoney}
          onChange={(e) => setInputMoney(e.target.value)}
          autoComplete="off"
        />
        <br />
        <p className="money">
          How many dice do you want to buy at the start (33M each)?
        </p>
        <input
          type="number"
          value={inputDice}
          onChange={(e) => setInputDice(e.target.value)}
          className="buyDiceButton"
          autoComplete="off"
        />
        <br />
        <button
          className="roll-button"
          onClick={() => {
            let parsedMoney = parseInt(inputMoney, 10) || 200000000;
            let parsedDice = parseInt(inputDice, 10) || 1;

            if (parsedMoney < parsedDice * 33_000_000) {
              alert("Not enough money to buy that many dice!");
              return;
            }

            parsedMoney -= parsedDice * 33_000_000;
            setMoney(parsedMoney);
            setDice(parsedDice);
            setHasStarted(true);
          }}
        >
          Start Playing
        </button>
      </main>
    );
  }

  const playSoundNormal = () => {
    const normal = new Audio(`${repoName}/dice_sound_normal.m4a`);
    normal.volume = 0.5;
    normal.play();
  };

  const playSoundWin = () => {
    const win = new Audio(`${repoName}/dice_sound_win.m4a`);
    win.volume = 0.5;
    win.play();
  };

  return (
    <main>
      <h1>Archfiend Dice Simulator</h1>
      {message && (
        <div
          style={{
            padding: "15px 20px",
            border: "2px solid #ffaa00",
            marginBottom: "20px",
            background: "#1e1e1e",
            borderRadius: "8px",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            maxWidth: "600px",
            margin: "0 auto 20px auto",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
            {message}
          </p>
          <button
            onClick={() => setMessage(null)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff4757",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              marginLeft: "15px",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff6b81")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff4757")
            }
          >
            ✕ Fermer
          </button>
        </div>
      )}
      <div className="money">{money.toLocaleString()} coins</div>
      <div className="money">{dice} Archfiend Dice</div>
      <div className="money">{dye} Archfiend Dyes</div>
      <h2>You rolled {result2}</h2>
      <img
        src={`${repoName}/dice.webp`}
        alt="dice"
        width={150}
        className="dice"
      />
      <button
        className="roll-button"
        disabled={rolling}
        onClick={() => {
          if (money < 6_600_000 || dice < 1) {
            setMessage("Not enough money or dice to roll!");
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
            setMoney((prev: number) => prev - 6_600_000);

            if (result === 6) {
              setMoney((prev: number) => prev + 100_000_000);
              setDice((prev: number) => prev - 1);
            }

            if (result === 7) {
              setMessage(
                "Congratulations! You rolled a 7 and won an Archfiend Dye! You can sell it for 37 million coins",
              );
              setDice((prev: number) => prev - 1);
              setDye((prev: number) => prev + 1);
            }

            setRolling(false);
          }, 2000);
        }}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <button
        className="roll-button"
        disabled={rolling}
        onClick={() => {
          if (money < 66_000_000 || dice < 1) {
            setMessage("Not enough dice or money to roll 10 dices!");
            return;
          }

          setRolling(true);

          let sixes = 0;
          let sevens = 0;

          for (let i = 0; i < 10; i++) {
            const result = rollDice();
            if (result === 6) sixes++;
            if (result === 7) sevens++;
          }

          const diceLost = sixes + sevens;

          let diceDeficit = 0;
          if (diceLost > dice) {
            diceDeficit = diceLost - dice;
          }

          const expectedMoney =
            money - 66_000_000 + sixes * 100_000_000 - diceDeficit * 33_000_000;

          if (expectedMoney > money || sevens > 0) {
            playSoundWin();
          } else {
            playSoundNormal();
          }

          setTimeout(() => {
            setResult2("x10 ended");
            setMoney(expectedMoney);

            if (diceLost > 0) {
              setDice((prev: number) =>
                prev < diceLost ? 0 : prev - diceLost,
              );
            }

            if (sevens > 0) {
              setDye((prev: number) => prev + sevens);
              setMessage(
                `Congratulations! You rolled ${sevens}x 7 and won ${sevens} Archfiend Dye(s)!`,
              );
            }

            if (diceDeficit > 0) {
              setMessage(
                `You rolled more times than you had dice! ${diceDeficit} die(s) were automatically purchased for ${diceDeficit * 33}M.`,
              );
            }

            setRolling(false);
          }, 2000);
        }}
      >
        {rolling ? "Rolling..." : "Roll x10(66M)"}
      </button>
      <button
        className="buyDiceButton"
        disabled={rolling}
        onClick={() => {
          if (money < 33_000_000) {
            setMessage("Not enough money to buy a dice!");
            return;
          } else {
            setMoney((prev: number) => prev - 33_000_000);
            setDice((prev: number) => prev + 1);
          }
        }}
      >
        {rolling ? "Rolling..." : "Buy Dice (33M)"}
      </button>

      <button
        className="buyDiceButton"
        disabled={rolling}
        onClick={() => {
          if (dice < 1) {
            setMessage("Not enough dice to sell!");
            return;
          } else {
            setMoney((prev: number) => prev + 33_000_000);
            setDice((prev: number) => prev - 1);
          }
        }}
      >
        {rolling ? "Rolling..." : "Sell Dice (33M)"}
      </button>

      <button
        className="sellDyeButton"
        disabled={rolling}
        onClick={() => {
          if (dye < 1) {
            setMessage("Not enough Archfiend Dye to sell!");
            return;
          } else {
            setMoney((prev: number) => prev + 33_000_000);
            setDye((prev: number) => prev - 1);
          }
        }}
      >
        {rolling ? "Rolling..." : "Sell Archfiend Dye (33M)"}
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
