export const templateNotification = (data)=>{
    const container = document.querySelector('.container-notification')
    container.innerHTML=''
    data.forEach(el=>{
        const html = `
            <div class="media">
<!--            <img class="img-fluid" src="/images/Logo.png" alt="images" width="50"/>-->
              <div class="media-body ml-3 align-self-center">
                <div class="float-right">
                  <div class="btn-group card-option">
                      <button class="btn btn-danger btn-delete-notification btn-sm rounded-0" data-id="${el.id_notification}">
                        <i class="feather icon-trash-2"></i>
                      </button>
                  </div>
                </div>
                <h6 class="mb-0 ${el.read===1?'readed':''}">${el.titre}</h6>
                <p class="mb-0 d-inline-block f-12 text-muted ${el.read===1?'readed':''}"> &bull; ${el.date}</p>
                <span class="mb-1 d-block ${el.read===1?'readed':''}">${el.description}</span>
                <span class="mb-0 font-black ${el.read===1?'readed':''}">${el.nom}</span>
                <a class="btn btn-primary btn-read-notification btn-sm rounded-0" data-id="${el.id_notification}" href="${el.link}">Voir</a>
              </div>
            </div>
            <hr class="mb-4"/>
        `
        container.insertAdjacentHTML('beforeend', html)
    })
}

export const renderIcon = (data)=>{
    const li = document.querySelector('.container-icon')
    const notifications = data.filter(el=>{
        if(el.read===0){
            return el
        }
    })
    if(notifications.length >= 1){
        li.innerHTML= `
            <a class="pc-head-link mr-0" data-toggle="modal" href="#" data-target="#notification-modal">
                <i class="fas fa-bell"></i>
                <span class="badge badge-success pc-h-badge">${notifications.length}</span>
            </a>
        `
    }
    else if(notifications.length===0){
        li.innerHTML= `
            <a class="pc-head-link mr-0" data-toggle="modal" href="#" data-target="#notification-modal">
                <i class="fas fa-bell"></i>
                <span class="badge badge-danger pc-h-badge">0</span>
            </a>
        `
    }

}