const AbstractPeople = require("./abstractPeople");
const URL_API = process.env.URL_API;
const { validateData } = require("./dataValidation");

class CommonPeople extends AbstractPeople {
  constructor(id, app) {
    super(id);
    this.app = app;
    this.id = id;
  }

  async init() {
    try {
      let people = await this.app.db.swPeople.findOne({
        where: { id: this.id },
      });

      if (people === null) {
        people = await this.app.swapiFunctions.genericRequest(
          `${URL_API}api/people/${this.id}`,
          "GET",
          null,
          true
        );
        validateData(people); // Validate the retrieved people data
      }

      const world = await this.app.swapiFunctions.genericRequest(
        people.homeworld,
        "GET",
        null
      );

      this.mapData(people, world);
    } catch (error) {
      // Handle and log errors appropriately
      throw new Error(`Failed to initialize CommonPeople: ${error.message}`);
    }
  }

  mapData(people, world) {
    // Perform any necessary mapping or transformation of the retrieved data

    this.name = people.name;
    this.height = parseInt(people.height);
    this.mass = parseInt(people.mass);
    //console.log("Homeworld is ", '/' + people.homeworld.split("/")[4] + "/" + people.homeworld.split("/")[5]);
    this.homeworldId =  people.homeworld.split("/")[5];
    this.homeworldName = world.name;
  }
}

module.exports = CommonPeople;

