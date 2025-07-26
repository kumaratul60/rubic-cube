import type { CubeletState } from "@hooks/useRubiksCube";
import { RoundedBox } from "@react-three/drei";
import { COLORS } from "@utils/CubeColors";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

interface CubeletProps {
  cubeletState: CubeletState;
  onClick: (mesh: THREE.Object3D, materialIndex: number) => void;
}

const Cubelet: React.FC<CubeletProps> = ({ cubeletState, onClick }) => {
  const { position, rotation, id } = cubeletState;
  const meshRef = useRef<THREE.Mesh>(null!);

  const materials = useMemo(() => {
    const createMaterial = (color: string) => (
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.1} />
    );

    const blackColor = COLORS.black || "#202020";

    const materialArray = [
      createMaterial(position.x === 1 ? COLORS.green : blackColor),
      createMaterial(position.x === -1 ? COLORS.blue : blackColor),
      createMaterial(position.y === 1 ? COLORS.white : blackColor),
      createMaterial(position.y === -1 ? COLORS.yellow : blackColor),
      createMaterial(position.z === 1 ? COLORS.red : blackColor),
      createMaterial(position.z === -1 ? COLORS.orange : blackColor),
    ];

    return materialArray;
  }, [position.x, position.y, position.z]);

  return (
    <mesh
      ref={meshRef}
      userData={{ id }}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (e.face && typeof e.face.materialIndex === "number") {
          onClick(meshRef.current, e.face.materialIndex);
        }
      }}
    >
      <RoundedBox args={[0.95, 0.95, 0.95]} radius={0.05}>
        {materials}
      </RoundedBox>
    </mesh>
  );
};

export default Cubelet;
