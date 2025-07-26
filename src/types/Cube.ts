export type Color = 'W' | 'Y' | 'R' | 'O' | 'G' | 'B'; // white, yellow, red, orange, green, blue

// A Face is an NxN 2D grid of Color stickers
export type Face = Color[][];

// Named faces — directions of the cube
export type FaceKey = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';

// A full cube state with labeled face keys
export type CubeState = Record<FaceKey, Face>;

// Alternate structure if you want raw data: Cube[face][row][col]
// But it loses named-face info — use only internally
export type Cube = Color[][][];

// Valid moves (90° clockwise / counter-clockwise)
export type Move =
    | 'U' | "U'"
    | 'D' | "D'"
    | 'F' | "F'"
    | 'B' | "B'"
    | 'L' | "L'"
    | 'R' | "R'";
