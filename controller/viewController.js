//const pdf = require('html-pdf');
path = require('path');
const numberToletter = require('./../utils/numberToLetter');

const catchAsync = require('./../utils/catchAsync');
const District = require('./../model/districtModel');
const Contribuable = require('./../model/contribuableModel');
const Article = require('./../model/articleModel');
const Categorie = require('./../model/categoryModel');
const Vehicule = require('./../model/vehiculeModel');
const Type = require('./../model/typeObjetModel');
const Taxe = require('./../model/taxeModel');
const Exercice = require('./../model/exerciceModel');
const Service = require('./../model/serviceModel');
const Taxation = require('./../model/taxationModel');
const Compte = require('./../model/compteModel');
const Attestation = require('./../model/attestationModel');
const PartDosec = require('./../model/attestationModel');
const User = require('./../model/userModel');
const Site = require('./../model/siteModel');
const Fonction = require('./../model/fonctionModel');
const Taux = require('./../model/tauxModel');
const Commune = require('./../model/communeModel')
const Stat = require('../model/statModel');
// let file = fs.readFileSync(path.join(__dirname, './../views/doc.pug'), 'utf-8');

//Login
exports.login = (req, res) => {
    res.status(200)
    .render('login', {
        title: 'login',
    });
};

//Home
exports.home = catchAsync(async (req, res, next) => {
    const countAgent = await new Stat().countAgent(req.user)
    const agentActif = await new Stat().agentActif(req.user)
    const agentInactif = await new Stat().agentInactif(req.user)

    const countCont = await new Stat().countCont(req.user)
    const contActif = await new Stat().countActif(req.user)
    const contInactif = await new Stat().contInactif(req.user)

    const vehCount = await new Stat().vehCount(req.user)
    const vehActif = await new Stat().vehActif(req.user)
    const vehInactif = await new Stat().vehInactif(req.user)

    const noteCount = await new Stat().noteCount(req.user)
    const noteNoPrint = await new Stat().noteNoprint(req.user)
    const notePrint = await new Stat().notePrint(req.user)

    const docCount = await new Stat().docCount(req.user)
    const docPrint = await new Stat().docPrint(req.user)
    const docNoPrint = await new Stat().docNoPrint(req.user)

    const taxCount = await new Stat().taxCount(req.user)
    const taxSum = await new Stat().taxSum(req.user)
    const taxValidCount = await new Stat().taxValidCount(req.user)
    const taxValidSum = await new Stat().taxValidSum(req.user)
    const taxNoValidCount = await new Stat().taxNoValidCount(req.user)
    const taxNoValidSum = await new Stat().taxNoValidSum(req.user)
    const taxAttCount = await new Stat().taxAttCount(req.user)
    const taxAttSum = await new Stat().taxAttSum(req.user)

    res.status(200)
    .render('home', {
        countAgent,
        agentActif,
        agentInactif,
        countCont,
        contActif,
        contInactif,
        vehActif,
        vehCount,
        vehInactif,
        noteCount,
        noteNoPrint,
        notePrint,
        docCount,
        docPrint,
        docNoPrint,
        taxCount,
        taxSum,
        taxValidCount,
        taxValidSum,
        taxNoValidCount,
        taxNoValidSum,
        taxAttCount,
        taxAttSum,
        title: 'home',
    });
});

//My acount
exports.myAcount = (req, res) => {
    res.status(200)
    .render('my-acount', {
        title: 'My acount',
    });
};

//New Person
exports.newPerson = catchAsync(async (req, res, next) => {
    const districts = await new District().getAll();
    const contribuables = await new Contribuable().getAll(req.user)
    // const types = await new Type().getAll(req.user);
    res.status(200)
    .render('new-contribuable', {
        title: 'Nouveau contribuable',
        districts,
        contribuables,
        // types
    });
});

//New propriete
exports.newPropriete = catchAsync(async (req, res, next) => {
    const contribuables = await new Contribuable().getAll(req.user)
    const services = await new Service().getAll(req.user)
    const categories = await new Categorie().getAll();
    const types = await new Type().getAll(req.user);
    const articles = await new Article().getAll(req.user)

    res.status(200)
        .render('new-propriete', {
            title: 'Nouvelle propriete',
            contribuables,
            services,
            types,
            articles,
            categories
        });
});

