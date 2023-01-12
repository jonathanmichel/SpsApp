baseScriptUrl = 'https://script.google.com/macros/s/AKfycbwj-sD3MyZgLZo4e32h1c1Lrf6wIUoHEyedCNlhly70LPwiCvs5Axe7dBK9cK_Nhzjn-A/exec'

function parseApiResponse(response) {
    if (response.status_code == 200) {
        return response.data
    } else {
        console.error("Error while fetching data from Google Sheets: " + response.status_code + " - " + response.data)
        return undefined
    }
}

async function fetchData(range) {
    return await jQuery.ajax({
        crossDomain: true,
        url: baseScriptUrl + "?range=" + range,
        method: "GET",
        dataType: "jsonp",
        error: function(response){
            alert("Impossible de récupérer les activités du SPS - Réessayez plus tard");
            console.log(response)
            return undefined
        }
    })
}

nonScolarActivities_promise = fetchData("Extra-scolaire - Activités!A1:J101")
nonScolarEditions_promise = fetchData("Extra-scolaire - Éditions!A1:I201")

Promise.all([nonScolarActivities_promise, nonScolarEditions_promise]).then((values) => {
    // Get received data
    nonScolarActivities = parseApiResponse(values[0])
    nonScolarEditions = parseApiResponse(values[1])

    if(nonScolarActivities != undefined && nonScolarEditions != undefined) {
        // Get all editions and append details from the corresponding activity
        allNonScolarActivities = addDetailsToEditions(nonScolarEditions, nonScolarActivities)

        // Simplified the list with only useful keys
        allNonScolarActivities = filterKeys(allNonScolarActivities, ["ID", ACTIVITY_NAME_COLUMN, "Age max", "Age min", "Format", "Canton", "Genre", "Langue", "Lieu", "Dates", "Description", "ImgSrc", "Inscriptions", "Remarques"])

        console.log("Activités récupérées via l'API")
        console.log(allNonScolarActivities)
    } else {
        console.error("Error with API response")
        console.log(values)
    }
})

