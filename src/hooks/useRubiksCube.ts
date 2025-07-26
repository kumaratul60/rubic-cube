import { gsap } from "gsap";
import { useCallback, useState } from "react";
import * as THREE from "three";

/**
 * Defines the state for a single cubelet, including its unique ID
 * and its current position and rotation in 3D space.
 */
export interface CubeletState {
    id: string;
    position: THREE.Vector3;
    rotation: THREE.Euler;
}

/**
 * A helper function that generates the initial, "solved" state of the Rubik's Cube.
 * @param size The dimension of the cube (e.g., 3 for a 3x3x3 cube).
 * @returns An array of CubeletState objects.
 */
const generateCubelets = (size: number): CubeletState[] => {
    const cubelets: CubeletState[] = [];
    const offset = (size - 1) / 2;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                // Exclude the invisible center piece for odd-sized cubes
                if (size % 2 !== 0 && x === offset && y === offset && z === offset) {
                    continue;
                }
                cubelets.push({
                    id: `${x}-${y}-${z}`,
                    position: new THREE.Vector3(x - offset, y - offset, z - offset),
                    rotation: new THREE.Euler(0, 0, 0),
                });
            }
        }
    }
    return cubelets;
};

/**
 * A custom React hook that encapsulates all the logic for the Rubik's Cube.
 * @param cubeRef A React ref pointing to the main THREE.Group containing all cubelet meshes.
 */
