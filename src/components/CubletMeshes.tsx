import type { CubeletState } from "@hooks/useRubiksCube";
import React from "react";
import * as THREE from "three";
import Cubelet from "./Cubelet";

interface CubletMeshesProps {
  cubeState: CubeletState[];
  onCubeletClick: (mesh: THREE.Object3D, materialIndex: number) => void;
}

const CubletMeshes = React.forwardRef<THREE.Group, CubletMeshesProps>(
  ({ cubeState, onCubeletClick }, ref) => {
    return (
      <group ref={ref} position={[0, -0.5, 0]}>
        {cubeState.map((c) => (
          <Cubelet key={c.id} cubeletState={c} onClick={onCubeletClick} />
        ))}
      </group>
    );
  }
);

export default CubletMeshes;
