import type { CubeletState } from "@hooks/useRubiksCube";
import { Circle, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CubletMeshes from "./CubletMeshes";

interface CubeSceneProps {
  cubeRef: React.RefObject<THREE.Group>;
  cubeState: CubeletState[];
  onCubeletClick: (mesh: THREE.Object3D, materialIndex: number) => void;
}

const CubeScene: React.FC<CubeSceneProps> = ({ cubeRef, cubeState, onCubeletClick }) => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 7], fov: 35 }}>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <ambientLight intensity={0.8} />
      <Environment preset="city" />
      <Circle args={[5]} rotation-x={-Math.PI / 2} position={[-0.5, -2, 0]} receiveShadow>
        <meshStandardMaterial color="#303030" roughness={1} />
      </Circle>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * (3 / 4)}
      />
      <CubletMeshes ref={cubeRef} cubeState={cubeState} onCubeletClick={onCubeletClick} />
    </Canvas>
  );
};

export default CubeScene;