//List Person
exports.listPerson = catchAsync(async (req, res, next) => {
    res.status(200)
    .render('all-person', {
        title: 'List person',
    });

});

//All vehicule
exports.allVehicule = catchAsync(async (req, res, next) => {
    const articles = await new Article().getAll(req.user);
    const categories = await new Categorie().getAll();
    const contribuables = await new Contribuable().getAll(req.user);
    const types = await new Type().getAll(req.user);

    res.status(200)
    .render('all-vehicule', {
        title: 'All car',
        articles,
        categories,
        contribuables,
        types,
    });
});

exports.newTaxation = catchAsync(async (req, res, next) => {
    const services = await new Service().getAll(req.user);
    const contribuables = await new Contribuable().getAll(req.user);
    const taux = await new Taux().getTauxCurent();
    res.status(200)
    .render('new-taxation', {
        title: 'New Taxation',
        contribuables,
        services,
        taux,
    });
});

//All taxation
exports.allTaxation = catchAsync(async (req, res, next) => {
    const taxations = await new Taxation().getAll(req.user);
    const services = await new Service().getAll(req.user);
    const contribuables = await new Contribuable().getAllVehicules();
    const exercices = await new Exercice().getAll();
    const comptes = await new Compte().getAll();

    res.status(200)
    .render('all-taxation', {
        title: 'all taxation',
        taxations,
        services,
        contribuables,
        exercices,
        comptes,

    });
});

exports.allTaxationValidate = catchAsync(async (req, res, next) => {
    const taxations = await new Taxation().getValide(req.user);
    const services = await new Service().getAll(req.user);
    const contribuables = await new Contribuable().getAll(req.user);
    const exercices = await new Exercice().getAll();
    const comptes = await new Compte().getAll();

    res.status(200)
    .render('all-taxation-validate', {
        title: 'All taxation validate',
        taxations,
        services,
        contribuables,
        comptes,
    });
});

exports.newAttestation = catchAsync(async (req, res, next) => {
    const attestations = await new Attestation().getTaxOrd(req.user);
    res.status(200)
    .render('new-attestation', {
        title: 'new attestation',
        attestations,
    });
});

exports.allAttestation = catchAsync(async (req, res, next) => {
    const attestations = await new Attestation().getAll(req.user);
    res.status(200)
    .render('all-attestation', {
        title: 'all attestation',
        attestations,
    });
});

exports.partDosec = catchAsync(async (req, res, next) => {
    const parts = await new Attestation().statPartDosec();
    res.status(200)
    .render('part-dosec', {
        title: 'Part dosec',
        parts,
    });
});

exports.apiDosec = catchAsync(async (req, res, next) => {
    const notes = await new Attestation().noteCalcul();
    res.status(200)
    .render('api-dosec', {
        title: 'Api',
        notes,
    });
});

exports.note = catchAsync(async (req, res, next) => {
    const notes = await new Taxation().note(req.user);
    res.status(200)
    .render('note', {
        title: 'Note',
        notes,
    });
});

/*Fonctions countOccurences et occurenceArticle permettent
* de compter les occurences d'un article dans un tableau afin de bien
* formater l'affichage*/
function countOccurences(tab){
    var result = {};
    tab.forEach(function(elem){
        if(elem in result){
            result[elem] = ++result[elem];
        }
        else{
            result[elem] = 1;
        }
    });
    return result;
}

const occurenceArticle = (body)=>{
    const article = body.map(el=>el.designation_article)

    const occurence = countOccurences(article);
    const keys = Object.keys(occurence)
    const values = Object.values(occurence)

    return keys.map((el,index)=>{
        const obj = {}
        obj['designation_article']=`${el}(x${values[index]})`
        return obj
    })
}

