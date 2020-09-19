//const pdf = require('html-pdf');
const fs = require('fs');
path = require('path');
const qr = require('qrcode');
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

// let file = fs.readFileSync(path.join(__dirname, './../views/doc.pug'), 'utf-8');

//Login
exports.login = (req, res) => {
    res.status(200)
    .render('login', {
        title: 'login',
    });
};

//Home
exports.home = (req, res) => {
    res.status(200)
    .render('home', {
        title: 'home',
    });
};

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

    res.status(200)
    .render('new-person', {
        title: 'new Person',
        districts,
    });
});

//List Person
exports.listPerson = catchAsync(async (req, res, next) => {
    const contribuables = await new Contribuable().getAll(req.user);
    const districts = await new District().getAll();

    res.status(200)
    .render('all-person', {
        title: 'List person',
        contribuables,
        districts,
    });

});

//New vehicule
exports.newVehicule = catchAsync(async (req, res, next) => {
    const categories = await new Categorie().getAll();
    const contribuables = await new Contribuable().getAll(req.user);
    const types = await new Type().getAll();

    res.status(200)
    .render('new-vehicule', {
        title: 'New car',
        categories,
        contribuables,
        types,
    });
});

//All vehicule
exports.allVehicule = catchAsync(async (req, res, next) => {
    const vehicules = await new Vehicule().getAll(req.user);
    const articles = await new Article().getAll();
    const categories = await new Categorie().getAll();
    const contribuables = await new Contribuable().getAll(req.user);
    const types = await new Type().getAll();
    const taxes = await new Type().getAll();

    res.status(200)
    .render('all-vehicule', {
        title: 'All car',
        vehicules,
        articles,
        categories,
        contribuables,
        types,
        taxes,
    });
});

exports.newTaxation = catchAsync(async (req, res, next) => {
    const services = await new Service().getAll();
    const contribuables = await new Contribuable().getAllVehicules();
    const exercices = await new Exercice().getAll();

    res.status(200)
    .render('new-taxation', {
        title: 'New Taxation',
        contribuables,
        services,
        exercices,
    });
});

//All taxation
exports.allTaxation = catchAsync(async (req, res, next) => {
    const taxations = await new Taxation().getAll(req.user);
    const services = await new Service().getAll();
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
    const services = await new Service().getAll();
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
    const taxations = await new Taxation().getValide(req.user);

    res.status(200)
    .render('new-attestation', {
        title: 'new attestation',
        taxations,
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
    const notes = await new Taxation().note();
    res.status(200)
    .render('note', {
        title: 'Note',
        notes,
    });
});

exports.doc = catchAsync(async (req, res, next) => {
    const doc = await new Taxation().getOneDoc(req.params.id);
    doc[0].montant_letter = numberToletter(`${doc[0].montant_global}`);
    res.status(200)
    .renderPDF('doc', {
        title: 'document',
        doc,
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


