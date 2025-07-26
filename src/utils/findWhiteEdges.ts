import type { CubeState } from "@cube-types/Cube";

export const findWhiteEdges = (cube: CubeState): { face: keyof CubeState; index: number }[] => {
  const edges = [1, 3, 5, 7]; // edge indices on face
  const whiteEdges: { face: keyof CubeState; index: number }[] = [];

  (Object.keys(cube) as (keyof CubeState)[]).forEach((face) => {
    edges.forEach((index) => {
      if (cube[face][index] === "W") {
        whiteEdges.push({ face, index });
      }
    });
  });

  return whiteEdges;
};
