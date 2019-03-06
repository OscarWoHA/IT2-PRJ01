class Mob {
    constructor() {
        this.x = random(0, width - part)
        this.y = random(0, height - part)
        this.speed_x = 2
        this.speed_y = 2
    }

    update() {
        this.x += this.speed_x
        this.y += this.speed_y

        if (this.x + part >= width) {
            this.speed_x = -Math.abs(this.speed_x)
        }

        if (this.x < 0) {
            this.speed_x = Math.abs(this.speed_x)
        }

        if (this.y + part >= height) {
            this.speed_y = -Math.abs(this.speed_y)
        }

        if (this.y < 0) {
            this.speed_y = Math.abs(this.speed_y)
        }
    }

    draw() {
        rectMode(CORNER)
        imageMode(CORNER)

        stroke(255)
        strokeWeight(1)
        noFill()

        if (Math.sign(this.speed_x) == 1) {
            //rect(this.x, this.y, part, part)
            image(getSprite('spy_right').image, this.x, this.y, part, part)
        } else if (Math.sign(this.speed_x) == -1) {
            //rect(this.x, this.y, part, part)
            image(getSprite('spy_left').image, this.x, this.y, part, part)
        }

        noStroke()
    }
}