export const useRubiksCube = (cubeRef: React.RefObject<THREE.Group>) => {
    const [cubeState, setCubeState] = useState(generateCubelets(3));
    const [isRotating, setIsRotating] = useState(false);

    /**
     * Handles the rotation of a single face of the cube when a user clicks on it.
     */
    const handleFaceRotation = useCallback((clickedMesh: THREE.Object3D, materialIndex: number) => {
        if (isRotating || !cubeRef.current) return;

        let axis: "x" | "y" | "z";
        let direction: 1 | -1;

        switch (materialIndex) {
            case 0:
                axis = "x";
                direction = 1;
                break;
            case 1:
                axis = "x";
                direction = -1;
                break;
            case 2:
                axis = "y";
                direction = 1;
                break;
            case 3:
                axis = "y";
                direction = -1;
                break;
            case 4:
                axis = "z";
                direction = 1;
                break;
            case 5:
                axis = "z";
                direction = -1;
                break;
            default:
                return;
        }

        const clickedId = clickedMesh.userData.id;
        if (!clickedId) return;

        const clickedCubeletState = cubeState.find((c) => c.id === clickedId);
        if (!clickedCubeletState) return;

        const faceCubelets = cubeState.filter(
            (c) => Math.round(c.position[axis]) === Math.round(clickedCubeletState.position[axis])
        );

        setIsRotating(true);
        const pivot = new THREE.Group();
        cubeRef.current.add(pivot);

        faceCubelets.forEach((c) => {
            const mesh = cubeRef.current!.children.find((child) => child.userData.id === c.id);
            if (mesh) pivot.attach(mesh);
        });

        const rotationAxis = new THREE.Vector3(
            axis === "x" ? 1 : 0,
            axis === "y" ? 1 : 0,
            axis === "z" ? 1 : 0
        );
        const targetRotation = (Math.PI / 2) * direction;

        gsap.to(pivot.rotation, {
            x: pivot.rotation.x + rotationAxis.x * targetRotation,
            y: pivot.rotation.y + rotationAxis.y * targetRotation,
            z: pivot.rotation.z + rotationAxis.z * targetRotation,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                pivot.updateWorldMatrix(true, true);

                // --- IMMUTABLE UPDATE FIX FOR MANUAL ROTATION ---
                const newStates = new Map<string, { position: THREE.Vector3; rotation: THREE.Euler }>();
                pivot.children.slice().forEach((child) => {
                    const worldPosition = new THREE.Vector3();
                    child.getWorldPosition(worldPosition);
                    worldPosition.round();

                    const worldQuaternion = new THREE.Quaternion();
                    child.getWorldQuaternion(worldQuaternion);
                    const worldRotation = new THREE.Euler().setFromQuaternion(worldQuaternion);

                    newStates.set(child.userData.id, { position: worldPosition, rotation: worldRotation });
                });

                const newCubeState = cubeState.map((oldCubelet) => {
                    if (newStates.has(oldCubelet.id)) {
                        return {
                            ...oldCubelet,
                            position: newStates.get(oldCubelet.id)!.position,
                            rotation: newStates.get(oldCubelet.id)!.rotation,
                        };
                    }
                    return oldCubelet;
                });

                while (pivot.children.length > 0) {
                    cubeRef.current!.attach(pivot.children[0]);
                }
                cubeRef.current!.remove(pivot);

                setCubeState(newCubeState);
                setIsRotating(false);
            },
        });
    }, [isRotating, cubeState, cubeRef]);

    /**
     * Animates all cubelets from their current state back to the original solved state.
     */
    const solveCube = useCallback(() => {
        // This function already uses an immutable pattern and is correct.
        if (isRotating || !cubeRef.current) return;
        setIsRotating(true);

        const solvedState = generateCubelets(3);
        const tl = gsap.timeline({
            onComplete: () => {
                setCubeState(solvedState);
                setIsRotating(false);
            },
        });

        cubeState.forEach((scrambledCubelet) => {
            const targetState = solvedState.find((c) => c.id === scrambledCubelet.id);
            const mesh = cubeRef.current!.children.find(
                (child) => child.userData.id === scrambledCubelet.id
            );

            if (targetState && mesh) {
                tl.to(mesh.position, { ...targetState.position, duration: 0.8, ease: "power3.inOut" }, 0);
                tl.to(mesh.rotation, { ...targetState.rotation, duration: 0.8, ease: "power3.inOut" }, 0);
            }
        });
    }, [isRotating, cubeState, cubeRef]);


    /**
     * Applies a series of rapid, random moves to shuffle the cube.
     */
    const shuffleCube = useCallback(() => {
        if (isRotating || !cubeRef.current) return;
        setIsRotating(true);

        const moveCount = 25;
        let movesMade = 0;

        const applyRandomMove = () => {
            if (movesMade >= moveCount) {
                setIsRotating(false);
                return;
            }

            const axes: ("x" | "y" | "z")[] = ["x", "y", "z"];
            const slices = [-1, 0, 1];
            const directions: (-1 | 1)[] = [-1, 1];

            const axis = axes[Math.floor(Math.random() * axes.length)];
            const slice = slices[Math.floor(Math.random() * slices.length)];
            const direction = directions[Math.floor(Math.random() * directions.length)];

            const faceCubelets = cubeState.filter((c) => Math.round(c.position[axis]) === slice);
            const pivot = new THREE.Group();
            cubeRef.current!.add(pivot);

            faceCubelets.forEach((c) => {
                const mesh = cubeRef.current!.children.find((child) => child.userData.id === c.id);
                if (mesh) pivot.attach(mesh);
            });

            const rotationAxis = new THREE.Vector3(
                axis === "x" ? 1 : 0,
                axis === "y" ? 1 : 0,
                axis === "z" ? 1 : 0
            );
            const targetRotation = (Math.PI / 2) * direction;

            gsap.to(pivot.rotation, {
                x: pivot.rotation.x + rotationAxis.x * targetRotation,
                y: pivot.rotation.y + rotationAxis.y * targetRotation,
                z: pivot.rotation.z + rotationAxis.z * targetRotation,
                duration: 0.15,
                ease: "power1.inOut",
                onComplete: () => {
                    pivot.updateWorldMatrix(true, true);

                    // --- IMMUTABLE UPDATE FIX FOR SHUFFLE ---
                    const newStates = new Map<string, { position: THREE.Vector3; rotation: THREE.Euler }>();
                    pivot.children.slice().forEach((child) => {
                        const worldPos = new THREE.Vector3();
                        child.getWorldPosition(worldPos);
                        worldPos.round();
                        const worldQuat = new THREE.Quaternion();
                        child.getWorldQuaternion(worldQuat);
                        const worldRot = new THREE.Euler().setFromQuaternion(worldQuat);
                        newStates.set(child.userData.id, { position: worldPos, rotation: worldRot });
                    });

                    const newCubeState = cubeState.map((oldCubelet) => {
                        if (newStates.has(oldCubelet.id)) {
                            return {
                                ...oldCubelet,
                                position: newStates.get(oldCubelet.id)!.position,
                                rotation: newStates.get(oldCubelet.id)!.rotation,
                            };
                        }
                        return oldCubelet;
                    });

                    while (pivot.children.length > 0) {
                        cubeRef.current!.attach(pivot.children[0]);
                    }
                    cubeRef.current!.remove(pivot);

                    setCubeState(newCubeState);
                    movesMade++;
                    applyRandomMove();
                },
            });
        };

        applyRandomMove();
    }, [isRotating, cubeState, cubeRef]);

    return { cubeState, isRotating, handleFaceRotation, solveCube, shuffleCube };
};
