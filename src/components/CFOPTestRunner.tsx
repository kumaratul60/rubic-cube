// import { scrambleCube } from "../utils/scrambler";
import { findWhiteEdges } from "@utils/findWhiteEdges";
import { getInitialCube } from "@utils/initializeCube";

export const CFOPTestRunner = () => {
  const cube = getInitialCube();
  //   const scramble = scrambleCube();
  // Apply scramble logic to mutate cube state

  const whiteEdges = findWhiteEdges(cube);

  return (
    <div className="p-4">
      <h2 className="text-xl">🧪 CFOP Test Mode</h2>
      <p className="mt-2">White Edges Detected: {whiteEdges.length}</p>
      <pre>{JSON.stringify(whiteEdges, null, 2)}</pre>
    </div>
  );
};
