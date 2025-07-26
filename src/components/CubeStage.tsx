import { generateCubelets } from "@utils/generateCubelets";
import { useState } from "react";
import Cubelet from "./Cubelet";

function CubeStage() {
  const cubelets = generateCubelets(2);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const rotateCube = (axis: "x" | "y", dir: 1 | -1) => {
    const delta = 90 * dir;
    setRotation((prev) => ({ ...prev, [axis]: prev[axis] + delta }));
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <div
        className="relative [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          width: "120px",
          height: "120px",
        }}
      >
        {cubelets.map((c) => (
          <Cubelet key={c.id} {...c} />
        ))}
      </div>

      <div className="flex gap-4">
        <button onClick={() => rotateCube("y", -1)} className="px-2 py-1 bg-gray-200">
          ⬅️ Left
        </button>
        <button onClick={() => rotateCube("y", 1)} className="px-2 py-1 bg-gray-200">
          ➡️ Right
        </button>
        <button onClick={() => rotateCube("x", -1)} className="px-2 py-1 bg-gray-200">
          🔼 Up
        </button>
        <button onClick={() => rotateCube("x", 1)} className="px-2 py-1 bg-gray-200">
          🔽 Down
        </button>
      </div>
    </div>
  );
}

export default CubeStage;
