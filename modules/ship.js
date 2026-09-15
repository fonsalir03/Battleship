class Ship {
    constructor(length){
        this.length = length
        this.hits = 0
        this.orientation = "v"
    }

    hit(){
        if (this.hits>=this.length) return
        this.hits +=1
    }

    isSunk(){
        if (this.length == this.hits) return true
        return false
    }

};

class Carrier extends Ship{
    constructor(){
        super(5)
    }
}

class Battleship extends Ship{
    constructor(){
        super(4)
    }
}

class Destroyer extends Ship{
    constructor(){
        super(3)
    }
}

class Submarine extends Ship{
    constructor(){
        super(3)
    }
}

class PatrolBoat extends Ship{
    constructor(){
        super(2)
    }
}

export {Carrier, Battleship, Destroyer, Submarine, PatrolBoat}