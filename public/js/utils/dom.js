export default {
    formLogin: document.getElementById('form-login'),
    login: document.getElementById('login'),
    password: document.getElementById('password'),

    logout: document.getElementById('logout'),

    formChangePassword: document.getElementById('form-change-password'),
    oldPassword: document.getElementById('old-password'),
    newPassword: document.getElementById('new-password'),
    confirmPassword: document.getElementById('confirm-password'),

    formNewPerson: document.getElementById('form-new-person'),
    nomPersonne: document.getElementById('nom_personne'),
    telephone: document.getElementById('telephone'),
    ville: document.getElementById('ville'),
    district: document.getElementById('district'),
    commune: document.getElementById('commune'),
    quartier: document.getElementById('quartier'),
    avenue: document.getElementById('avenue'),
    numero: document.getElementById('numero'),
    observation: document.getElementById('observation'),

    btnEdit: document.querySelectorAll('.btn-edit'),

    districtAr: document.querySelectorAll('.district'),
    communeAr: document.querySelectorAll('.commune'),
    quartierAr: document.querySelectorAll('.quartier'),

    formUpdatePerson: document.querySelectorAll('.form-update-person'),

    contentTable: document.querySelector('.content-table'),
    rowData: document.querySelectorAll('.row-data'),

    btnDelete: document.querySelectorAll('.btn-delete'),

    fomrNewVehicule: document.getElementById('form-new-vehicule'),
    contribuable: document.getElementById('contribuable'),
    contribuables: document.querySelectorAll('.contribuable'),
    chassis: document.getElementById('chassis'),
    plaque: document.getElementById('plaque'),
    model: document.getElementById('model'),
    marque: document.getElementById('marque'),
    couleur: document.getElementById('couleur'),
    charge: document.getElementById('charge'),
    circulation: document.getElementById('circulation'),
    articles: document.getElementById('articles'),
    category: document.getElementById('category'),

    type: document.getElementById('type'),
    taxe: document.getElementById('taxe'),

    types: document.querySelectorAll('.types'),
    budge: document.querySelectorAll('.budge'),
    taxes: document.querySelectorAll('.taxes'),

    btnDeleteCar: document.querySelectorAll('.btn-delete-car'),
    btnDeleteTaxation: document.querySelectorAll('.btn-delete-taxation'),

    formUpdateV: document.querySelectorAll('.form-update-vehicule'),
    formUpdateTaxation: document.querySelectorAll('.form-update-taxation'),
    formNewAttestation: document.querySelectorAll('.form-new-attestation'),
    penalite:document.getElementById('penalite'),
    formNewTaxation: document.getElementById('form-new-taxation'),
    exercice: document.getElementById('exercice'),
    vehicule: document.getElementById('vehicule'),
    vehicules: document.querySelectorAll('.vehicule'),
    service: document.getElementById('service'),
    services: document.querySelectorAll('.services'),
    nomDeclarant: document.getElementById('nom_declarant'),
    nomDeclarantUpdate: document.querySelectorAll('.nom_declarant'),
    telephoneDeclarant: document.getElementById('telephone_declarant'),
    telephoneDeclarantUpdate: document.querySelectorAll('.telephone_declarant'),
    echeance: document.getElementById('echeance'),
    echeanceUpdate: document.querySelectorAll('.echeance'),

    formValidation: document.querySelectorAll('.form-validation-taxation'),
    compte: document.querySelectorAll('.compte'),
    avis: document.querySelectorAll('.avis'),

    dateAttestation: document.getElementById('d-attestation'),
    numeroBordereau: document.getElementById('n-bordereau'),
    montant: document.getElementById('montant'),
    montantPenalite: document.getElementById('m-penalite'),
    montantGlobal: document.getElementById('m-global'),
    taxation: document.getElementById('taxation'),


    containerError: document.getElementById('container-error'),

    chartOne: document.getElementById('chartOne'),
};