
export const generateCubelets = (size: number) => {
    const cubelets = [];
    for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                cubelets.push({ id: `${x}-${y}-${z}`, x, y, z });
            }
        }
    }
    return cubelets;
};