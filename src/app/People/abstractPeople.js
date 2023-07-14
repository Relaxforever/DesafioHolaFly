class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
        throw new Error('Init method must be implemented in each Class that extends AbstractPeople');
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworldId() {
        return this.homeworldId;
    }

   async  getWeightOnPlanet(planetId){
    const planetObject = new this.app.planet.Planet(planetId, this.app);
    await planetObject.init();
  
    const planetGravity = planetObject.getGravity();
  
    if (planetGravity === "unknown" || this.mass === "unknown") {
      return "Gravity or mass is unknown";
    }
    if (parseInt(this.getHomeworldId) === planetObject.getId()) {
        throw 'Error: personaje no puede ser del mismo planeta'
    }

    /*console.log('Id del planeta del personaje', parseInt(this.getHomeworldId()))
    console.log('Id del planeta', planetObject.getId())
    console.log('Masa', this.mass)
    console.log('Gravedad', planetGravity)*/
    const personWeight = this.mass * parseFloat(planetGravity.split(" ")[0]);
    //console.log('Peso en Planeta', personWeight)

    
    return personWeight;
    }
}

module.exports =  AbstractPeople 