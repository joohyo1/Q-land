import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const scene = new THREE.Scene();

export default function printCatCharacter() {
  loader.load("../model/CatCharacter.glb", (glb) => {
    const catCharacter = glb.scene;
    scene.add(catCharacter);
    catCharacter.scale.set(3, 3, 3);
    catCharacter.position.set(0, 3, 0);
    return catCharacter;
    //키보드 누를 때마다 함수 실행
    function keyBoardEvent(e) {
      const left = 37;
      if (e.keyCode === left) {
        //오른 화살표키
        catCharacter.position.x += 1;
        console.log("왼쪽이요");

        //왼쪽 화살표키
      } else if (e.keyCode === 39) {
        catCharacter.position.x -= 1;
      }

      //위쪽 화살표키
      else if (e.keyCode === 38) {
        catCharacter.position.y += 1;
      }

      //아래쪽 화살표키
      else if (e.keyCode === 40) {
        catCharacter.position.y -= 1;
      }
    }
    document.addEventListener("keydown", keyBoardEvent, false);
    document.addEventListener("keyup", keyBoardEvent, false);
  });
}
