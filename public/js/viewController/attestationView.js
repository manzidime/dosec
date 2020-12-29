// const renderBtn = (el) => {
//     if (el.active === 'false') {
//         return `
//             <button class="btn btn-primary btn-restore-vehicule btn-sm rounded-0" data-row="${el.taxation}">
//                 <i class="feather icon-refresh-ccw"></i>
//             </button>
//
//         `;
//     }
//     else {
//         return `
//             <button class="btn btn-danger btn-delete-vehicule btn-sm rounded-0" data-row="${el.taxation}">
//                 <i class="feather icon-trash-2"></i>
//             </button>
//         `;
//     }
// };
const rowsAttestation = (data)=>{
    return data.map(el=>{
        return `
            <tr>
              <td>${el.nom}</td>
              <td>${el.taxe}</td>
              <td>${el.date_taxation}</td>
              <td>${el.date_validation}</td>
              <td>${el.num_taxation}</td>
              <td>${el.montant_global}</td>
              <td>${el.devise}</td>
              <td>
                <a class="btn btn-info btn-sm rounded-0 mr-1" href="#" data-toggle="modal" data-title="Operation" data-target=".modal-attestation-${el.id_taxation}">
                    <i class="feather icon-edit"></i>
                </a>
                <div class="modal fade modal-attestation-${el.id_taxation}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content rounded-0">
                      <div class="modal-header bg-primary py-2">
                        <h5 class="modal-title text-light" id="myLargeModalLabel">Nouvel attestation</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="card-body">
                          <form class="form-new-attestation" data-id="${el.id_taxation}">
                            <div class="container-error"></div>
                            <div class="row">
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="floating-label" for="d-attestation">Date attestation</label>
                                  <input class="form-control-sm form-control rounded-0 date_attestation pc-datepicker-2" type="text" required="required"/>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <label class="floating-label" for="taxation">Taxation</label>
                                <select class="form-control form-control-sm taxation" readonly="">
                                  <option value="${el.id_taxation}" selected="selected">${el.num_taxation} | ${el.date_taxation}</option>
                                </select>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="floating-label" for="montant">Montant</label>
                                  <input class="montant form-control form-control-sm rounded-0" type="text" readonly value="${el.montant}"/>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="floating-label" for="m-penalite">Montant Penalite</label>
                                  <input class="form-control form-control-sm rounded-0 penalite" type="text" readonly value="${(el.montant*1) * (el.penalite*1)/100}"/>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="floating-label" for="m-global">Montant global</label>
                                  <input class="form-control form-control-sm rounded-0 montant_global" type="text" readonly value="${el.montant_global}"/>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="floating-label" for="">Devise</label>
                                  <input class="form-control form-control-sm rounded-0 devise" type="text" readonly value="${el.devise}"/>
                                </div>
                              </div>
                              <div class="col-sm-3">
                                <div class="form-group">
                                  <label class="floating-label" for="n-bordereau">Numero bordereau</label>
                                  <input class="form-control form-control-sm rounded-0 numero_bordereau" type="text" required=""/>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="form-group">
                                  <label class="floating-label" for="avis">Avis</label>
                                  <select class="form-control avis form-control-sm rounded-0">
                                    <option value="favorable" selected="selected">Favorable</option>
                                    <option value="defavorable">Non favorable</option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-12 text-right">
                                <button class="btn btn-primary btn-atteste-taxation rounded-0 btn-sm b" type="submit">Enregistrer</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr> 
        `
    })
}
export const listAttestation = (data,container) => {
    container.innerHTML = `<table class=" table table-striped table-bordered" id="footer-search">
            <thead>
                <tr>
                  <th>Redevable</th>
                  <th>Taxe</th>
                  <th>Date taxation</th>
                  <th>Date validation</th>
                  <th>Num taxation</th>
                  <th>Montant</th>
                  <th>Devise</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${rowsAttestation(data)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Redevable</th>
                  <th>Taxe</th>
                  <th>Date taxation</th>
                  <th>Date validation</th>
                  <th>Num taxation</th>
                  <th>Montant</th>
                  <th>Devise</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`;
};