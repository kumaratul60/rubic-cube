const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
export const scrambleCube = (count = 25): string[] =>
    Array.from({ length: count }, () => moves[Math.floor(Math.random() * 6)] + (Math.random() > 0.5 ? "'" : ""));