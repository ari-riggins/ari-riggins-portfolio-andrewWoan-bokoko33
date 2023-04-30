import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: -Math.PI/4,
            target: -Math.PI/4,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();
        
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });

                // if(child.name === "LaptopScreen") {
                //     console.log("here");
                //     child.material = new THREE.MeshBasicMaterial({
                //         map: this.resources.items.screen,
                //     });
                // }
            }

            
        });

        // const pointLight = new THREE.PointLight( 0xffb0cc, .7, 60 );
        const pointLight = new THREE.PointLight( 0xffb0cc, 0, 60 );
        // pointLight.position.set( -11.0631, -8.41679, 12.445 );
        pointLight.position.set( -10.84, 12.91679, 8.22 );
        this.pointLight = pointLight;
        this.actualRoom.add( pointLight );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.103, 0.103, 0.103);
        // this.actualRoom.rotation.set(0,-Math.PI/4,0);
        this.actualRoom.rotation.y = -Math.PI/4;
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            // console.log(e);
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = -Math.PI/4 + this.rotation * 0.05;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}