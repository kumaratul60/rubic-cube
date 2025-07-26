import { gsap } from "gsap";

export const animateCrossMove = (
  faceRef: React.RefObject<HTMLDivElement>,
  direction: "cw" | "ccw"
) => {
  if (!faceRef.current) return;
  gsap.to(faceRef.current, {
    rotateY: direction === "cw" ? "+=90" : "-=90",
    duration: 0.5,
    ease: "power2.out",
  });
};
