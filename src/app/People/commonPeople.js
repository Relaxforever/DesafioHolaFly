const AbstractPeople = require("./abstractPeople");
const URL_API = process.env.URL_API;
const { validateData } = require("./dataValidation");

class CommonPeople extends AbstractPeople {
  constructor(id, app) {
    super(id);
    this.app = app;
  }

  async init() {
    try {
      let people = await this.app.db.swPeople.findOne({
        where: { id: this.id },
      });

      if (people === null) {
        people = await this.app.swapiFunctions.genericRequest(
          `${URL_API}/people/${this.id}`,
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
    this.height = people.height;
    this.mass = people.mass;
    this.homeworldId = people.homeworld.split("/")[5];
    this.homeworldName = world.name;
  }
}

module.exports = CommonPeople;

