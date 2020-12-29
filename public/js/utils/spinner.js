import dom from './dom';

export const spinnerButton = (container)=>{
    container.innerHTML=''
    container.innerHTML=`
        <button class="btn btn-sm btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status"></span>
            <span class="sr-only">Loading...</span>
        </button>
    `
}

export const spinnerTable = (container)=>{
    container.innerHTML=''
    container.innerHTML=`
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `
}