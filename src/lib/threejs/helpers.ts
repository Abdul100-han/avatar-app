import * as THREE from 'three'

export const centerObject = (object: THREE.Object3D) => {
  const box = new THREE.Box3().setFromObject(object)
  const center = box.getCenter(new THREE.Vector3())
  object.position.x += object.position.x - center.x
  object.position.y += object.position.y - center.y
  object.position.z += object.position.z - center.z
}

export const scaleObjectToFit = (object: THREE.Object3D, targetSize = 2) => {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = targetSize / maxDim
  object.scale.set(scale, scale, scale)
}