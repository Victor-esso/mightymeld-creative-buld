import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

import { TbClockFilled } from "react-icons/tb";
import { BiReset } from "react-icons/bi";
import { HiSun } from "react-icons/hi";
import { PiMoonStarsFill } from "react-icons/pi";
import { BiSolidHome } from "react-icons/bi";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BiSolidCog } from "react-icons/bi";

import Logo from "./assets/Logo.svg";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <div className="fit-parent relative">
      <button className="bg-indigo-g-600 rounded-full p-1 inflate absolute right-[1rem] top-[1rem] text-white">
        <BiSolidCog size={24} />
      </button>
      <div className="abs-x-center flex items-center w-max gap-3 top-[15%]">
        <img src={Logo} />
        <h1 className="text-[53px] font-extrabold text-[#263238] mt-7 tracking-[-3px]">
          Memory
        </h1>
      </div>

      <p className="text-[.75rem] w-max text-center font-medium mt-6 absolute abs-x-center bottom-[2rem]  text-lg text-indigo-600">
        Flip over tiles looking for pairs
      </p>
      <button
        onClick={start}
        className="bg-indigo-g-600 text-white w-20 h-20 rounded-full grid place-items-center abs-center"
      >
        <TbPlayerPlayFilled size={45} />
      </button>
    </div>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div className="fit-parent flex flex-col">
        <div className="bg-indigo-g-300 relative shrink-0">
          <div className="h-[72px] mx-auto relative container">
            <div className="bg-indigo-g-500 absolute abs-x-center rounded-b-[40px] shadow-[inset_0_-10px_9px_0_rgba(255,255,255,0.11),0_17px_29px_-8px_rgba(157,158,248,0.7),0_26px_19px_-20px_rgba(255,255,255,1)]">
              <div className="aspect-square w-[100px] relative">
                <p className="w-fit text-white text-lg font-bold uppercase abs-x-center top-[10px] drop-shadow-[0_2px_0px_rgba(0,0,0,0.13)]">
                  Tries
                </p>
                <span className="text-white font-bold uppercase abs-x-center bottom-[10px] drop-shadow-[0_3px_0_rgba(0,0,0,0.13)] w-max text-6xl">
                  {tryCount}
                </span>
              </div>
            </div>
            <div className="fit-parent flex justify-between items-center px-5">
              <div className="relative">
                <div className="flex justify-end items-center pr-[10px] pl-[42px] h-[30px] bg-indigo-g-300 rounded-full relative shadow-[inset_-1px_0_23px_0_theme(colors.indigo.600)] relative">
                  <span className="text-white w-fit text-lg font-bold uppercase drop-shadow-[0_2px_0px_rgba(0,0,0,0.13)]">
                    :00
                  </span>
                </div>

                <div className="w-fit h-fit abs-y-center bg-indigo-g-400 p-[2px] rounded-full drop-shadow-[0_3px_4px_rgba(0,0,0,0.3)]">
                  <div className="aspect-square w-[35px] bg-indigo-g-500 rounded-full grid place-items-center text-indigo-100">
                    <TbClockFilled size={25} />
                  </div>
                </div>
              </div>

              <div className="w-fit text-white text-lg font-bold uppercase drop-shadow-[0_2px_0px_rgba(0,0,0,0.13)]">
                Level 1
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full grid place-items-center">
          <div className="bg-indigo-50 w-fit h-fit rounded-xl grid grid-cols-4 gap-4 p-4 mx-auto *:w-16 *:h-16 *:p-2 *:rounded-lg *:grid *:place-items-center">
            {getTiles(16).map((tile, i) => (
              <Tile key={i} flip={() => flip(i)} {...tile} />
            ))}
          </div>
        </div>
        <div className="h-[72px] bg-indigo-g-300 relative shrink-0">
          <div className="container h-full flex justify-between items-center px-3">
            <button className="overflow-hidden rounded-full bg-indigo-g-300 px-[1px] w-fit h-fit">
              <div className="w-[80px] h-[40px] bg-indigo-g-300 rounded-full relative shadow-[inset_1px_3px_23px_0px_theme(colors.indigo.600)] *:w-[30px] *:aspect-square *:absolute *:rounded-full *:grid *:place-items-center *:abs-y-center">
                <div className="left-[5px] bg-indigo-g-300 p-[1px] shadow-xl">
                  <div className="bg-indigo-g-500 rounded-full fit-parent"></div>
                </div>
                <div className="left-[5px] text-white">
                  <HiSun size={22} />
                </div>

                <div className="right-[5px] text-[#6466e9]">
                  <PiMoonStarsFill size={18} />
                </div>
              </div>
            </button>
            <button className="bg-indigo-g-500 text-white aspect-square w-[80px] grid place-items-center rounded-full top-[-30px] absolute abs-x-center shadow-xl">
              <span className="font-extrabold">
                <BiReset size={60} className="text-indigo-50" />
              </span>
            </button>

            <button className="bg-indigo-g-300 text-white shadow-[inset_-1px_0px_10px_0px_theme(colors.indigo.600)] text-white px-4 py-2 rounded-lg">
              <BiSolidHome size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
