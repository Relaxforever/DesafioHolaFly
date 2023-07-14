const URL_API = process.env.URL_API;

class Planet {
    constructor(id, app){
        this.id = id;
        this.app = app;
    }

    getName() {
      return this.name;
  }

  getGravity() {
      return this.gravity;
  }

  getId() {
      return this.id;
  }

  async init(){
    try {
        let planet = await this.app.db.swPlanet.findOne({
        where: { id: this.id },
        });
              
        if (planet === null) {
              planet = await this.app.swapiFunctions.genericRequest(
              `${URL_API}api/planets/${this.id}`,
              "GET",
              null
              );
              }
             // console.log('El planeta ', planet)
              this.mapData(planet);
          } catch (error) {
            // Handle and log errors appropriately
            throw new Error(`Failed to initialize Planet: ${error.message}`);
          }
    }
    mapData(planet) {
      // Perform any necessary mapping or transformation of the retrieved data
        this.name = planet.name;
        this.gravity = planet.gravity;
    }
}
module.exports = Planet;