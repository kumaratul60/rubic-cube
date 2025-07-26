import { gsap } from 'gsap';
import { useState } from 'react';
import * as THREE from 'three';

// Define a type for our cubelet's state
export interface CubeletState {
    id: string;
    position: THREE.Vector3;
    rotation: THREE.Euler;
}

// Helper to generate the initial cube state
const generateCubelets = (size: number): CubeletState[] => {
    const cubelets: CubeletState[] = [];
    const offset = (size - 1) / 2;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
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

export const useRubiksCube = (cubeRef: React.RefObject<THREE.Group>) => {
    const [cubeState, setCubeState] = useState(generateCubelets(3));
    const [isRotating, setIsRotating] = useState(false);

    const handleFaceRotation = (clickedMesh: THREE.Object3D, normal: THREE.Vector3) => {
        if (isRotating || !cubeRef.current) return;

        const axis = (['x', 'y', 'z'] as const).find(ax => Math.abs(normal[ax]) > 0.5);
        if (!axis) return;

        setIsRotating(true);
        const pivot = new THREE.Group();
        cubeRef.current.add(pivot);

        const clickedPosition = clickedMesh.position;
        const faceCubelets = cubeState.filter(c => Math.round(c.position[axis]) === Math.round(clickedPosition[axis]));

        faceCubelets.forEach(c => {
            const mesh = cubeRef.current!.children.find(child => child.userData.id === c.id);
            if (mesh) pivot.attach(mesh);
        });

        const rotationAxis = new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0);
        const direction = Math.sign(normal.dot(rotationAxis));
        const targetRotation = (Math.PI / 2) * direction;

        gsap.to(pivot.rotation, {
            x: rotationAxis.x * targetRotation,
            y: rotationAxis.y * targetRotation,
            z: rotationAxis.z * targetRotation,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                pivot.updateWorldMatrix(true, true);
                const newCubeState = [...cubeState];

                pivot.children.slice().forEach(child => {
                    const stateToUpdate = newCubeState.find(s => s.id === child.userData.id);
                    if (stateToUpdate) {
                        const worldPosition = new THREE.Vector3();
                        child.getWorldPosition(worldPosition);
                        stateToUpdate.position.copy(worldPosition).round();

                        const worldQuaternion = new THREE.Quaternion();
                        child.getWorldQuaternion(worldQuaternion);
                        stateToUpdate.rotation.setFromQuaternion(worldQuaternion);

                        cubeRef.current!.attach(child);
                    }
                });

                cubeRef.current!.remove(pivot);
                setCubeState(newCubeState);
                setIsRotating(false);
            },
        });
    };

    return { cubeState, isRotating, handleFaceRotation };
};