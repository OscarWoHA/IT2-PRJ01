/**
 * TODO
 * - Optimize code
 * - Comments
 * - Clearer variable names
 * - Implement check for timeLeft in draw loop, to change gameState to end screen
 * - Implement end screen
 * - Implement sounds
 * - Implement background for mid game
 * - Exponential increase in speed, following the linear curve of timeLeft, less timeLeft, higher speed
 * - Sleep
 */

let image_data = { x: 0, y: 0, speed_x: 2, speed_y: 2 } // Should probably be revamped/included in sprites array/object

let sprites = []

let russia_background

let song // Will be revamped for new sound collection system

let score = 0
let scoreRequired = 0

let timeLeft = 0
let timeLeftCounter // setInterval, used to cancel the counter whenever a game is over

let gameState = 0

let selectedChampion = 1 // Not susceptible to change

let part = 600 / 10

function preload() {
    let songelement = document.createElement('audio')
    songelement.src = 'art/soviet.mp3'
    songelement.autoplay = ''
    document.body.appendChild(songelement)
    song = songelement

    sprites.push(
        { name: 'glaz', image: loadImage('art/Glaz8bit.png')}, 
        { name: 'kapkan', image: loadImage('art/Kapkan8bit.png')},
        { name: 'tachanka', image: loadImage('art/Tachanka8bit.png')},
        { name: 'background', image: loadImage('art/Spetsnaz8bit.png')},
        { name: 'spy_left', image: loadImage('art/sprite_0.png')},
        { name: 'spy_right', image: loadImage('art/sprite_1.png')},
        )
}

function setup() {
    createCanvas(600, 500)
    frameRate(60)

    textSize(16)

    scoreRequired = Math.floor(random(10, 30))
    timeLeft = Math.floor(random(60, 120))

    image_data.x = random(0, width-part)
    image_data.y = random(0, height-part)
    
    textFont('VT323')
}

function draw() {
    if (gameState == 0) { // Pregame
        // Start introsange
        song.play().then(() => {
            background(0)

            imageMode(CORNER)
            image(getSprite('background').image, 0, 0, width, height)

            textAlign(CENTER)
            textSize(32)
            stroke(100, 0, 0)
            strokeWeight(4)
            text('SELECT A CHAMPION', width/2, part+32)
            textSize(18)
            text('USE THE ARROW KEYS, PRESS ENTER WHEN YOU\'RE DONE', width/2, part+32+18)
    
            let glazSprite = getSprite('glaz')
            let kapkanSprite = getSprite('kapkan')
            let tachankaSprite = getSprite('tachanka')
    
            switch(selectedChampion) {
                case 0:
                    imageMode(CENTER)
                    textAlign(CENTER)
    
                    fill(255)
                    textSize(24)
    
    
                    // KAPKAN
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('KAPKAN', part*1.5, height/2+(part*1.5+24))
                    
                    stroke(255,0,0)
                    strokeWeight(1)
                    line(part*1.5, 0, part*1.5, height)
                    noStroke()
    
                    image(kapkanSprite.image, part*1.5, height/2, part*3, part*3)
    
                    // GLAZ
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('GLAZ', width/2, height/2+(part*0.75+24))
    
                    stroke(255,0,0)
                    strokeWeight(1)
                    line(width/2, 0, width/2, height)
                    noStroke()
    
                    image(glazSprite.image, width/2, height/2, part*1.5, part*1.5)
    
                    // TACHANKA
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('TACHANKA', width-part*1.5, height/2+(part*0.75+24))
    
                    stroke(255,0,0)
                    strokeWeight(1)
                    line(width-part*1.5, 0, width-part*1.5, height)
                    noStroke()
    
                    image(tachankaSprite.image, width-part*1.5, height/2, part*1.5, part*1.5)
    
                    break;
                case 1:
                    imageMode(CENTER)
                    textAlign(CENTER)
    
                    fill(255)
                    textSize(24)
    
                    // KAPKAN
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('KAPKAN', part*1.5, height/2+(part*0.75+24))   
                    
                    stroke(255,0,0)
                    strokeWeight(1)             
                    line(part*1.5, 0, part*1.5, height)
                    noStroke()
    
                    image(kapkanSprite.image, part*1.5, height/2, part*1.5, part*1.5)
    
                    
                    // GLAZ
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('GLAZ', width/2, height/2+(part*1.5+24))
    
                    stroke(255,0,0) 
                    strokeWeight(1)            
                    line(width/2, 0, width/2, height)
                    noStroke()
    
                    image(glazSprite.image, width/2, height/2, part*3, part*3)
    
                    // TACHANKA
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('TACHANKA', width-part*1.5, height/2+(part*0.75+24))
    
                    stroke(255, 0, 0)
                    strokeWeight(1)
                    line(width-part*1.5, 0, width-part*1.5, height)
                    noStroke()
                    
                    image(tachankaSprite.image, width-part*1.5, height/2, part*1.5, part*1.5)
    
                    break;
                case 2:
                    imageMode(CENTER)
                    textAlign(CENTER)
    
                    fill(255)
                    textSize(24)
    
    
                    // KAPKAN
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('KAPKAN', part*1.5, height/2+(part*0.75+24))
                    
                    stroke(255,0,0)
                    strokeWeight(1)
                    line(part*1.5, 0, part*1.5, height)
                    noStroke()
    
                    image(kapkanSprite.image, part*1.5, height/2, part*1.5, part*1.5)
    
                    // GLAZ
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('GLAZ', width/2, height/2+(part*0.75+24))
                    
                    stroke(255,0,0)
                    strokeWeight(1)
                    line(width/2, 0, width/2, height)
                    noStroke()
    
                    image(glazSprite.image, width/2, height/2, part*1.5, part*1.5)
    
                    // TACHANKA
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('TACHANKA', width-part*1.5, height/2+(part*1.5+24))
    
                    stroke(255,0,0)
                    strokeWeight(1)
                    line(width-part*1.5, 0, width-part*1.5, height)
                    noStroke()
    
                    image(tachankaSprite.image, width-part*1.5, height/2, part*3, part*3)
    
                    break;
                default:
                    break;
            }
        }, () => {
            background(0)
            fill(255, 0, 0)
            textAlign(CENTER)
            textSize(24)
            text(`PLEASE INTERACT WITH THE PAGE`, width/2, height/2)
        })
    } else if (gameState == 1) { // Kjører
        background(0)

        // Stopp introsangen
        song.pause()

        drawGame()
    } else if (gameState == 2) { // Ferdig
        background(0)

        imageMode(CORNER)
        image(getSprite('background').image, 0, 0, width, height)
    }
}

