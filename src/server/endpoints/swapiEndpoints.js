const isWookieeFormat = (req) => {
    return req.query.format === 'wookiee';
  };
  
  const sendResponse = (res, data) => {
    res.send(data);
  };
  
  const URL_API = process.env.URL_API;
  
  const applySwapiEndpoints = (server, app) => {
    // Route to retrieve test data from the SWAPI API
    server.get('/hfswapi/test', async (req, res) => {
      try {
        const data = await app.swapiFunctions.genericRequest(`${URL_API}/api`, 'GET', null, true);
        sendResponse(res, data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving test data' });
      }
    });
  
    // Route to retrieve people data by ID
    server.get('/hfswapi/getPeople/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const isWookie = isWookieeFormat(req);
        const peopleObject = await app.peopleFactory.peopleFactory(id, app, isWookie);


        // Send response with relevant people data
        //console.log(app.db.watchDB())
        sendResponse(res, {
          name: peopleObject.getName(),
          height: peopleObject.getHeight(),
          mass: peopleObject.getMass(),
          homeworldName: peopleObject.getHomeworldName(),
          homeworldId: peopleObject.getHomeworldId(),
        });

        //console.log(Object.getOwnPropertyNames(peopleObject))
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting character data' });
      }
    });
  
    // Route to retrieve planet data by ID
    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const planetObject =  new app.planet.Planet(id, app);
        await planetObject.init();
       // console.log(Object.getOwnPropertyNames(planetObject))
        // Send response with relevant planet data
        sendResponse(res, {
          name: planetObject.getName(),
          gravity: planetObject.getGravity(),
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting planet data' });
      }
    });
  
    // Route to calculate random weight on a planet
    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
      try {
        const idPeople = Math.floor(Math.random() * 22) + 1;
        const idPlanet = Math.floor(Math.random() * 22) + 1;
        const people = await app.peopleFactory.peopleFactory(idPeople, app, false);
        const weight = await people.getWeightOnPlanet(idPlanet);
  
        // Send response with calculated weight on a random planet
        sendResponse(res, {
          planetId: idPlanet,
          peopleId: idPeople,
          weight: weight,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error calculating weight data' });
      }
    });
  
    // Route to retrieve logs
    server.get('/hfswapi/getLogs', async (req, res) => {
      try {
        const data = await app.db.logging.findAll();
        sendResponse(res, data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving logs' });
      }
    });
  };
  
  module.exports = applySwapiEndpoints;
  