exports.doc = catchAsync(async (req, res, next) => {
    const host = req.get('host')
    console.log(`${host}/css/note.css`)
    const newTaxation = new Taxation()
    const doc = await newTaxation.getOneDoc(req.params.id);
    const resArticles = await newTaxation.getAllArticleFromTaxation(req.params.id);
    const articles = occurenceArticle(resArticles)

    //Mise à jour de la taxation
    /*A chaque affichage de la note de calcul, nous marquons le champ print à 1
    * ce que cela signifie que la note est imprimée.*/
    await newTaxation.marquePrint(req.params.id);

    doc[0].montant_letter = numberToletter(`${doc[0].montant_global}`);
    res.status(200)
    .renderPDF('doc', {
        title: 'document',
        doc,
        articles,
        host
    }, {
        printBackground: true,
        filename: 'note_calcul.pdf',
        pdfOptions: {
            format: 'A5',
            landscape: true,
            margin: {
                top: '10px',
                bottom: '10px',
                left: '10px',
                right: '10px',
            },
        },
    });
});

exports.newUser = catchAsync(async (req, res, next) => {
    const sites = await new Site().getAll();
    const fonctions = await new Fonction().getAll();
    res.status(200)
    .render('new-user', {
        title: 'Création utilisateur',
        sites,
        fonctions,
    });
});

//PAGE ALL USER
exports.allUser = catchAsync(async (req, res, next) => {
    res.status(200)
    .render('all-user', {
        title: 'All users',
    });
});

//PAGE SITE
exports.site = catchAsync(async (req, res, next) => {
    const communes = await new Commune().getAll()
    const taxes = await new Taxe().getAll(req.user)
    res.status(200)
    .render('site', {
        title: 'Handling site',
        communes,
        taxes
    });
});

exports.service = catchAsync(async (req, res, next) => {
    res.status(200)
    .render('service', {
        title: 'Handling service',
    });
});

exports.tarif = catchAsync(async (req, res, next) => {

    const categories = await new Categorie().getAll()
    const articles = await new Article().getAll(req.user)
    const exercices = await new Exercice().getAll()
    const taxes = await new Taxe().getAll(req.user)

    res.status(200)
    .render('tarif', {
        title: 'Handling tarif',
        categories,
        articles,
        exercices,
        taxes
    });
});

//Taxe
exports.taxe = catchAsync(async(req,res,next)=>{
    const types = await new Type().getAll(req.user)
    const services = await new Service().getAll(req.user)

    res.status(200).render('taxe',{
        title:'Création des taxes',
        types,
        services
    })
})

//Taxe
exports.article = catchAsync(async(req,res,next)=>{
    const types = await new Type().getAll(req.user)

    res.status(200).render('article',{
        title:'Création des articles',
        types,
    })
})

exports.taux = catchAsync(async(req,res,next)=>{
    const taux = await new Taux().getAll()
    res.status(200).render('taux',{
        title:'creéation du taux',
        taux,
    })
})

exports.print = catchAsync(async (req, res, next) => {
    const docs = await new Attestation().doc(req.user);
    res.status(200)
    .render('impression', {
        title: 'Print document',
        docs,
    });
});

exports.doc2 = catchAsync(async (req, res, next) => {

    const doc = await new Attestation().docByPlaque(req.params.id, req.params.plaque);
    let dateExp
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};

    if(doc[0].id_taxe === 15){
        const semestre = Date.now() + 16018828327
        const date = new Date(semestre)
        dateExp = date.toLocaleString("fr-FR",options)
    }
    else{
        const year = Date.now() + 32037656655.3
        const date = new Date(year)
        dateExp = date.toLocaleString("en-GB",options)
    }

    /*Mise à jour du document: l'attestation concernant cet attestation sera marquée
    * print=1 cela veut dire qu'elle a été imprimée.*/
    await new Attestation().marquePrint(req.params.id)
    res.status(200)
    .renderPDF('doc-2', {
        title: 'document',
        doc,
        dateExp
    }, {
        printBackground: true,
        filename: `document-${doc[0].numero_plaque}.pdf`,
        pdfOptions: {
            format: 'A6',
            landscape: false,
            preferCSSPageSize:true,
            margin: {
                top: 'px',
                bottom: '0px',
                left: '0px',
                right: '0px',
            },
        },
    });
});





