import * as THREE from "three";

export default function printHallabong() {
  const textureLoader = new THREE.TextureLoader();
  //한라봉
  const base = textureLoader.load("../model/orangeBase.jpg");
  const rough = textureLoader.load("../model/orangeRough.jpg");
  const normal = textureLoader.load("../model/orangeNormal.jpg");

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffb48c, //텍스쳐 기본 색상이 잘 안보이는 것 같으니 연한 색상으로!
    map: base,
    roughness: 0,
    normalMap: normal,
    roughnessMap: rough,
  });

  const hallabong = new THREE.Group();

  const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);

  const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
  hallabong.add(bottom);

  const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
  const top = new THREE.Mesh(topGeometry, bodyMaterial);
  hallabong.add(top);
  top.position.y = 1.7;

  const leafsMaterial = new THREE.MeshStandardMaterial({
    color: 0x008000,
    side: THREE.DoubleSide,
  });

  const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
  const stem = new THREE.Mesh(stemGeometry, leafsMaterial);
  hallabong.add(stem);
  stem.position.y = 2.6;

  const leafsGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
  const leafs = new THREE.Mesh(leafsGeometry, leafsMaterial);
  hallabong.add(leafs);
  leafs.position.set(-0.5, 2.4 - 0);
  leafs.rotation.z = Math.PI / -2;

  return hallabong;
}
