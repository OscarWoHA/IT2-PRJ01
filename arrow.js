class Arrow {
    /**
     * Create a new Arrow object
     * @param {number} thicccccness 
     * @param {number} offset 
     * @param {number} length 
     */
    constructor(thicccccness, offset, length) {
        this.thicccccness = thicccccness
        this.offset = offset
        this.length = length
    }

    draw() {
        rectMode(CENTER)

        fill(0, 255, 0)

        // Rektangel nord
        rect(mouseX, mouseY - this.offset, this.thicccccness, this.length)

        // Rektangel sør
        rect(mouseX, mouseY + this.offset, this.thicccccness, this.length)

        // Rektangel vest
        rect(mouseX - this.offset, mouseY, this.length, this.thicccccness)

        // Rektangel øst
        rect(mouseX + this.offset, mouseY, this.length, this.thicccccness)
    }
}