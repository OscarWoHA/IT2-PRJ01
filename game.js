// Array filled with all the beautiful sprites of this game
let sprites = []

// Array filled with all the beautiful sounds of this game
let sounds = []

// Divided later, had some issues with using floats so we decided to go for normal integers
let volume = 2

// Variable to store number value for score
let score = 0

// Variable to store number value for score required to win the game
let scoreRequired = 0

// Variable stores number value for seconds left on the timer
let timeLeft = 0
let timeLeftCounter // setInterval, used to cancel the counter whenever a game is over

// Sets the state of the game (0 = champion select, 1 = actual game, 2 = end screen)
let gameState = 0

// Variable used later for mob and arrow object, not generated until p5js setup-function
let mob, arrow

// Storing the selected champion
let selectedChampion = 1

// Using the size of the canvas to create a "grid"
let part = 600 / 10

// We have two backgrounds, need to store which one is selected in a variable
let randomBackground

function preload() {
    /**
     * Champion codes:
     * 1 = Glaz
     * 0 = Kapkan
     * 2 = Tachanka
     */

    // Initialize all sounds into sound array
    sounds.push({
        name: 'intro',
        sound: insertAudio('art/soviet_lav.mp3')
    }, {
        name: 'bullets',
        sound: insertAudio('art/glaz/bullets.mp3'),
        champion: 1 
    }, {
        name: 'oneshot',
        sound: insertAudio('art/glaz/oneshot.mp3'),
        champion: 1
    }, {
        name: 'ready',
        sound: insertAudio('art/glaz/ready.mp3'),
        champion: 1
    }, {
        name: 'glaz_gun',
        sound: insertAudio('art/glaz/gun.mp3'),
        champion: 1
    }, {
        name: 'iknow',
        sound: insertAudio('art/kapkan/iknow.mp3'),
        champion: 0
    }, {
        name: 'job',
        sound: insertAudio('art/kapkan/job.mp3'),
        champion: 0
    }, {
        name: 'kapkan_gun',
        sound: insertAudio('art/kapkan/gun.mp3'),
        champion: 0
    }, {
        name: 'detected',
        sound: insertAudio('art/tachanka/detected.mp3'),
        champion: 2
    }, {
        name: 'lmg',
        sound: insertAudio('art/tachanka/lmg.mp3'),
        champion: 2
    }, {
        name: 'rely',
        sound: insertAudio('art/tachanka/rely.mp3'),
        champion: 2
    }, {
        name: 'tachanka_gun',
        sound: insertAudio('art/tachanka/gun.mp3'),
        champion: 2
    }, {
        name: 'commie_fucker',
        sound: insertAudio('art/commie_fucker.mp3')
    })

    // Initialize all sprites into sprite array
    sprites.push({
        name: 'glaz',
        image: loadImage('art/Glaz8bit.png')
    }, {
        name: 'kapkan',
        image: loadImage('art/Kapkan8bit.png')
    }, {
        name: 'tachanka',
        image: loadImage('art/Tachanka8bit.png')
    }, {
        name: 'background',
        image: loadImage('art/Spetsnaz8bit.png')
    }, {
        name: 'spy_left',
        image: loadImage('art/sprite_0.png')
    }, {
        name: 'spy_right',
        image: loadImage('art/sprite_1.png')
    }, {
        name: 'spy_large',
        image: loadImage('art/sprite_0_large.png')
    }, {
        name: 'kremlin',
        image: loadImage('art/Kremlin.png')
    }, {
        name: 'pripyat',
        image: loadImage('art/Pripyat.png')
    })
}

/**
 * p5.js's setup() function
 * Used to createCanvas to size, set the framerate of the game, create Mob and Arrow objects and generate the random numbers needed for the actual game
 */
function setup() {

    createCanvas(600, 600)
    frameRate(60)

    mob = new Mob()
    arrow = new Arrow(3, 10, 10)

    scoreRequired = Math.floor(random(10, 30))
    timeLeft = Math.floor(random(30, 60))
    randomBackground = Math.floor(random(0, 1))

    textFont('VT323')
}

/**
 * The heart (or brain) of this game, p5.js's draw() function
 * Called at every x framerate, for this game that is 60 times per second (or at least that's what it's trying to hit
 * Fills the canvas with all sorts of shenanigans
 */
