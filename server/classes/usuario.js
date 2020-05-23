class Usuario {
    constructor() {
        this.arrayPeople = [];
    }

    addPerson(id, name, room) {
        let people = {
            id,
            name,
            room
        };

        this.arrayPeople.push(people);
        return this.arrayPeople;
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.arrayPeople = this.arrayPeople.filter((person) => person.id !== id);

        return deletedPerson;
    }

    getPerson(id) {
        let getPersonById = this.arrayPeople.filter((person) => person.id === id)[0];
        return getPersonById;
    }

    getPeople() {
        return this.arrayPeople;
    }

    getPeopleByRoom(room) {
        let peopleInRoom = this.arrayPeople.filter((person) => person.room === room);
        return peopleInRoom;
    }
}


module.exports = {
    Usuario
};