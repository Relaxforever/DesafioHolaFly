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
          `${URL_API}/people/${this.id}/?format=wookiee`,
          "GET",
          null,
          true
        );
        validateData(people); // Validate the retrieved people data
      }

      const world = await this.app.swapiFunctions.genericRequest(
        people.acooscwoohoorcanwa,
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

    this.whrascwo = people.whrascwo;
    this.acwoahrracao = people.acwoahrracao;
    this.scracc = people.scracc;
    this.acooscwoohoorcanwa = people.acooscwoohoorcanwa.split("/")[5];
    this.whrascwo = world.whrascwo;
  }
}

module.exports = CommonPeople;