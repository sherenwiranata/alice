import { makeBoss } from "../entities/enemyBoss.js";
import { makeDrone } from "../entities/enemyDrone.js";
import { makeCartridge } from "../entities/healthCartridge.js";
import { makePlayer } from "../entities/player.js";
import { state } from "../state/globalStateManager.js";
import { healthBar } from "../ui/healthBar.js";

import {
  setMapColliders,
  setBackgroundColor,
  setCameraControls,
  setCameraZones,
  setExitZones,
} from "./roomUtils.js";

export async function room1(
  k,
  roomData,
  previousSceneData = { exitName: null }
) {
  setBackgroundColor(k, "#a2aed5");
  k.camScale(0.5);
  k.camPos(170, 100);
  k.setGravity(600);

  const roomLayers = roomData.layers;
  console.log("roomLayers:", roomLayers);

  const map = k.add([k.pos(0, 0)]);

for (let y = 0; y < 4; y++) {
  for (let x = 0; x < 4; x++) {
    map.add([
      k.sprite(`room1_${y}_${x}`),
      k.pos(x * 1600, y * 1600),
      k.z(-10), // draw behind everything
    ]);
  }
}


const colliderLayer = roomLayers.find(layer => layer.name === "colliders");

if (!colliderLayer || !colliderLayer.objects) {
  console.warn("Collider layer missing or invalid.");
} else {
  setMapColliders(k, map, colliderLayer.objects);
}

/********* player position */
const player = map.add(makePlayer(k));
player.pos = k.vec2(1266, 676); // EXACT match to green box
player.setControls?.();
player.enablePassthrough?.();
player.setEvents?.();

  /********* vignette ***********/

  const vignette = k.add([
    k.sprite("vignette"),
    k.fixed(),
    k.scale(1), // or 2.5 depending on your desired size
    k.z(1000),
    k.opacity(0.85),
    {
      update() {
        const playerScreenPos = k.toScreen(player.pos);
        const scaledWidth = this.width * this.scale.x;
        const scaledHeight = this.height * this.scale.y;
        this.pos = playerScreenPos.sub(scaledWidth / 2, scaledHeight / 2);
      },
    },
  ]);
  

  setCameraControls(k, player, map, roomData);

  const positions = roomLayers[5].objects;
  for (const position of positions) {
    if (position.name === "player" && !previousSceneData.exitName) {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.enablePassthrough();
      player.setEvents();
      player.respawnIfOutOfBounds(1000, "room1");
      continue;
    }

    if (
      position.name === "entrance-1" &&
      previousSceneData.exitName === "exit-1"
    ) {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.enablePassthrough();
      player.setEvents();
      player.respawnIfOutOfBounds(1000, "room1");
      k.camPos(player.pos);
      continue;
    }

    if (
      position.name === "entrance-2" &&
      previousSceneData.exitName === "exit-2"
    ) {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.enablePassthrough();
      player.setEvents();
      player.respawnIfOutOfBounds(1000, "room1");
      k.camPos(player.pos);
      continue;
    }

    if (position.type === "drone") {
      const drone = map.add(makeDrone(k, k.vec2(position.x, position.y)));
      drone.setBehavior();
      drone.setEvents();
      continue;
    }

    if (position.name === "boss" && !state.current().isBossDefeated) {
      const boss = map.add(makeBoss(k, k.vec2(position.x, position.y)));
      boss.setBehavior();
      boss.setEvents();
    }

    if (position.type === "cartridge") {
      map.add(makeCartridge(k, k.vec2(position.x, position.y)));
    }
  }

  const cameras = roomLayers[6].objects;

  setCameraZones(k, map, cameras, player);

  const exits = roomLayers[7].objects;
  setExitZones(k, map, exits, "room2");

  healthBar.setEvents();
  healthBar.trigger("update");
  k.add(healthBar);
}


