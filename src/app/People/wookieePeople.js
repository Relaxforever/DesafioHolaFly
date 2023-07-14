const AbstractPeople = require("./abstractPeople");
const URL_API = process.env.URL_API;
const { validateData } = require("./dataValidation");

class WookieePeople extends AbstractPeople {
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
          `${URL_API}api/people/${this.id}/?format=wookiee`,
          "GET",
          null,
          true
        );
      }
      const world = await this.app.swapiFunctions.genericRequest(
        `${URL_API}api/planets/${people.acooscwoohoorcanwa.split("/")[5]}/`,
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
    /*console.log('whrasco: ', people.whrascwo);
    console.log('acwoahrracao: ', people.acwoahrracao);
    console.log('scracc: ', people.scracc);
    console.log('acooscwoohoorcanwa Split: ', people.acooscwoohoorcanwa.split("/")[5]);
    console.log('whrasco: ', world.name);*/

    
    this.whrascwo = this.name = people.whrascwo;
    this.acwoahrracao = this.height = parseInt(people.acwoahrracao);
    this.scracc = this.mass = people.scracc;
    this.acooscwoohoorcanwa = this.homeworldId  = people.acooscwoohoorcanwa.split("/")[5];
    this.whrascwo= this.homeworldName = world.whrascwo;
  }
}

module.exports = WookieePeople;