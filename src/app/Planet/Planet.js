class Planet {
    constructor(id){
        throw new Error('To be implemented');
    }

    async init(){
        try {
            let planet = await this.app.db.swPlanet.findOne({
                where: { id: this.id },
              });
      
              if (planet === null) {
                planet = await this.app.swapiFunctions.genericRequest(
                  `${URL_SWAPI}/planets/${this.id}`,
                  "GET",
                  null
                );
              }
              this.mapData(planet);
      
            this.mapData(people, world);
          } catch (error) {
            // Handle and log errors appropriately
            throw new Error(`Failed to initialize CommonPeople: ${error.message}`);
          }
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    mapData(planet) {

      // Perform any necessary mapping or transformation of the retrieved data
        this.name = planet.name;
        this.gravity = planet.gravity;
    }
}