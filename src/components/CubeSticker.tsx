import { COLORS } from "@utils/CubeColors";
import React from "react";

interface StickerProps {
    cubeletPosition: [number, number, number];
  face: "front" | "back" | "top" | "bottom" | "left" | "right";
}

const Sticker: React.FC<StickerProps> = ({ cubeletPosition, face }) => {
  // A sticker is only visible if its cubelet is on an outer layer for that face.
  const isVisible =
    (face === "front" && cubeletPosition[2] === 1) ||
    (face === "back" && cubeletPosition[2] === -1) ||
    (face === "right" && cubeletPosition[0] === 1) ||
    (face === "left" && cubeletPosition[0] === -1) ||
    (face === "top" && cubeletPosition[1] === 1) ||
    (face === "bottom" && cubeletPosition[1] === -1);

  if (!isVisible) {
    return null; // Don't render the sticker if it's not on an outer face
  }

  // Determine sticker properties based on the face
  const config = {
    front: { position: [0, 0, 0.476], rotation: [0, 0, 0], color: COLORS.red },
    back: { position: [0, 0, -0.476], rotation: [0, Math.PI, 0], color: COLORS.orange },
    right: { position: [0.476, 0, 0], rotation: [0, Math.PI / 2, 0], color: COLORS.green },
    left: { position: [-0.476, 0, 0], rotation: [0, -Math.PI / 2, 0], color: COLORS.blue },
    top: { position: [0, 0.476, 0], rotation: [-Math.PI / 2, 0, 0], color: COLORS.white },
    bottom: { position: [0, -0.476, 0], rotation: [Math.PI / 2, 0, 0], color: COLORS.yellow },
  }[face];

  return (
    <mesh
      position={config.position as [number, number, number]}
      rotation={config.rotation as [number, number, number]}
    >
      <planeGeometry args={[0.85, 0.85]} />
      <meshStandardMaterial color={config.color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
};

export default Sticker;
