METEOR_SHOWER_MIN_FRAC = 2/5;
METEOR_SHOWER_MAX_FRAC = 4/5;
VEL_X_MIN = 1;
VEL_X_MAX = 5;
VEL_Y_MIN = 7;
VEL_Y_MAX = 18.75;
ANGLE_INCREMENT_MIN = 0.1;
ANGLE_INCREMENT_MAX = 0.25;
EMOJI_OPACITY = 0.5;
EMOJIS = ["⭐", "🌟", "🌠", "💫", "✨", "🌑", "🌕", "🪐", "🌌", "☄️", "🥮"]

class Meteor {
    // pass in canvas cuz globals are bad
    constructor(canvas, emoji) {
        this.emoji = emoji;

        this.x = getRandomFloatBetween(METEOR_SHOWER_MIN_FRAC * canvas.width, 
                                        METEOR_SHOWER_MAX_FRAC * canvas.width);
        this.y = 0;

        this.vx = getRandomFloatBetween(VEL_X_MIN, VEL_X_MAX);
        this.vy = getRandomFloatBetween(VEL_Y_MIN, VEL_Y_MAX);

        this.angle = 0;
    }

    update() {  
        this.x -= this.vx;
        this.y += this.vy;

        this.angle += getRandomFloatBetween(ANGLE_INCREMENT_MIN, ANGLE_INCREMENT_MAX);
    }

    draw(context) {
        // actually render the emoji by providing a font for the canvas to work with
        context.globalAlpha = EMOJI_OPACITY;
        context.font = "45px serif";

        // rotate it -- this actually gets pretty funky fast
        context.save();

        context.translate(this.x, this.y);
        context.rotate(this.angle);
        // misc. aligning stuff to make it work
        context.textAlign = "center";
        context.textBaseline = "middle";
        // position at (0, 0) since that's our new location
        context.fillText(this.emoji, 0, 0);

        context.restore();
    }
}

class MeteorShower {
    constructor(meteors) {
        this.meteors = meteors;
    }

    update() {
        for (let meteor of this.meteors) {
            meteor.update();
        }
    }

    draw(context) {
        for (let meteor of this.meteors) {
            meteor.draw(context);
        }
    }
}

function getRandomFloatBetween(min, max) {
    return (Math.random() * (max - min)) + min;
}

function summonMeteorShower() {
    let meteorShower = document.createElement("canvas");
    meteorShower.id = "meteor-shower";
    document.querySelector("html").appendChild(meteorShower);

    $("#sparkles")[0].play();

    const canvas = document.getElementById("meteor-shower");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    meteorShower = new MeteorShower(EMOJIS.map((e) => new Meteor(canvas, e)));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        meteorShower.update();
        meteorShower.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
}

function main() {
    document.getElementById("section-title").addEventListener("mouseover", summonMeteorShower);
}

main();