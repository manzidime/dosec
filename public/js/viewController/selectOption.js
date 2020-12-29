import {taxeByService} from '../modelController/taxeModel';

export const renderArticleByTypeInPropriete = (idType,article,container)=>{
    container.innerHTML=''
    const articles = article.filter(el=>{
        if(idType==el.id_type){
            return el
        }
    })

    const options = articles.map(el=>{
        return `<option value="${el.id_article}">${el.designation}</option>`
    }).join('')

    const defaultOption = `<option value="" selected="" disabled="">Veillez choisir l'article budgétaire</option>`

    container.innerHTML = options
    container.insertAdjacentHTML('beforeend', defaultOption)
}

//SELECT ENCHAINE: commune
export const renderCommune = (districtId,commune,container,quartierDom)=>{
    quartierDom.innerHTML=''
    container.innerHTML=''
    const communes = commune.filter(el=>{
        if(districtId==el.id_district){
            return el
        }
    })

    const options = communes.map(el=>{
        return `<option value="${el.id_commune}">${el.libelle_commune}</option>`
    }).join('')

    const defaultOption = `<option value="" selected="" disabled="">Veillez choisir une commune</option>`

    container.innerHTML = options
    container.insertAdjacentHTML('beforeend', defaultOption)
}

//SELECT ENCHAINE: quartier
export const renderQuartier = (communeId,quartier,container)=>{
    container.innerHTML=''
    const quartiers = quartier.filter(el=>{
        if(communeId==el.id_commune){
            return el
        }
    })

    const options = quartiers.map(el=>{
        return `<option value="${el.id_quartier}">${el.libelle_quartier}</option>`
    }).join('')

    const defaultOption = `<option value="" selected="" disabled="">Veillez choisir un quartier</option>`

    container.innerHTML = options
    container.insertAdjacentHTML('beforeend', defaultOption)
}

export const renderTaxeByService = async(idSerice,container)=>{
    container.innerHTML=''
    const taxes = await taxeByService(idSerice)
    const res = taxes.map(el=>{
        return `<option data-duree="${el.duree}" value="${el.id_taxe}">${el.designation}</option>`
    }).join('')
    container.innerHTML=res
    container.insertAdjacentHTML('beforeend', `<option value="" selected="">...</option>`)
}

export const renderExercice = (idTaxe,taxeData,exercice)=>{
    exercice.innerHTML=''
    const [taxe] = taxeData.filter(el=>el.id_taxe==idTaxe)
    if(taxe){
        exercice.innerHTML=`${taxe.exercice?taxe.exercice.split(',').map(el=>`<option value="${el}">${el}</option>`).join(''):`<option value="${new Date().getFullYear()}">${new Date().getFullYear()}</option>`}`
    }
}