import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";

async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", (previousSceneData) => {
    room1(k, room1Data, previousSceneData);
  });
  k.scene("room2", (previousSceneData) => {
    room2(k, room2Data, previousSceneData);
  });

  k.scene("final-exit", () => {
    setBackgroundColor(k, "#0B0327");
    k.add(
      makeNotificationBox(
        k,
        "You escaped the factory!\n The End. Thanks for playing!"
      )
    );
  });
}

k.scene("intro", () => {
  setBackgroundColor(k, "#0B0327");
  makeNotificationBox(
    k,
    "USE ARROW KEYS TO MOVE,\nX TO JUMP, Z TO ATTACK.\nPRESS ENTER TO START!"
  );
  k.onKeyPress("enter", () => {
    const context = new AudioContext();
    context.resume();
    k.go("room1", { exitName: null });
  });
});


k.go("intro");

main();
