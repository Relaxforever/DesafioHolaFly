const WookieePeople = require('./wookieePeople');
const CommonPeople = require('./CommonPeople');

const peopleFactory = async (id, app, lang) => {
    let people = null;
    if (lang == true){
       // console.log('Id adquirida Wookie ', id)
        people = new WookieePeople(id, app);
    } else {
        //console.log('Id adquirida PeopleFactory ', id)
        people = new CommonPeople(id, app);
    }
    await people.init();
    return people;
}

module.exports = { peopleFactory }