import ColladaLoader from 'three-collada-loader';
import * as THREE from 'three';

export default function load(dir, name) {
    return new Promise((resolve, reject) => {
        const loader = new ColladaLoader();

        loader.load(
            `/models/${dir}/${name}.dae`,
            (collada) => {
                const root = new THREE.Object3D();

                const bb = new THREE.Box3();
                const center = new THREE.Vector3();
                bb.setFromObject(collada.scene);
                bb.getCenter(center);
                
                collada.scene.position.sub(center);
                collada.scene.position.z += (bb.max.z - bb.min.z) / 2;
                
                root.add(collada.scene);
                root.userData = { bb };

                resolve(root);
            },
            () => {
            }, //progress
            reject
        );
    });
}