function draw() {
    // if statement to determine what sort of content is to be drawn on the canvas
    if (gameState == 0) { // Pregame
        // Start intro
        getSound('intro').sound.play().then(() => {
            background(0)

            imageMode(CORNER)
            image(getSprite('background').image, 0, 0, width, height)

            textAlign(CENTER)
            textSize(32)
            stroke(100, 0, 0)
            strokeWeight(4)
            text('SELECT A CHAMPION', width / 2, part + 32)
            textSize(18)
            text('USE THE ARROW KEYS, PRESS ENTER WHEN YOU\'RE DONE', width / 2, part + 32 + 18)

            let glazSprite = getSprite('glaz')
            let kapkanSprite = getSprite('kapkan')
            let tachankaSprite = getSprite('tachanka')

            switch (selectedChampion) {
                case 0:
                    imageMode(CENTER)
                    textAlign(CENTER)

                    fill(255)
                    textSize(24)


                    // KAPKAN
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('KAPKAN', part * 1.5, height / 2 + (part * 1.5 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(part * 1.5, 0, part * 1.5, height)
                    noStroke()

                    image(kapkanSprite.image, part * 1.5, height / 2, part * 3, part * 3)

                    // GLAZ
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('GLAZ', width / 2, height / 2 + (part * 0.75 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(width / 2, 0, width / 2, height)
                    noStroke()

                    image(glazSprite.image, width / 2, height / 2, part * 1.5, part * 1.5)

                    // TACHANKA
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('TACHANKA', width - part * 1.5, height / 2 + (part * 0.75 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(width - part * 1.5, 0, width - part * 1.5, height)
                    noStroke()

                    image(tachankaSprite.image, width - part * 1.5, height / 2, part * 1.5, part * 1.5)

                    break;
                case 1:
                    imageMode(CENTER)
                    textAlign(CENTER)

                    fill(255)
                    textSize(24)

                    // KAPKAN
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('KAPKAN', part * 1.5, height / 2 + (part * 0.75 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(part * 1.5, 0, part * 1.5, height)
                    noStroke()

                    image(kapkanSprite.image, part * 1.5, height / 2, part * 1.5, part * 1.5)


                    // GLAZ
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('GLAZ', width / 2, height / 2 + (part * 1.5 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(width / 2, 0, width / 2, height)
                    noStroke()

                    image(glazSprite.image, width / 2, height / 2, part * 3, part * 3)

                    // TACHANKA
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('TACHANKA', width - part * 1.5, height / 2 + (part * 0.75 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(width - part * 1.5, 0, width - part * 1.5, height)
                    noStroke()

                    image(tachankaSprite.image, width - part * 1.5, height / 2, part * 1.5, part * 1.5)

                    break;
                case 2:
                    imageMode(CENTER)
                    textAlign(CENTER)

                    fill(255)
                    textSize(24)


                    // KAPKAN
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('KAPKAN', part * 1.5, height / 2 + (part * 0.75 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(part * 1.5, 0, part * 1.5, height)
                    noStroke()

                    image(kapkanSprite.image, part * 1.5, height / 2, part * 1.5, part * 1.5)

                    // GLAZ
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('GLAZ', width / 2, height / 2 + (part * 0.75 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(width / 2, 0, width / 2, height)
                    noStroke()

                    image(glazSprite.image, width / 2, height / 2, part * 1.5, part * 1.5)

                    // TACHANKA
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    text('TACHANKA', width - part * 1.5, height / 2 + (part * 1.5 + 24))

                    stroke(255, 0, 0)
                    strokeWeight(1)
                    //line(width - part * 1.5, 0, width - part * 1.5, height)
                    noStroke()

                    image(tachankaSprite.image, width - part * 1.5, height / 2, part * 3, part * 3)

                    break;
                default:
                    break;
            }

            stroke(0)
            strokeWeight(3)

            let volumeText = `VOLUME: ${Math.floor(volume*10)}%`

            textAlign(LEFT)
            textSize(16)
            text(volumeText, 4, height - 4)

            let spySprite = getSprite('spy_large')

            rectMode(CORNER)
            imageMode(CORNER)

            noFill()
            stroke(0)
            strokeWeight(3)

            let size = part * 1.25

            rect(width - size - 5, 5, size, size)
            image(spySprite.image, width - size - 5, 5, size, size)

            fill(255)
            textSize(16)
            textAlign(CENTER)
            text('WANTED', width - size / 2 - 5, size + 20)
        }, () => {
            background(0)
            fill(255, 0, 0)
            textAlign(CENTER)
            textSize(24)
            text(`PLEASE INTERACT WITH THE PAGE`, width / 2, height / 2)
        })
    } else if (gameState == 1) { // Kjører
        background(0) // Set the background to black every frame

        if (randomBackground == 0) {
            image(getSprite('kremlin').image, 0, 0, width, height)
        } else {
            image(getSprite('pripyat').image, 0, 0, width, height)
        }

        getSound('intro').sound.pause() // Stop intro

        drawGame() // Run drawGame function
    } else if (gameState == 2) { // Ferdig
        background(0)

        textAlign(CENTER)
        textSize(64)

        stroke(0)
        strokeWeight(5)

        if (timeLeft > 0) {
            text('You won!', width / 2, height / 2)

            textSize(32)

            let textOffset = 32

            text(`Final time`, width / 2, height / 2 + textOffset * 2)

            textSize(24)
            text(`${timeLeft} seconds`, width / 2, height / 2 + textOffset * 2.75)
        } else {
            text('Times up!', width / 2, height / 2)
        }
    }
}

function drawGame() {
    noCursor()

    mob.draw()

    arrow.draw()

    mob.update()

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

function keyPressed() {
    if (gameState == 0) {
        if (keyCode == LEFT_ARROW) {
            if (selectedChampion == 0) selectedChampion = 2
            else selectedChampion -= 1

            let sounds = getSoundsByChampion(selectedChampion)

            if (sounds.length != 0) {
                sounds[Math.floor(random(0, sounds.length - 1))].sound.play()
            }
        } else if (keyCode == RIGHT_ARROW) {
            if (selectedChampion == 2) selectedChampion = 0
            else selectedChampion += 1

            let sounds = getSoundsByChampion(selectedChampion)

            if (sounds.length != 0) {
                sounds[Math.floor(random(0, sounds.length - 1))].sound.play()
            }
        } else if (keyCode == ENTER) {
            gameState = 1 // Set the game state to active

            timeLeftCounter = setInterval(() => {
                timeLeft -= 1 // Subtract a second from timeLeft

                if (timeLeft == 0) {
                    gameState = 2 // Set the game to finished

                    clearInterval(timeLeftCounter) // Stop the timeLeft counter
                }
            }, 1000) // Run with the interval of 1000 ms, equal to 1 second
        } else if (key == 'z') {
            volume = volume - 1

            if (volume < 0) volume = 0

            sounds.forEach(sound => {
                sound.sound.volume = volume / 10
            })

            masterVolume(volume / 10)
        } else if (key == 'x') {
            volume = volume + 1

            if (volume > 10) volume = 10

            sounds.forEach(sound => {
                sound.sound.volume = volume / 10
            })

            masterVolume(volume / 10)
        }
    }
}

/**
 * mouseClicked() function
 * Run every time the user clicks inside our canvas, determines if arrow (mouseX and mouseY) is within the bounds of the "spy" sprite
 */
function mouseClicked() {
    if (gameState == 1) {
        let sound = sounds.filter(sound => {
            return sound.champion == selectedChampion && sound.name.includes('_gun')
        })[0]

        if (sound.sound.paused)
            sound.sound.play()

        sound.sound.onended = () => {
            if (getSound('commie_fucker').sound.paused)
                getSound('commie_fucker').sound.play()
        }

        if (mouseX >= mob.x && mouseX <= (mob.x + part)) {
            if (mouseY >= mob.y && mouseY <= (mob.y + part)) {
                mob.x = random(0, width - part)
                mob.y = random(0, height - part)

                mob.speed_x = Math.floor(random(2, 6))
                mob.speed_y = Math.floor(random(2, 6))


                score += 1

                if (score == scoreRequired) {
                    gameState = 2 // Set the game to finished

                    clearInterval(timeLeftCounter)
                }
            }
        }
    }
}

/**
 * Function to get a sprite object with the specified name
 * @param {string} name 
 */
function getSprite(name) {
    return sprites.filter(sprite => {
        return sprite.name == name
    })[0]
}

/**
 * Function to get a sound object with the specified name
 * @param {string} name 
 */
function getSound(name) {
    return sounds.filter(sound => {
        sound.sound.volume = volume / 10

        return sound.name == name
    })[0]
}

function getSoundsByChampion(champion) {
    return sounds.filter(sound => {
        sound.sound.volume = volume / 10

        return sound.champion == champion && !sound.name.includes('_gun')
    })
}

/**
 * Function to insert an audio-element to the document
 * @param {string} file 
 * @param {object} options 
 */
function insertAudio(file, options) {
    // Use DOM manipulation to create a virtual HTML element
    let songelement = document.createElement('audio')

    // Set the 'src' variable of the element equal to file
    songelement.src = file

    // Check if any options were passed
    if (options) {
        // Autoplay option
        if (options.autoplay) {
            songelement.autoplay = ''
        }

        // Controls option
        if (options.controls) {
            songelement.controls = ''
        }
    }

    songelement.volume = volume / 10

    // Append the virtual HTML element to the actual DOM
    document.body.appendChild(songelement)

    // Return the element
    return songelement
}