/*
Generated on 11/01/2023 15:37:47
const nonScolarActivities0 = [
    {
        "ID": "1",
        "Activité": "Ateliers Programme PLUS",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "8",
        "Age max": "13",
        "Format": "Vacances scolaires",
        "Inscriptions": "2 mois avant",
        "ImgSrc": "",
        "Description": "Des ateliers dans les domaines des sciences, de l'informatique et des mathématiques pour les enfants du canton de Vaud"
    },
    {
        "ID": "2",
        "Activité": "Ateliers scientifiques et techniques",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "12",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": "campMateriaux",
        "Description": "Par la réalisation d'expériences scientifiques et de constructions techniques, les élèves comprendront comment la science nous est utile dans la vie de tous les jours."
    },
    {
        "ID": "3",
        "Activité": "Camps de chimie et biochimie",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "13",
        "Format": "",
        "Inscriptions": "février",
        "ImgSrc": "campChimieFille",
        "Description": "Aimerais-tu partir à la découverte de la matière ? Si tu veux manipuler du matériel scientifique dans un vrai laboratoire de chimie, réaliser des expériences en rapport avec la vie de tous les jours et découvrir le monde de la recherche, ce camp mixte de chimie t’est destiné !"
    },
    {
        "ID": "4",
        "Activité": "Camps multisciences",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "13",
        "Format": "Vacances février",
        "Inscriptions": "février",
        "ImgSrc": "campsScientifiquesTechniques",
        "Description": "Les enfants auront l’occasion d’observer, de bricoler, de s’amuser, d’apprendre et de se familiariser avec les sciences et les  technologies. Ils/elles vont également visiter des laboratoires de l’EPFL et rencontrer des chercheuses et chercheurs."
    },
    {
        "ID": "5",
        "Activité": "Coding club des filles",
        "Genre": "Fille",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "15",
        "Format": "Le samedi",
        "Inscriptions": "",
        "ImgSrc": "codingClub",
        "Description": "Un club gratuit de programmation pour les filles de 11 à 16 ans"
    },
    {
        "ID": "6",
        "Activité": "Coding club for girls (DE)",
        "Genre": "Fille",
        "Langue": "DE",
        "Age min": "11",
        "Age max": "15",
        "Format": "Am samstag",
        "Inscriptions": "",
        "ImgSrc": "codingClub",
        "Description": "(DE) Un club gratuit de programmation pour les filles de 11 à 16 ans"
    },
    {
        "ID": "7",
        "Activité": "Coding club for girls (TI)",
        "Genre": "Fille",
        "Langue": "IT",
        "Age min": "11",
        "Age max": "15",
        "Format": "Il sabato",
        "Inscriptions": "",
        "ImgSrc": "codingClub",
        "Description": "(IT) Un club gratuit de programmation pour les filles de 11 à 16 ans"
    },
    {
        "ID": "8",
        "Activité": "Internet & Code für Mädchen",
        "Genre": "Fille",
        "Langue": "DE",
        "Age min": "9",
        "Age max": "12",
        "Format": "11 samedis",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "internetEtCode",
        "Description": "(DE) Cours d’informatique pour les filles 9 à 11 ans"
    },
    {
        "ID": "9",
        "Activité": "Internet et code pour les filles",
        "Genre": "Fille",
        "Langue": "FR",
        "Age min": "9",
        "Age max": "12",
        "Format": "11 samedis",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "internetEtCode",
        "Description": "Cours d’informatique pour les filles 9 à 11 ans"
    },
    {
        "ID": "10",
        "Activité": "JOM (journée oser tous les métiers)",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "10",
        "Age max": "12",
        "Format": "",
        "Inscriptions": "octobre",
        "ImgSrc": "",
        "Description": "Pour les jeunes de 10-13 ans qui passent la journée sur le campus avec un·e membre de l’EPFL."
    },
    {
        "ID": "11",
        "Activité": "Les maths en jeu",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "8",
        "Age max": "13",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": "mathsEnJeu",
        "Description": "Ateliers semestriels de mathématiques pour les 8-15 ans"
    },
    {
        "ID": "12",
        "Activité": "Les maths, ça m'intéresse",
        "Genre": "Fille",
        "Langue": "FR",
        "Age min": "12",
        "Age max": "14",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": "mathCaMInteresse",
        "Description": "Ateliers semestriels de mathématiques pour les filles de 9H à 11H"
    },
    {
        "ID": "13",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Genre": "Fille",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "13",
        "Format": "11 samedis",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "CoursRoberta_filles",
        "Description": "Cours de robotique pour filles de 11 à 13 ans"
    },
    {
        "ID": "14",
        "Activité": "Construire et programmer un robot",
        "Genre": "Garçon",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "13",
        "Format": "11 samedis",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "",
        "Description": "Cours de robotique pour les garçons de 11 à 13 ans"
    },
    {
        "ID": "15",
        "Activité": "Les robots, c’est l’affaire des filles (DE)",
        "Genre": "Fille",
        "Langue": "DE",
        "Age min": "11",
        "Age max": "13",
        "Format": "11 Samstage",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "",
        "Description": "(DE) Cours de robotique pour filles de 11 à 13 ans"
    },
    {
        "ID": "16",
        "Activité": "Construire et programmer un robot (DE)",
        "Genre": "Garçon",
        "Langue": "DE",
        "Age min": "11",
        "Age max": "13",
        "Format": "11 Samstage",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "",
        "Description": "(DE) Cours de robotique pour les garçons de 11 à 13 ans"
    },
    {
        "ID": "17",
        "Activité": "Mardimathiques",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "14",
        "Format": "Les mardis soir",
        "Inscriptions": "juin",
        "ImgSrc": "mardimathiques",
        "Description": "Comment compter, un peu de géométrie plane cartésienne, quelques jeux de logique ainsi que des énigmes, l’infini et encore bien d’autres sujets intéressants."
    },
    {
        "ID": "18",
        "Activité": "Matériaux super géniaux",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "13",
        "Format": "",
        "Inscriptions": "février",
        "ImgSrc": "campMateriaux",
        "Description": "Des matériaux qui changent de forme aux poudres qui cristallisent en passant par de surprenants liquides."
    },
    {
        "ID": "19",
        "Activité": "Mon projet scientifique",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "13",
        "Age max": "15",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": null,
        "Description": null
    },
    {
        "ID": "20",
        "Activité": "Mon robot est malin",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "11",
        "Age max": "13",
        "Format": "",
        "Inscriptions": "février",
        "ImgSrc": "roberta",
        "Description": "Ce camp, réservé aux jeunes filles et jeunes garçons de 11 à 13 ans, permet de découvrir la robotique et la programmation, ainsi que le campus de l’EPFL. Les jeunes construiront et programmeront des robots, afin d’exécuter certaines des missions du concours robotique FIRST LEGO League."
    },
    {
        "ID": "21",
        "Activité": "Passport Vacances",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "10",
        "Age max": "13",
        "Format": "Le mercredi après-midi",
        "Inscriptions": "",
        "ImgSrc": "passeportVacances",
        "Description": "Des journées passeport-vacances avec des ateliers de sciences en lien avec la thématique de l'air, du temps, de l'informatique ou de la robotique."
    },
    {
        "ID": "22",
        "Activité": "Petits engins pour petites mains",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "8",
        "Age max": "10",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": "petitsEngins",
        "Description": "Les élèves inventent des engins électroniques en utilisant des blocs aimantés (LittleBits), comme un dispositif à roulettes capable d’avancer seul. Ces LittlesBits peuvent être démontées et remontées en de différentes structures."
    },
    {
        "ID": "23",
        "Activité": "Polythèmes",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "8",
        "Age max": "13",
        "Format": "3 mercredis après-midi",
        "Inscriptions": "mai et novembre",
        "ImgSrc": "polythemes",
        "Description": "Ateliers d’expériences scientifiques proposés aux jeunes de 7 à 15 ans."
    },
    {
        "ID": "24",
        "Activité": "Programme ton jeu vidéo",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "13",
        "Age max": "15",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": "programmJeuVideo",
        "Description": "Introduction à l’informatique à travers la programmation de jeux développés en Python. Le cours commence avec des jeux simples comme Chatbot et Mastermind dans la console textuelle, pour ensuite passer aux jeux graphiques tels que Pong, Snake et Angry Bird."
    },
    {
        "ID": "25",
        "Activité": "Toi aussi créé ton appli",
        "Genre": "Fille",
        "Langue": "FR",
        "Age min": "13",
        "Age max": "15",
        "Format": "",
        "Inscriptions": "mai",
        "ImgSrc": "toiAussiCreeTonAppli",
        "Description": "Programmer une application pour téléphone portable. Comment ? En créant tout en s’amusant un programme pour partager et communiquer les informations entre copines."
    },
    {
        "ID": "26",
        "Activité": "Championnat de science «Curieux et inventif»",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "7",
        "Age max": "16",
        "Format": "",
        "Inscriptions": "décembre",
        "ImgSrc": "championnat",
        "Description": "Tournoi scientifique pour les jeunes de 8 à 15 ans à réaliser en équipe"
    },
    {
        "ID": "27",
        "Activité": "First Lego League",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "7",
        "Age max": "16",
        "Format": "",
        "Inscriptions": "août",
        "ImgSrc": "FLL",
        "Description": "Championnat de robotique par équipes – jeunes de 6 à 16 ans"
    },
    {
        "ID": "28",
        "Activité": "World Robotics Olympiades",
        "Genre": "Mixte",
        "Langue": "FR",
        "Age min": "7",
        "Age max": "16",
        "Format": "",
        "Inscriptions": "2 mois avant",
        "ImgSrc": null,
        "Description": null
    }
]
const nonScolarEditions0 = [
    {
        "ID": "0",
        "Statut": "Disponible",
        "Activité": "Ateliers Programme PLUS",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "20-24 février 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "1",
        "Statut": "Disponible",
        "Activité": "Ateliers Programme PLUS",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "10-13 avril 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "2",
        "Statut": "Disponible",
        "Activité": "Ateliers Programme PLUS",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Octobre 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "3",
        "Statut": "Disponible",
        "Activité": "Ateliers scientifiques et techniques",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "4",
        "Statut": "Disponible",
        "Activité": "Ateliers scientifiques et techniques",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "5",
        "Statut": "Disponible",
        "Activité": "Camps de chimie et biochimie",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Août 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "6",
        "Statut": "Disponible",
        "Activité": "Camps multisciences",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "3-7 juillet 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "7",
        "Statut": "Disponible",
        "Activité": "Camps multisciences",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "10-14 juillet 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "8",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Dates CC EPFL",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "9",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "VD",
        "Lieu": "Yverdon",
        "Dates": "Dates CC Yverdon",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "10",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "VD",
        "Lieu": "Nyon",
        "Dates": "Dates CC Nyon",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "11",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "VS",
        "Lieu": "Martigny",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "12",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "VS",
        "Lieu": "Vouvry",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "13",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "VS",
        "Lieu": "Sierre",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "14",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "NE",
        "Lieu": "Neuchâtel",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "15",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "NE",
        "Lieu": "La Chaux-de-Fonds",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "16",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "BE",
        "Lieu": "St-Imier",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "17",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "BE",
        "Lieu": "Bienne",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "18",
        "Statut": "Disponible",
        "Activité": "Coding club des filles",
        "Canton": "FR",
        "Lieu": "Fribourg",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "19",
        "Statut": "Disponible",
        "Activité": "Coding club for girls (DE)",
        "Canton": "VS",
        "Lieu": "Sidders",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "20",
        "Statut": "Disponible",
        "Activité": "Coding club for girls (DE)",
        "Canton": "FR",
        "Lieu": "Freiburg",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "21",
        "Statut": "Disponible",
        "Activité": "Coding club for girls (DE)",
        "Canton": "BE",
        "Lieu": "Bern",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "22",
        "Statut": "Disponible",
        "Activité": "Coding club for girls (DE)",
        "Canton": "BE",
        "Lieu": "Thun",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "23",
        "Statut": "Disponible",
        "Activité": "Coding club for girls (TI)",
        "Canton": "TI",
        "Lieu": "Lugano",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "24",
        "Statut": "Disponible",
        "Activité": "Coding club for girls (TI)",
        "Canton": "TI",
        "Lieu": "Astrona",
        "Dates": null,
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "25",
        "Statut": "Disponible",
        "Activité": "Internet & Code für Mädchen",
        "Canton": "SH",
        "Lieu": "Schaffhouse",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "26",
        "Statut": "Disponible",
        "Activité": "Internet & Code für Mädchen",
        "Canton": "BE",
        "Lieu": "Berne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "27",
        "Statut": "Disponible",
        "Activité": "Internet et code pour les filles",
        "Canton": "FR",
        "Lieu": "Fribourg",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "28",
        "Statut": "Disponible",
        "Activité": "Internet et code pour les filles",
        "Canton": "VS",
        "Lieu": "Martigny",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "29",
        "Statut": "Disponible",
        "Activité": "Internet et code pour les filles",
        "Canton": "GE",
        "Lieu": "Genève",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "30",
        "Statut": "Disponible",
        "Activité": "Internet et code pour les filles",
        "Canton": "VS",
        "Lieu": "Sierre",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "31",
        "Statut": "Disponible",
        "Activité": "Internet et code pour les filles",
        "Canton": "NE",
        "Lieu": "Neuchâtel",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "32",
        "Statut": "Disponible",
        "Activité": "Internet et code pour les filles",
        "Canton": "VD",
        "Lieu": "Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "33",
        "Statut": "Disponible",
        "Activité": "JOM (journée oser tous les métiers)",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "9 novembre 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "34",
        "Statut": "Disponible",
        "Activité": "Les maths en jeu",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "35",
        "Statut": "Disponible",
        "Activité": "Les maths en jeu",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "36",
        "Statut": "Disponible",
        "Activité": "Les maths, ça m'intéresse",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "37",
        "Statut": "Disponible",
        "Activité": "Les maths, ça m'intéresse",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "38",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot",
        "Canton": "VS",
        "Lieu": "Sion",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "39",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot",
        "Canton": "GE",
        "Lieu": "Genève",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "40",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot",
        "Canton": "VD",
        "Lieu": "Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "41",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot",
        "Canton": "FR",
        "Lieu": "Fribourg",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "42",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot",
        "Canton": "NE",
        "Lieu": "Neuchâtel",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "43",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot",
        "Canton": "VD",
        "Lieu": "Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "44",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot (DE)",
        "Canton": "BE",
        "Lieu": "Berne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "45",
        "Statut": "Disponible",
        "Activité": "Construire et programmer un robot (DE)",
        "Canton": "BS",
        "Lieu": "Bâle",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "46",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Canton": "VS",
        "Lieu": "Sion",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "47",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Canton": "GE",
        "Lieu": "Genève",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "48",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Canton": "VD",
        "Lieu": "Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "49",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Canton": "FR",
        "Lieu": "Fribourg",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "50",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Canton": "NE",
        "Lieu": "Neuchâtel",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "51",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles",
        "Canton": "VD",
        "Lieu": "Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "52",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles (DE)",
        "Canton": "BE",
        "Lieu": "Berne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "53",
        "Statut": "Disponible",
        "Activité": "Les robots, c’est l’affaire des filles (DE)",
        "Canton": "BS",
        "Lieu": "Bâle",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "54",
        "Statut": "Disponible",
        "Activité": "Mardimathiques",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "55",
        "Statut": "Disponible",
        "Activité": "Mardimathiques",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "56",
        "Statut": "Disponible",
        "Activité": "Matériaux super géniaux",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Août 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "57",
        "Statut": "Disponible",
        "Activité": "Mon projet scientifique",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Juillet 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "58",
        "Statut": "Disponible",
        "Activité": "Mon robot est malin",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Août 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "59",
        "Statut": "Disponible",
        "Activité": "Mon robot est malin",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Octobre 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "60",
        "Statut": "Disponible",
        "Activité": "Passport Vacances",
        "Canton": "GE",
        "Lieu": "Campus Biotech Genève",
        "Dates": "Juillet 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "61",
        "Statut": "Disponible",
        "Activité": "Petits engins pour petites mains",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "62",
        "Statut": "Disponible",
        "Activité": "Petits engins pour petites mains",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "63",
        "Statut": "Disponible",
        "Activité": "Polythèmes",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "23, 30 novembre et 07 décembre 2022",
        "Inscriptions": "Complet",
        "Remarques": "Potions féériques"
    },
    {
        "ID": "64",
        "Statut": "Disponible",
        "Activité": "Polythèmes",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "18, 25 janvier et 01 février 2023",
        "Inscriptions": "Complet",
        "Remarques": "Electricabrac"
    },
    {
        "ID": "65",
        "Statut": "Disponible",
        "Activité": "Polythèmes",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "14, 21 et 28 juin 2023",
        "Inscriptions": "Complet",
        "Remarques": "Crocorobot"
    },
    {
        "ID": "66",
        "Statut": "Disponible",
        "Activité": "Polythèmes",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "15, 22 et 29 mars 2023",
        "Inscriptions": "Complet",
        "Remarques": "Cortex et matière grise"
    },
    {
        "ID": "67",
        "Statut": "Disponible",
        "Activité": "Programme ton jeu vidéo",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Printemps 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "68",
        "Statut": "Disponible",
        "Activité": "Programme ton jeu vidéo",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Automne 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "69",
        "Statut": "Disponible",
        "Activité": "Toi aussi créé ton appli",
        "Canton": "VD",
        "Lieu": "EPFL Lausanne",
        "Dates": "Août 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "70",
        "Statut": "Disponible",
        "Activité": "Championnat de science «Curieux et inventif»",
        "Canton": "-",
        "Lieu": "EPFL Lausanne",
        "Dates": "25 février 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "71",
        "Statut": "Disponible",
        "Activité": "First Lego League",
        "Canton": "-",
        "Lieu": "EPFL Lausanne",
        "Dates": "17 décembre 2023",
        "Inscriptions": null,
        "Remarques": null
    },
    {
        "ID": "72",
        "Statut": "Disponible",
        "Activité": "World Robotics Olympiades",
        "Canton": "-",
        "Lieu": "EPFL Lausanne",
        "Dates": "13 mai 2023",
        "Inscriptions": null,
        "Remarques": null
    }
]


// Get all editions and append details from the corresponding activity
allNonScolarActivities0 = addDetailsToEditions(nonScolarEditions0, nonScolarActivities0)

// // Simplified the list with only useful keys
allNonScolarActivities0 = filterKeys(allNonScolarActivities0, ["ID", ACTIVITY_NAME_COLUMN, "Age max", "Age min", "Format", "Canton", "Genre", "Langue", "Lieu", "Dates", "Description", "ImgSrc", "Inscriptions", "Remarques"])


console.log("nonScolarActivities0")
console.log(nonScolarActivities0)
console.log("nonScolarEditions0")
console.log(nonScolarEditions0)

console.log("allNonScolarActivities0")
console.log(allNonScolarActivities0)
*/
