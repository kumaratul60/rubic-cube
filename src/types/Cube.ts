export type Color = 'W' | 'Y' | 'R' | 'O' | 'G' | 'B';
export type Face = Color[]; // 3x3 = 9 elements
export interface CubeState {
    U: Face; D: Face;
    F: Face; B: Face;
    L: Face; R: Face;
}
