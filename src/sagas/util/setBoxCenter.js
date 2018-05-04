import * as THREE from 'three';

/**
 * Set the object center at the given position
 */
export default function* setBoxCenter(obj, position = new THREE.Vector3()) {
    const bb = new THREE.Box3();
    const center = new THREE.Vector3();
    bb.setFromObject(obj);
    bb.getCenter(center);
    obj.position.x += position.x - center.x;
    obj.position.y += position.y - center.y;
    obj.position.z += position.z - center.z;
}