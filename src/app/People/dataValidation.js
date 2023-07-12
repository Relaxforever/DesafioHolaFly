function validateData(peopleData) {
    if (!peopleData || typeof peopleData !== 'object') {
      throw new Error('Invalid people data');
    }
  
    if (!peopleData.name || typeof peopleData.name !== 'string') {
      throw new Error('Invalid or missing name');
    }
  
    if (!peopleData.height || isNaN(parseInt(peopleData.height))) {
      throw new Error('Invalid or missing height');
    }
  
    if (!peopleData.mass || isNaN(parseInt(peopleData.mass))) {
      throw new Error('Invalid or missing mass');
    }
  
    if (!peopleData.homeworld || typeof peopleData.homeworld !== 'string') {
      throw new Error('Invalid or missing homeworld');
    }
  
    // Add more validation rules to the api if Necessary
  
    // If all validations pass, return true or perform additional checks if necessary
    return true;
  }
  