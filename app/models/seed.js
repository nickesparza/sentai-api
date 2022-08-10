// npm run seed: node ./app/models/seed.js
// seed.js is the file that runs to seed the db with static values and create many pets at once
// be careful with this, when it runs it will delete all existing data in the db first!
// can modify it later to only delete pets without an owner, but keep it simple for now

const mongoose = require('mongoose')
const Team = require('./team')
const db = require('../../config/db')

const starterTeams = [
    { teamName: 'Himitsu Sentai Gorenger', colors: ['red', 'blue', 'yellow', 'pink', 'green'], series: 1 },
    { teamName: 'J.A.K.Q. Dengekitai', colors: ['red', 'blue', 'pink', 'green', 'white'], series: 2 },
    { teamName: 'Battle Fever J', colors: ['red', 'orange', 'blue', 'black', 'pink'], series: 3 },
    { teamName: 'Denshi Sentai Denziman', colors: ['red', 'blue', 'yellow', 'green', 'pink'], series: 4 },
    { teamName: 'Taiyo Sentai Sun Vulcan', colors: ['red', 'blue', 'yellow'], series: 5 },
    { teamName: 'Dai Sentai Goggle V', colors: ['red', 'black', 'blue', 'yellow', 'pink'], series: 6 },
    { teamName: 'Kagaku Sentai Dynaman', colors: ['red', 'black', 'blue', 'yellow', 'pink'], series: 7 },
    { teamName: 'Choudenshi Bioman', colors: ['red', 'green', 'blue', 'yellow', 'pink'], series: 8 },
    { teamName: 'Dengeki Sentai Changeman', colors: ['red', 'black', 'blue', 'white', 'pink'], series: 9 },
    { teamName: 'Choushinsei Flashman', colors: ['red', 'green', 'blue', 'yellow', 'pink'], series: 10 },
    { teamName: 'Hikari Sentai Maskman', colors: ['red', 'black', 'blue', 'yellow', 'pink'], series: 11 },
    { teamName: 'Choujuu Sentai Liveman', colors: ['red', 'yellow', 'blue', 'black', 'green'], series: 12 },
    { teamName: 'Kousoku Sentai Turboranger', colors: ['red', 'yellow', 'blue', 'black', 'pink'], series: 13 },
    { teamName: 'Chikyu Sentai Fiveman', colors: ['red', 'yellow', 'blue', 'black', 'pink'], series: 14 },
    { teamName: 'Choujin Sentai Jetman', colors: ['red', 'yellow', 'blue', 'black', 'pink'], series: 15 },
    { teamName: 'Kyoryu Sentai Zyuranger', colors: ['red', 'yellow', 'blue', 'black', 'pink', 'green'], series: 16 },
    { teamName: 'Gosei Sentai Dairanger', colors: ['red', 'yellow', 'blue', 'green', 'pink', 'white'], series: 17 },
    { teamName: 'Ninja Sentai Kakuranger', colors: ['red', 'yellow', 'blue', 'black', 'white'], series: 18 },
    { teamName: 'Chouriki Sentai Ohranger', colors: ['red', 'yellow', 'blue', 'green', 'black', 'pink'], series: 19 },
    { teamName: 'Gekisou Sentai Carranger', colors: ['red', 'yellow', 'blue', 'green', 'pink'], series: 20 },
    { teamName: 'Denji Sentai Megaranger', colors: ['red', 'yellow', 'blue', 'black', 'pink', 'white'], series: 21 },
    { teamName: 'Seijuu Sentai Gingaman', colors: ['red', 'yellow', 'blue', 'black', 'pink'], series: 22 },
    { teamName: 'Kyukyu Sentai GoGoFive', colors: ['red', 'yellow', 'blue', 'green', 'pink'], series: 23 },
    { teamName: 'Mirai Sentai Timeranger', colors: ['red', 'yellow', 'blue', 'green', 'pink', 'red'], series: 24 },
    { teamName: 'Hyakujuu Sentai Gaoranger', colors: ['red', 'yellow', 'blue', 'black', 'white', 'silver'], series: 25 },
    { teamName: 'Ninpu Sentai Hurricaneger', colors: ['red', 'yellow', 'blue'], series: 26 },
    { teamName: 'Bakuyuu Sentai Abaranger', colors: ['red', 'yellow', 'blue', 'black', 'white'], series: 27 },
    { teamName: 'Tokusou Sentai Dekaranger', colors: ['red', 'yellow', 'blue', 'green', 'pink', 'white'], series: 28 },
    { teamName: 'Mahou Sentai Magiranger', colors: ['red', 'yellow', 'blue', 'green', 'pink'], series: 29 },
    { teamName: 'GoGo Sentai Boukenger', colors: ['red', 'yellow', 'blue', 'black', 'pink', 'silver'], series: 30 },
    { teamName: 'Juken Sentai Gekiranger', colors: ['red', 'yellow', 'blue'], series: 31 },
    { teamName: 'Engine Sentai Go-Onger', colors: ['red', 'yellow', 'blue', 'black', 'green', 'silver', 'gold'], series: 32 },
    { teamName: 'Samurai Sentai Shinkenger', colors: ['red', 'yellow', 'blue', 'green', 'pink', 'gold'], series: 33 },
    { teamName: 'Tensou Sentai Goseiger', colors: ['red', 'yellow', 'blue', 'black', 'pink'], series: 34 },
    { teamName: 'Kaizoku Sentai Gokaiger', colors: ['red', 'yellow', 'blue', 'green', 'pink', 'silver'], series: 35 },
    { teamName: 'Tokumei Sentai Go-Busters', colors: ['red', 'yellow', 'blue'], series: 36 },
    { teamName: 'Zyuden Sentai Kyoryuger', colors: ['red', 'black', 'blue', 'green', 'pink', 'gold', 'cyan', 'gray', 'violet', 'silver'], series: 37 },
    { teamName: 'Ressha Sentai ToQger', colors: ['red', 'yellow', 'blue', 'green', 'pink', 'orange'], series: 38 },
    { teamName: 'Shuriken Sentai Ninninger', colors: ['red', 'yellow', 'blue', 'pink', 'white', 'gold'], series: 39 },
    { teamName: 'Doubutsu Sentai Zyuohger', colors: ['red', 'yellow', 'blue', 'green', 'white'], series: 40 },
    { teamName: 'Uchuu Sentai Kyuranger', colors: ['red', 'yellow', 'blue', 'green', 'black', 'pink', 'silver', 'gold', 'purple', 'sky blue', 'orange', 'red'], series: 41 },
    { teamName: 'Kaitou Sentai Lupinranger vs. Keisatsu Sentai Patranger', colors: ['red', 'blue', 'yellow'], series: 42 },
    { teamName: 'Kishiryu Sentai Ryusoulger', colors: ['red', 'blue', 'pink', 'green', 'black', 'gold'], series: 43 },
    { teamName: 'Mashin Sentai Kiramager', colors: ['red', 'blue', 'yellow', 'green', 'pink'], series: 44 },
    { teamName: 'Kikai Sentai Zenkaiger', colors: ['white', 'red', 'blue', 'yellow', 'pink', 'gold', 'purple'], series: 45 },
    { teamName: 'Avataro Sentai Donbrothers', colors: ['red', 'blue', 'yellow', 'pink'], series: 46 }
    
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