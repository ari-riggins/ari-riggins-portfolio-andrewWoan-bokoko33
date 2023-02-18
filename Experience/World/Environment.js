import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
// import GUI from "lil-gui";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);

        this.sunLight.position.set(1.5, 7, 5);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff",1);
        this.scene.add(this.ambientLight);

    }

    switchTheme(theme) {
        // console.log(this.sunLight);
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.20254901960784313,
                g: 0.25137254901960785,
                b: 0.4362745098039216,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.20254901960784313,
                g: 0.25137254901960785,
                b: 0.4362745098039216,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
            GSAP.to(this.experience.world.room.pointLight, {
                intensity: .7,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
            GSAP.to(this.experience.world.room.pointLight, {
                intensity: 0,
            });
        }
    }

    resize() {}
    update() {}
}
