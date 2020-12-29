import dom from './dom';

//Alert
export const alert = (type, message,container) => {
    container.innerHTML=''
    const sta = type === 'alert-danger' ? 'Opération échouée!' : 'Opération réussie';

    const alert = `<div class="alert rounded-0 ${type} alert-dismissible fade show" role="alert">
        <strong>${sta}</strong><br>${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>`;

    container.insertAdjacentHTML('beforeend', alert);
};

export const clearHtml = (container) => {
    container.innerHTML = '';
};