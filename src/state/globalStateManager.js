export const statePropsEnum = {
  playerHp: "playerHp",
  isDoubleJumpUnlocked: "isDoubleJumpUnlocked",
  playerInBossFight: "playerInBossFight",
  isBossDefeated: "isBossDefeated",
  cameraLockedY: "cameraLockedY",
};

function initStateManager() {
  const state = {
    playerHp: 3,
    maxPlayerHp: 3,
    isDoubleJumpUnlocked: false,
    playerInBossFight: false,
    isBossDefeated: false,
    cameraLockedY: false,
  };

  return {
    current() {
      return { ...state };
    },
    set(property, value) {
      state[property] = value;
    },
  };
}

export const state = initStateManager();
