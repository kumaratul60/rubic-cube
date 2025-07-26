import { cn } from "@lib/cn";
import { FACE_COLORS } from "@utils/cubeFaceColors";
import { transformCubeFace } from "@utils/transformCubeFace";

const faceOrder = ["F", "B", "U", "D", "L", "R"];

const Cubelet = ({ x, y, z }: { x: number; y: number; z: number }) => {
  const size = 60; // px per cubelet
  const transform = `translate3d(${x * size}px, ${y * size}px, ${z * size}px)`;

  return (
    <div className="absolute w-[60px] h-[60px] [transform-style:preserve-3d]" style={{ transform }}>
      {faceOrder.map((face) => (
        <div
          key={face}
          className={cn(
            "absolute w-full h-full border border-black opacity-90",
            FACE_COLORS[face as keyof typeof FACE_COLORS]
          )}
          style={transformCubeFace(face)}
        />
      ))}
    </div>
  );
};

export default Cubelet;
