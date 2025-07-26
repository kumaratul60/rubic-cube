import { useRubiksCube } from "@hooks/useRubiksCube";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import CubletMeshes from "./CubletMeshes";

const CubeScene = () => {
  const cubeRef = useRef<THREE.Group>(null!);
  const { cubeState, handleFaceRotation } = useRubiksCube(cubeRef);

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enablePan={false} enableZoom={false} />
      <CubletMeshes ref={cubeRef} cubeState={cubeState} onCubeletClick={handleFaceRotation} />
    </Canvas>
  );
};

export default CubeScene;