function drawGame() {
    noCursor()

    rectMode(CORNER)
    imageMode(CORNER)
    stroke(255)
    noFill()

    if(Math.sign(image_data.speed_x) == 1) {
        rect(image_data.x, image_data.y, part,part)
        image(getSprite('spy_right').image, image_data.x, image_data.y, part, part)
    } else if (Math.sign(image_data.speed_x) == -1) {
        rect(image_data.x, image_data.y, part,part)
        image(getSprite('spy_left').image, image_data.x, image_data.y, part, part)
    }
    noStroke()

    drawArrow()

    update()

    fill(255)

    let scoreText = `Score: ${score}`
    let scoreRequiredText = `Score required: ${scoreRequired}`
    let timeLeftText = `Time left: ${timeLeft} sec`

    textSize(16)
    textAlign(RIGHT)
    
    text(scoreText, textWidth(scoreText) + 6, 18)
    text(scoreRequiredText, textWidth(scoreRequiredText) + 6, 36)
    text(timeLeftText, textWidth(timeLeftText) + 6, 54)
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

function keyPressed() {
    if (gameState == 0) {
        if (keyCode == LEFT_ARROW) {
            if (selectedChampion == 0) selectedChampion = 2
            else selectedChampion -= 1
        } else if (keyCode == RIGHT_ARROW) {
            if (selectedChampion == 2) selectedChampion = 0
            else selectedChampion += 1
        } else if (keyCode == ENTER) {
            gameState = 1

            timeLeftCounter = setInterval(() => {
                timeLeft -= 1
            }, 1000)
        }
    }
}

function mouseClicked() {
    if (gameState == 1) {
        if(mouseX >= image_data.x && mouseX <= (image_data.x + part)) {
            if(mouseY >= image_data.y && mouseY <= (image_data.y + part)) {
                image_data.x = random(0, width-part)
                image_data.y = random(0, height-part)

                image_data.speed_x = Math.floor(random(2, 6))
                image_data.speed_y = Math.floor(random(2, 6))
    
                score += 1

                if (score == scoreRequired) {
                    gameState = 2
                }
            }
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

function getSprite(name) {
    return sprites.filter(sprite => { return sprite.name == name })[0]
}

// Lånt fra https://gist.github.com/phobeo/793329
function gcd(a,b) {if(b>a) {temp = a; a = b; b = temp} while(b!=0) {m=a%b; a=b; b=m;} return a;}
