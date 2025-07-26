import type { CubeState } from "@cube-types/Cube";

export const getInitialCube = (): CubeState => ({
  U: Array(9).fill("W"),
  D: Array(9).fill("Y"),
  F: Array(9).fill("G"),
  B: Array(9).fill("B"),
  L: Array(9).fill("O"),
  R: Array(9).fill("R"),
});
