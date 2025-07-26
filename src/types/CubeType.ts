type Face = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';

interface Cubelet {
    id: string;
    faceColors: Partial<Record<Face, string>>;
}

type CubeState = Cubelet[][];

