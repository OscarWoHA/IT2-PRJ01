let image_data = { x: 0, y: 0, speed_x: 2, speed_y: 2 }

let image_left
let image_right

let russia_background

let song

let score = 0

let gameState = 0

let part = 600 / 10

function preload() {
    song = loadSound('/art/soviet.mp3')

    image_left = loadImage('/art/sprite_0.png')
    image_right = loadImage('/art/sprite_1.png')

    russia_background = loadImage('/art/russia.jpg')
}

function setup() {
    createCanvas(600, 500)
    frameRate(60)

    textSize(16)

    image_data.x = random(0, width-part)
    image_data.y = random(0, height-part)
}

function draw() {
    background(0)

    if (gameState == 0) { // Pregame
        if (!song.isPlaying()) {
            song.play()
        }

        image(russia_background, 0, 0, width, height)
    } else if (gameState == 1) { // Kjører
        drawGame()
    } else if (gameState == 2) { // Pause

    }
}

function drawGame() {
    noCursor()

    rectMode(CORNER)
    stroke(255)
    noFill()

    if(Math.sign(image_data.speed_x) == 1) {
        rect(image_data.x, image_data.y, part,part)
        image(image_right, image_data.x, image_data.y, part, part)
    } else if (Math.sign(image_data.speed_x) == -1) {
        rect(image_data.x, image_data.y, part,part)
        image(image_left, image_data.x, image_data.y, part, part)
    }
    noStroke()

    drawArrow()

    update()

    fill(255)
    textAlign(RIGHT)
    text(`Score: ${score}`, width-6, 20)
}

function drawArrow() {
    rectMode(CENTER)

    fill(255,0,0)

    let thickness = 3
    let offset = 10
    let length = 10

    // Rektangel nord
    rect(mouseX, mouseY - offset, thickness, length)

    // Rektangel sør
    rect(mouseX, mouseY + offset, thickness, length)

    // Rektangel vest
    rect(mouseX - offset, mouseY, length, thickness)

    // Rektangel øst
    rect(mouseX + offset, mouseY, length, thickness)
}

function mouseClicked() {
    if(mouseX >= image_data.x && mouseX <= (image_data.x + part)) {
        if(mouseY >= image_data.y && mouseY <= (image_data.y + part)) {
            image_data.x = random(0, width-part)
            image_data.y = random(0, height-part)

            score += 1
        }
    }
}

function update() {
    image_data.x += image_data.speed_x
    image_data.y += image_data.speed_y

    if(image_data.x+part >= width) {
        image_data.speed_x = -Math.abs(image_data.speed_x)
    } 

    if(image_data.x < 0) {
        image_data.speed_x = Math.abs(image_data.speed_x)
    }

    if(image_data.y+part >= height) {
        image_data.speed_y = -Math.abs(image_data.speed_y)
    }

    if(image_data.y < 0) {
        image_data.speed_y = Math.abs(image_data.speed_y)
    }
}