// npm run seed: node ./app/models/seed.js
// seed.js is the file that runs to seed the db with static values and create many pets at once
// be careful with this, when it runs it will delete all existing data in the db first!
// can modify it later to only delete pets without an owner, but keep it simple for now

const mongoose = require('mongoose')
const Team = require('./team')
const db = require('../../config/db')

const starterTeams = [
    { teamName: 'Himitsu Sentai Gorenger', colors: ['red', 'blue', 'yellow', 'pink', 'green'], memberCount: 5 , series: 1 },
    { teamName: 'J.A.K.Q. Dengekitai', colors: ['red', 'blue', 'pink', 'green', 'white'], memberCount: 5 , series: 2 },
    { teamName: 'Battle Fever J', colors: ['red', 'orange', 'blue', 'black', 'pink'], memberCount: 5 , series: 3 },
    { teamName: 'Denshi Sentai Denziman', colors: ['red', 'blue', 'yellow', 'green', 'pink'], memberCount: 5 , series: 4 },
    { teamName: 'Taiyo Sentai Sun Vulcan', colors: ['red', 'blue', 'yellow'], memberCount: 3 , series: 5 },
    { teamName: 'Dai Sentai Goggle V', colors: ['red', 'black', 'blue', 'yellow', 'pink'], memberCount: 5 , series: 6 },
    { teamName: 'Kagaku Sentai Dynaman', colors: ['red', 'black', 'blue', 'yellow', 'pink'], memberCount: 5 , series: 7 },
    { teamName: 'Choudenshi Bioman', colors: ['red', 'green', 'blue', 'yellow', 'pink'], memberCount: 5 , series: 8 },
    { teamName: 'Dengeki Sentai Changeman', colors: ['red', 'black', 'blue', 'white', 'pink'], memberCount: 5 , series: 9 },
    { teamName: 'Choushinsei Flashman', colors: ['red', 'green', 'blue', 'yellow', 'pink'], memberCount: 5 , series: 10 },
    { teamName: 'Hikari Sentai Maskman', colors: ['red', 'black', 'blue', 'yellow', 'pink'], memberCount: 5 , series: 11 },
    { teamName: 'Choujuu Sentai Liveman', colors: ['red', 'yellow', 'blue', 'black', 'green'], memberCount: 5 , series: 12 },
    { teamName: 'Kaitou Sentai Lupinranger vs. Keisatsu Sentai Patranger', colors: ['red', 'blue', 'yellow'], memberCount: 3 , series: 42 }
    
]

// first, connect to db
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first remove all pets with no owner
        Team.deleteMany({owner: null})
            .then(deletedTeams => {
                console.log('deletedTeams', deletedTeams)
                // the next step is to create new seeded pets using startPets array
                Team.create(starterTeams)
                    .then(newTeams => {
                        console.log('newTeams', newTeams)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })