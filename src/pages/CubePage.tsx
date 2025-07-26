import CubeScene from "@components/CubeScene";
import { useRubiksCube } from "@hooks/useRubiksCube";
import { cn } from "@lib/cn";
import { useRef } from "react";
import * as THREE from "three";

export default function CubePage() {
  const cubeRef = useRef<THREE.Group>(null!);
  const { cubeState, handleFaceRotation, solveCube, shuffleCube, isRotating } =
    useRubiksCube(cubeRef);

  return (
    <main
      className={cn("relative w-full h-screen flex flex-col items-center justify-center gap-8 p-4")}
      style={{
        background: "radial-gradient(circle, rgba(55, 65, 81, 1) 0%, rgba(17, 24, 39, 1) 100%)",
      }}
    >
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={solveCube}
          disabled={isRotating}
          className={cn(
            "px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          )}
        >
          Solve
        </button>
        <button
          onClick={shuffleCube}
          disabled={isRotating}
          className={cn(
            "px-5 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          )}
        >
          Reset
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">
          Interactive 3D Cube
        </h1>
        <p className="text-white/70 mt-2 font-mono text-sm">
          Drag to Rotate. Click a Face to Turn.
        </p>
      </div>

      <div className="w-full max-w-[500px] h-[400px] cursor-grab active:cursor-grabbing">
        <CubeScene cubeRef={cubeRef} cubeState={cubeState} onCubeletClick={handleFaceRotation} />
      </div>
    </main>
  );
}
