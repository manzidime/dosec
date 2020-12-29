const renderRows = (data)=>{
    return data.map(el=>{
        return `
            <tr>
              <td>${el.contribuable}</td>
              <td>${el.num_taxation}</td>
              <td>${el.description}</td>
              <td>${el.date_taxation}</td>
              <td>${el.montant_global}</td>
              <td class="text-center">
                <a class="btn btn-primary btn-sm rounded-0 see-note" data-id="${el.id_taxation}" href="#">
                    print
                </a>
              </td>
            </tr>
        `
    }).join('')
}

export const listNote = (data,container)=>{
    container.innerHTML = `
        <table class="table table-striped table-bordered" id="footer-search">
          <thead>
            <tr>
              <th>Redevable</th>
              <th>Numero taxation</th>
              <th>Taxe</th>
              <th>Date taxation</th>
              <th>Montant</th>
              <th>Imprimer</th>
            </tr>
          </thead>
          <tbody>
             ${renderRows(data)}
          </tbody>
          <tfoot>
            <tr>
              <th>Redevable</th>
              <th>Numero taxation</th>
              <th>Taxe</th>
              <th>Date taxation</th>
              <th>Montant</th>
              <th>Imprimer</th>
            </tr>
          </tfoot>
        </table>
    `
}