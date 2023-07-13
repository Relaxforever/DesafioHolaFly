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

    getHomeworlId() {
        return this.homeworlId;
    }

   async  getWeightOnPlanet(planetId){
    const planetObject = new this.app.planet.Planet(planetId, this.app);
    await planetObject.init();
  
    const planetGravity = planetObject.getGravity();
  
    if (planetGravity === "unknown" || this.mass === "unknown") {
      return "Gravity or mass is unknown";
    }
  
    const gravityValue = parseFloat(planetGravity.split(" ")[0]);
    const planetWeight = this.mass * gravityValue;
    return planetWeight;
    }
}