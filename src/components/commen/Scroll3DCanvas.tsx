import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scroll3DCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // =========================================================
        // 🎛️ CONTROLLERS (તમારા કંટ્રોલર્સ)
        // =========================================================
        const GRASS_COUNT = 3800;   // 🌿 ઘાસની સંખ્યા
        const BLADE_HEIGHT = 2.15;  // 📏 ઘાસની ઊંચાઈ
        const BASE_WIDTH = 0.055;   // 📐 ઘાસની પાયાની પહોળાઈ
        const GRASS_Y_POS = -4.2;   // 📍 ઘાસનું સ્થાન (Y-Pos)
        const SPREAD_X = 18;        // ↔️ ફેલાવો (Width Spread)
        const SPREAD_Z = 3.6;       // ↗️ ઊંડાઈ (Depth Spread)
        const WIND_SPEED = 0.0008;  // 🌬️ પવનની સ્પીડ
        const WIND_SWAY = 0.15;     // 🌾 પવનની લહેર

        // 🖱️ MOUSE INTERACTION & PRESS CONTROLLERS (માઉસથી દબાવવાની ઇફેક્ટ)
        const MOUSE_PUSH_RADIUS = 2.0;    // 🎯 માઉસની અસરનું રેડિયસ
        const MOUSE_PRESS_FORCE = 0.65;    // 🔽 માઉસ નીચે આવે ત્યારે ઘાસ કેટલું દબાશે (Press Down)
        const SMOOTH_RETURN_SPEED = 1;  // 🌊 સ્મૂથ પાછા આવવાની સ્પીડ

        // 🎨 COLOR GRADING CONTROLLERS (ગ્રેડિયન્ટ કલર સેટિંગ્સ)
        const GRASS_COLORS = {
            root: "#1D8211", // 🎨 ડાર્ક મૂળ/થડનો કલર (Dark Root)
            mid: "#045409", // 🎨 વચ્ચેનો પાંદડાનો કલર (Natural Green)
            tip: "#4B9E0D", // 🎨 અણી/ટોચનો કલર (Tip Green)
        };
        // =========================================================

        // 1. Scene Setup
        const scene = new THREE.Scene();

        // 2. Camera Setup
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 10);

        // 3. Renderer Setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;

        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.filter = "blur(0.5px) brightness(1.05)";

        container.appendChild(renderer.domElement);

        // 4. Natural Lighting Setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xfef08a, 3.8); // Warm Sunlight
        sunLight.position.set(6, 12, 6);
        scene.add(sunLight);

        // ☀️ 5. SUN RAYS EFFECT (સૂર્યના કિરણો)
        const sunRaysGroup = new THREE.Group();
        const rayGeo = new THREE.PlaneGeometry(0.85, 15);
        const rayMat = new THREE.MeshBasicMaterial({
            color: 0xfff3c4,
            transparent: true,
            opacity: 0.14,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
        });

        for (let r = 0; r < 6; r++) {
            const ray = new THREE.Mesh(rayGeo, rayMat);
            ray.position.set(-8 + r * 3.2, 1, -2);
            ray.rotation.z = THREE.MathUtils.degToRad(-32);
            sunRaysGroup.add(ray);
        }
        scene.add(sunRaysGroup);

        // 🌿 6. CUSTOM GRADIENT & POINTED GRASS BLADE GEOMETRY
        const bladePositions = new Float32Array([
            // Bottom Base
            -BASE_WIDTH, 0.0, 0.0,
            BASE_WIDTH, 0.0, 0.0,
            -BASE_WIDTH * 0.6, BLADE_HEIGHT * 0.45, 0.08,

            BASE_WIDTH, 0.0, 0.0,
            BASE_WIDTH * 0.6, BLADE_HEIGHT * 0.45, 0.08,
            -BASE_WIDTH * 0.6, BLADE_HEIGHT * 0.45, 0.08,

            // Top Pointed Tip (૧ અણી)
            -BASE_WIDTH * 0.6, BLADE_HEIGHT * 0.45, 0.08,
            BASE_WIDTH * 0.6, BLADE_HEIGHT * 0.45, 0.08,
            0.0, BLADE_HEIGHT, 0.22,
        ]);

        // 🎨 Dynamic Linear Gradient Assignment
        const rootCol = new THREE.Color(GRASS_COLORS.root);
        const midCol = new THREE.Color(GRASS_COLORS.mid);
        const tipCol = new THREE.Color(GRASS_COLORS.tip);

        const bladeColors = new Float32Array([
            // Bottom Base Vertices
            rootCol.r, rootCol.g, rootCol.b,
            rootCol.r, rootCol.g, rootCol.b,
            midCol.r, midCol.g, midCol.b,

            rootCol.r, rootCol.g, rootCol.b,
            midCol.r, midCol.g, midCol.b,
            midCol.r, midCol.g, midCol.b,

            // Top Vertices (Gradient to Tip)
            midCol.r, midCol.g, midCol.b,
            midCol.r, midCol.g, midCol.b,
            tipCol.r, tipCol.g, tipCol.b,
        ]);

        const bladeGeo = new THREE.BufferGeometry();
        bladeGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(bladePositions, 3)
        );
        bladeGeo.setAttribute(
            "color",
            new THREE.BufferAttribute(bladeColors, 3)
        );
        bladeGeo.computeVertexNormals();

        const grassMat = new THREE.MeshStandardMaterial({
            vertexColors: true, // Gradient Active
            roughness: 0.35,
            metalness: 0.02,
            side: THREE.DoubleSide,
        });

        const grassMesh = new THREE.InstancedMesh(bladeGeo, grassMat, GRASS_COUNT);
        grassMesh.position.set(0, GRASS_Y_POS, 0.5);
        scene.add(grassMesh);

        const dummy = new THREE.Object3D();
        const grassTransforms: {
            x: number;
            z: number;
            rotY: number;
            scaleY: number;
            curveTilt: number;
            currentPress: number; // 🔽 દબાણ માપવા માટેનું વેરિયેબલ
            currentBendX: number;
            currentBendZ: number;
        }[] = [];

        for (let i = 0; i < GRASS_COUNT; i++) {
            const x = (Math.random() - 0.5) * SPREAD_X;
            const z = (Math.random() - 0.5) * SPREAD_Z;
            const rotY = Math.random() * Math.PI;
            const scaleY = 0.8 + Math.random() * 0.5;
            const curveTilt = (Math.random() - 0.5) * 0.15;
            grassTransforms.push({
                x,
                z,
                rotY,
                scaleY,
                curveTilt,
                currentPress: 0,
                currentBendX: 0,
                currentBendZ: 0,
            });
        }

        // 🖱️ 7. MOUSE CURSOR POSITION IN 3D SPACE
        const mouse3D = new THREE.Vector3(-999, -999, 0);
        const raycaster = new THREE.Raycaster();
        const mouse2D = new THREE.Vector2(-1, -1);

        const onMouseMove = (event: MouseEvent) => {
            mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse2D, camera);
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.5);
            const target = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, target);

            if (target) {
                mouse3D.copy(target.sub(grassMesh.position));
            }
        };

        window.addEventListener("mousemove", onMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // 8. Animation Loop
        let animId: number;

        const animate = () => {
            animId = requestAnimationFrame(animate);

            const time = Date.now() * WIND_SPEED;

            for (let i = 0; i < GRASS_COUNT; i++) {
                const item = grassTransforms[i];
                const { x, z, rotY, scaleY, curveTilt } = item;

                // 🌾 પવન સાથે કુદરતી હલન-ચલન
                const windSway = Math.sin(time * 2.2 + x * 1.6) * WIND_SWAY + curveTilt;

                // 🖱️ માઉસ કર્સર અને ઘાસનું અંતર
                const dx = x - mouse3D.x;
                const dz = z - mouse3D.z;
                const dist = Math.sqrt(dx * dx + dz * dz);

                let targetPress = 0;
                let targetPushX = 0;
                let targetPushZ = 0;

                // જો માઉસ નજીક આવે તો ઘાસ દબાવવું (Press down & slight tilt away)
                if (dist < MOUSE_PUSH_RADIUS && dist > 0.01) {
                    const factor = (1 - dist / MOUSE_PUSH_RADIUS);
                    targetPress = factor * MOUSE_PRESS_FORCE; // નીચે તરફ દબાવવું
                    targetPushX = (dx / dist) * factor * 0.2;  // સાઇડમાં હળવું ખસવું
                    targetPushZ = (dz / dist) * factor * 0.2;
                }

                // 🌊 સ્મૂથ સ્પ્રિંગ ઇફેક્ટ (Smooth Transition)
                item.currentPress += (targetPress - item.currentPress) * SMOOTH_RETURN_SPEED;
                item.currentBendX += (targetPushX - item.currentBendX) * SMOOTH_RETURN_SPEED;
                item.currentBendZ += (targetPushZ - item.currentBendZ) * SMOOTH_RETURN_SPEED;

                dummy.position.set(x, 0, z);

                // પવન + માઉસના દબાણથી ઘાસની ઊંચાઈ ઘટે અને બેન્ડ થાય (Press/Flatten effect)
                dummy.rotation.set(
                    windSway - item.currentBendZ + item.currentPress * 0.8,
                    rotY + windSway * 0.3,
                    windSway + item.currentBendX
                );

                // માઉસ આવે ત્યારે ઊંચાઈ થોડી ઓછી થઈને દબાયેલી અનુભવાય
                dummy.scale.set(1, Math.max(0.4, scaleY - item.currentPress * 0.6), 1);

                dummy.updateMatrix();
                grassMesh.setMatrixAt(i, dummy.matrix);
            }

            grassMesh.instanceMatrix.needsUpdate = true;

            // ☀️ સૂર્યના કિરણોનું એનિમેશન
            sunRaysGroup.children.forEach((ray, index) => {
                const rayMesh = ray as THREE.Mesh<
                    THREE.BufferGeometry,
                    THREE.MeshBasicMaterial
                >;
                rayMesh.material.opacity = 0.08 + Math.sin(time * 1.5 + index) * 0.04;
            });

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none"
        />
    );
}