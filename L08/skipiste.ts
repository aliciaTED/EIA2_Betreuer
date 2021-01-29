namespace L08_Canvas_Skipiste {
    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun({ x: 100, y: 75 });
        drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawMountains({ x: 0, y: crc2.canvas.height * golden }, 75, 200, "white", "grey");
        drawMountains({ x: 0, y: crc2.canvas.height * golden }, 50, 150, "lightgrey", "grey");
        drawTree();
        // drawSnowman({ x: 400, y: 500 });
        drawLift();
        drawSkiers({x: 10, y: 500 }, { x: 500, y: 600 });
        // drawBirdsInTree({ x: 510, y: 400 }, { x: 180, y: 120 });
        drawSnowflakes({ x: 0, y: 600 });
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "HSL(220, 30%, 90%)");
        gradient.addColorStop(1, "white");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun" + _position);

        let r1: number = 25;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1");
        gradient.addColorStop(1, "HSLA(60, 100%, 40%, 0");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud" + _position, _size);
        let nParticles: number = 30;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorHigh: string, _colorLow: string): void {
        console.log("Mountains" + _position, _min, _max, _colorHigh, _colorLow);
        console.log("Mountains");
        let stepMin: number = 50;
        let stepMax: number = 80;
        let x: number = 0;

        crc2.save();

        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }

    function drawTree(): void {
        console.log("Tree");
        let transform: DOMMatrix = crc2.getTransform();

        // let x: number = Math.random() * 800;
        let nBranches: number = 50;
        let maxRadius: number = 60;
        let branch: Path2D = new Path2D();
        branch.arc(600, 470, maxRadius, 0, 2 * Math.PI);

        crc2.fillStyle = "HSL(30, 70%, 40%)"; // Baumstamm
        crc2.fillRect(600, 450, 20, -100);
        crc2.save();
        crc2.translate(0, -120);

        do {
            let y: number = Math.random() * 150;
            let x: number = (Math.random() - 0.5) * 2 * maxRadius;

            crc2.save();
            crc2.translate(0, -y);
            crc2.translate(x, 0);

            let colorAngle: number = 120 - Math.random() * 60;
            let color: string = "HSLA(" + colorAngle + ", 50%, 60%, 0.5)";

            crc2.fillStyle = color;
            crc2.fill(branch);
            crc2.restore();
        } while (--nBranches > 0);

        crc2.restore();
        crc2.setTransform(transform);
    }

    // function drawSnowman(_position: Vector): void {
    //     console.log("Snowman");

    //     let snowman: Path2D = new Path2D;
    //     let r1: number = 70;
    //     let r2: number = 40;
    //     let r3: number = 25;

    //     snowman.arc(_position.x, _position.y, r1, 0, 2 * Math.PI);
    //     crc2.fillStyle = "white";
    //     crc2.fill(snowman);
    //     crc2.strokeStyle = "black";
    //     crc2.stroke(snowman);

    //     let snowman1: Path2D = new Path2D;
    //     let y2: number = 500 - (r1 + r2);

    //     snowman1.arc(_position.x, y2, r2, 0, 2 * Math.PI);
    //     crc2.fillStyle = "white";
    //     crc2.fill(snowman1);
    //     crc2.strokeStyle = "black";
    //     crc2.stroke(snowman1);

    //     let snowman2: Path2D = new Path2D;
    //     let y3: number = y2 - (r2 + r3);

    //     snowman2.arc(_position.x, y3, r3, 0, 2 * Math.PI);
    //     crc2.fillStyle = "white";
    //     crc2.fill(snowman2);
    //     crc2.strokeStyle = "black";
    //     crc2.stroke(snowman2);

    //     let smile: Path2D = new Path2D;

    //     smile.arc(_position.x, y3, 10, 0, Math.PI);
    //     crc2.stroke(smile);

    //     let eye1: Path2D = new Path2D;

    //     eye1.arc(390, 315, 3, 0, 2 * Math.PI);
    //     crc2.fillStyle = "black";
    //     crc2.fill(eye1);
    //     crc2.stroke(eye1);

    //     let eye2: Path2D = new Path2D;

    //     eye2.arc(410, 315, 3, 0, 2 * Math.PI);
    //     crc2.fillStyle = "black";
    //     crc2.fill(eye2);
    //     crc2.stroke(eye2);

    //     let nose: Path2D = new Path2D;

    //     nose.arc(400, 322, 3, 0, 2 * Math.PI);
    //     crc2.fillStyle = "orange";
    //     crc2.fill(nose);
    //     crc2.stroke(nose);
    // }

    function drawLift(): void {
        console.log("Lift");

        crc2.fillStyle = "HSL(30, 70%, 50%)";
        crc2.fillRect(118, 600, 80, -90);

        // Tür
        crc2.fillStyle = "brown";
        crc2.fillRect(148, 560, 30, 90);
        

        // Dach
        crc2.beginPath();
        crc2.moveTo(110, 510); // Strich
        crc2.lineTo(158, 448); // Ecke oben
        crc2.lineTo(205, 510);
        crc2.closePath();
        crc2.fillStyle = "darkred";
        crc2.fill();

    }

    function drawSkiers(_position: Vector, _size: Vector): void {
        console.log("Skiers.");

        let nSkiers: number = 20;
        let radiusSkier: number = 7 + Math.random() * 10;
        let skier: Path2D = new Path2D();

        skier.arc(0, 0, radiusSkier, 0, 2 * Math.PI);

        let head: number = 0 - radiusSkier;
        skier.arc(head, -2, (1 / 2) * radiusSkier, 0, 2 * Math.PI);
        skier.ellipse(5, -5, (1 / 3) * radiusSkier, radiusSkier, 13, 0, 2 * Math.PI);

        // let skierEye: Path2D = new Path2D;

        // crc2.translate(_position.x, _position.y);
        // skierEye.arc(head, 5, 1.5, 0, 2 * Math.PI);
        // crc2.fillStyle = "black";
        // crc2.fill(skierEye);
        // crc2.stroke(skierEye);

        crc2.save();
        crc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < nSkiers; drawn++) {
            let colorAngle: number = 120 - Math.random() * 290;
            let color: string = "HSLA(" + colorAngle + ", 90%, 50%, 0.7)";
            let scale: number = 0.7 + Math.random() * 1;
            crc2.fillStyle = color;
            crc2.save();
            let x: number = Math.random() * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.transform(scale, 0, 0, scale, 0, 0);
            crc2.fill(skier);
            crc2.restore();
        }
        crc2.restore();
    }

    // function drawBirdsInTree(_position: Vector, _size: Vector): void {
    //     console.log("Birds in Tree");

    //     let nBirds: number = 5;
    //     let radiusBird: number = 10 + Math.random() * 10;
    //     let bird: Path2D = new Path2D();

    //     bird.arc(0, 0, radiusBird, 0, 2 * Math.PI);

    //     let wing: number = 0 - radiusBird;
    //     bird.arc(wing, 0, radiusBird, 0, 0.5 * Math.PI);
    //     crc2.stroke(bird);

    //     let head: number = 0 - radiusBird;
    //     bird.arc(0, head, (1 / 2) * radiusBird, 0, 2 * Math.PI);

    //     crc2.save();
    //     crc2.translate(_position.x, _position.y);


    //     for (let drawn: number = 0; drawn < nBirds; drawn++) {
    //         let colorAngle: number = 120 - Math.random() * 290;
    //         let color: string = "HSLA(" + colorAngle + ", 90%, 50%, 0.7)";
    //         crc2.fillStyle = color;
    //         crc2.save();
    //         let x: number = Math.random() * _size.x;
    //         let y: number = - (Math.random() * _size.y);
    //         crc2.translate(x, y);
    //         crc2.fill(bird);
    //         crc2.restore();
    //     }
    //     crc2.restore();
    // }

    function drawSnowflakes(_position: Vector): void {
        let nSnowflakes: number = 222;
        let radiusParticle: number = 10;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nSnowflakes; drawn++) {
            crc2.save();
            let x: number = Math.random() * 800;
            let y: number = - (Math.random() * 600);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
}