import type { CubeletState } from "@hooks/useRubiksCube";
import { RoundedBox } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import Sticker from "./CubeSticker";

interface CubeletProps {
  cubeletState: CubeletState;
  onClick: (mesh: THREE.Object3D, faceNormal: THREE.Vector3) => void;
}

const Cubelet: React.FC<CubeletProps> = ({ cubeletState, onClick }) => {
  const { position, rotation, id } = cubeletState;

  return (
    <mesh
      userData={{ id }}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (e.face && e.object) {
          // We need to pass the parent mesh, not the sticker plane
          onClick(e.object.parent as THREE.Object3D, e.face.normal);
        }
      }}
    >
      <RoundedBox args={[0.95, 0.95, 0.95]} radius={0.05}>
        <meshStandardMaterial color="#202020" metalness={0.1} roughness={0.1} />
      </RoundedBox>

      <Sticker cubeletPosition={position.toArray()} face="front" />
      <Sticker cubeletPosition={position.toArray()} face="back" />
      <Sticker cubeletPosition={position.toArray()} face="right" />
      <Sticker cubeletPosition={position.toArray()} face="left" />
      <Sticker cubeletPosition={position.toArray()} face="top" />
      <Sticker cubeletPosition={position.toArray()} face="bottom" />
    </mesh>
  );
};

export default Cubelet;
