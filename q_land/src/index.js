import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import printTree from "../mesh/tree.js";
// import printHallabong from "../mesh/hallabong.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { SpotLightHelper } from "three";
import { TextureLoader } from "three";

let camera, scene, renderer, stats;
const clock = new THREE.Clock();

let mixer;
let model1;

init();
animate();

function init() {
  // 장면
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7ccad5);

  //카메라
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const $result = document.getElementById("result");

  camera.position.set(-20, 30, 60);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  //렌더러
  renderer = new THREE.WebGLRenderer({ canvas: $result });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new GLTFLoader();

  //텍스쳐 적용
  const textureLoader = new TextureLoader();

  // 섬
  // 섬 기본 높이 3.3 정도
  loader.load("../model/island_color.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(0, 0, 0);
    model1.rotation.set(0, 0, 0);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
  });

  //겨울 섬
  // loader.load("../model/island_winter.glb", (glb) => {
  //   const model1 = glb.scene;
  //   scene.add(model1);
  //   console.log(glb);
  //   model1.position.set(0, 0, -145);
  //   model1.rotation.set(0, 0, 0);

  //   model1.scale.set(1, 1, 1);
  //   model1.receiveShadow = true;
  // });

  // //이글루
  // loader.load("../model/igloo.glb", (glb) => {
  //   const model1 = glb.scene;
  //   scene.add(model1);
  //   model1.position.set(25, 1.5, -120);
  //   model1.rotation.set(0, 220, 0);
  //   model1.scale.set(1, 1, 1);
  //   model1.receiveShadow = true;
  // });

  //여름 집
  // loader.load("../model/house_summer", (glb) => {
  //   const model1 = glb.scene;
  //   scene.add(model1);
  //   model1.position.set(0, 1.5, -1);
  //   model1.rotation.set(0, 20, 0);
  //   model1.scale.set(1, 1, 1);
  //   model1.receiveShadow = true;
  // });

  // //봄 가을집
  // loader.load("../model/house_spring_autumm", (glb) => {
  //   const model1 = glb.scene;
  //   scene.add(model1);
  //   model1.position.set(0, 1.5, -1);
  //   model1.rotation.set(0, 20, 0);
  //   model1.scale.set(1, 1, 1);
  //   model1.receiveShadow = true;
  // });

  // Raycaster 객체 생성
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  //우체통
  loader.load("../model/Mailbox.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-50, 0, 30);
    model1.rotation.y = THREE.MathUtils.degToRad(140);
    model1.scale.set(1.5, 1.5, 1.5);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  //오두막 집
  loader.load("../model/House.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-80, 0, 30);
    model1.rotation.y = THREE.MathUtils.degToRad(110);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  //버섯
  loader.load("../model/mushroom.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-50, 0, 30);
    model1.rotation.y = THREE.MathUtils.degToRad(140);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  //기본 나무
  loader.load("../model/basic_tree.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-90, 0, 40);
    model1.rotation.y = THREE.MathUtils.degToRad(140);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  //작은 나무
  loader.load("../model/basic_small_tree", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-50, 0, 30);
    model1.rotation.y = THREE.MathUtils.degToRad(140);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  //파란 꽃
  loader.load("../model/Flower_Blue.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-30, 6, 30);
    model1.rotation.y = THREE.MathUtils.degToRad(140);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  //튤립
  loader.load("../model/Flower_Tulip.glb", (glb) => {
    const model1 = glb.scene;
    scene.add(model1);
    model1.position.set(-40, 6, 30);
    model1.rotation.y = THREE.MathUtils.degToRad(140);
    model1.scale.set(1, 1, 1);
    model1.receiveShadow = true;
    // 마우스 클릭 이벤트 리스너 추가
  });

  document.addEventListener("click", onDocumentClick, false);

  // 마우스 클릭 이벤트 핸들러
  function onDocumentClick(event) {
    // 마우스 포인터의 위치를 정규화된 좌표로 변환
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster를 통해 마우스 포인터 위치로부터 레이를 발사
    raycaster.setFromCamera(mouse, camera);

    // 씬에서 광선과 교차하는 객체를 찾기
    const intersects = raycaster.intersectObjects(scene.children, true);

    // 교차된 객체가 있는지 확인하고 있다면 해당 객체에 대한 동작을 수행
    if (intersects.length > 0) {
      // 클릭된 객체를 가져옴
      const selectedObject = intersects[0].object;

      // 우체통 객체인지 확인
      if (selectedObject === model1) {
        // Mailbox_open으로 모델 교체

        loader.load("../model/Mailbox_open.glb", (glb) => {
          const mailboxOpen = glb.scene;
          scene.remove(model1); // 기존 우체통 제거
          scene.add(mailboxOpen); // 열린 우체통 추가
          mailboxOpen.position.copy(model1.position); // 위치 유지
          mailboxOpen.rotation.copy(model1.rotation); // 회전 유지
          mailboxOpen.scale.copy(model1.scale); // 크기 유지
          mailboxOpen.receiveShadow = true;
        });
      }
    }
  }

  // 고양이
  loader.load("../model/CharacterMotion.glb", (glb) => {
    const model1 = glb.scene;
    console.log(glb);
    model1.position.set(-20, 4.3, 0);
    model1.scale.set(3, 3, 3);
    model1.castShadow = true;
    mixer = new THREE.AnimationMixer(model1);

    const action = mixer.clipAction(glb.animations[0]);

    action.play();

    model1.mixer = mixer;
    let leftKeyboard = true;
    let rightKeyboard = true;

    function setModelRotation(direction) {
      switch (direction) {
        case "up": // 위
          model1.rotation.y = Math.PI;
          break;
        case "down": // 아래
          model1.rotation.y = 0;
          break;
        case "left": //왼쪽
          model1.rotation.y = -Math.PI / 2;
          break;
        case "right": // 오른쪽
          model1.rotation.y = Math.PI / 2;
          break;
        default:
          break;
      }
    }

    // 키보드 이벤트 리스너
    document.addEventListener("keydown", (event) => {
      const speed = 1.5;
      switch (event.keyCode) {
        case 37: // 왼쪽 화살표
          model1.position.x -= speed;
          setModelRotation("left"); // 모델을 왼쪽으로 이동할 때 왼쪽으로 회전
          break;
        case 39: // 오른쪽 화살표
          model1.position.x += speed;
          setModelRotation("right"); // 모델을 오른쪽으로 이동할 때 오른쪽으로 회전
          break;
        case 38: // 위쪽 화살표
          model1.position.z -= speed;
          setModelRotation("up"); // 모델을 위로 이동할 때 뒤로 회전
          break;
        case 40: // 아래쪽 화살표
          model1.position.z += speed;
          setModelRotation("down"); // 모델을 아래로 이동할 때 앞으로 회전
          break;
        case 32: // 스페이스바
          model1.position.y += speed;
          break;
      }
    });

    scene.add(model1);
  });

  let sea = new THREE.BoxGeometry(1000, 3, 1000);
  var seaTexture = new THREE.TextureLoader().load("../model/sea.jpg");
  var seaMaterial = new THREE.MeshBasicMaterial({ map: seaTexture });
  let mesh = new THREE.Mesh(sea, seaMaterial);
  mesh.position.set(0, -2, 0);
  scene.add(mesh);

  //OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);

  //최소, 최대 확대 회전
  controls.minDistance = 2;
  controls.maxDistance = 100;
  // controls.maxPolarAngle = Math.PI / 3;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 5, 5);
  directionalLight.target.position.set(0, 2, 2);
  scene.add(directionalLight);

  renderer.shadowMap.enabled = true;
  directionalLight.castShadow = true;

  //그림자의 해상도 -> 설정 시 렌더링 속도 느려질 수 있음
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  //그림자에 블러효과 -> 설정 시 렌더링 속도 느려질 수 있음
  directionalLight.shadow.radius = 5;

  const upLight = new THREE.DirectionalLight(0xffffff, 1);
  upLight.position.set(0, 3, 0);
  scene.add(upLight);

  // directional light helper
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    1,
    0xff0000
  );
  dlHelper.position.set(0, 6, 0);
  scene.add(dlHelper);

  //axeshelper: 축 생성
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const basic = new THREE.MeshBasicMaterial({
    //색상
    color: 0x2e6ff2,
    //와이어프레임의 형태
    //wireframe: true,
    //transparent를 설정하고 opacity로 투명도 조절 가능
    transparent: true,
    opacity: 0.5,
  });

  //가장 일반적으로 사용되는 재질. Unity나 Unreal에서 사용함. 물리 기반이라 빛에 의해 명암이 표현됨
  const standard = new THREE.MeshStandardMaterial({
    color: 0xffaaaa,
    //거칠기 표현
    roughness: 0.2,
    //금속 속성. 값이 클 수록 금속 속성 질감!
    metalness: 0.8,
    //side 속성을 지정하면 렌더링할 면을 고를 수 있음
    side: THREE.FrontSide, //기본값
  });

  //스탠다드 머터리얼의 확장 버전. 고급 물리학기반의 렌더링 제공
  const physical = new THREE.MeshPhysicalMaterial({
    color: 0xffaaaa,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  });

  //광택이 있는 표면을 표현할 때 사용
  const phong = new THREE.MeshPhongMaterial({
    color: 0xffaaaa,
    shininess: 30,
    //빛의 색이 변함
    specular: 0x2e6ff2,
  });

  window.addEventListener("resize", () => {
    // 1. 카메라의 종횡비
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 업데이트

    // 2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener("resize", () => {
    //1. 카메라의 종횡비
    camera.aspect = window.innerWidth / innerHeight;
    camera.updateProjectionMatrix(); //카메라 업데이트

    //2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  stats = new Stats();
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);

  stats.update();
}

animate();
