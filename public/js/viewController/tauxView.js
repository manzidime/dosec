const listTaux = (data) => {
    return data.map(el=>{
        return  `
          <tr class="row-data" data-row="${el.id}">
            <td>${el.valeur}</td>
            <td>${el.devise}</td>
            <td>${el.date}</td>
          </tr>
    `
    }).join('')
}

export const templateTaux = (data,container)=>{
    container.innerHTML = `<table class=" table table-striped table-bordered" id="footer-search2">
            <thead>
                <tr>
                  <th>Valeur</th>
                  <th>Devise</th>
                  <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${listTaux(data)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Valeur</th>
                  <th>Devise</th>
                  <th>Date</th>
                </tr>
            </tfoot>
        </table>`
}