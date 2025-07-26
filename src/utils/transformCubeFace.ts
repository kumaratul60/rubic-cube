export const transformCubeFace = (face: string) => {
    const distance = 30; // half of cubelet size
    switch (face) {
        case "F":
            return { transform: `rotateY(0deg) translateZ(${distance}px)` };
        case "B":
            return { transform: `rotateY(180deg) translateZ(${distance}px)` };
        case "U":
            return { transform: `rotateX(90deg) translateZ(${distance}px)` };
        case "D":
            return { transform: `rotateX(-90deg) translateZ(${distance}px)` };
        case "L":
            return { transform: `rotateY(-90deg) translateZ(${distance}px)` };
        case "R":
            return { transform: `rotateY(90deg) translateZ(${distance}px)` };
        default:
            return {};
    }
}