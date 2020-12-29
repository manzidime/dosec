export default ()=>{
    //Remove modal
    document.querySelector('body').classList.remove('modal-open')
    document.querySelector('.modal-backdrop').parentElement.removeChild(document.querySelector('.modal-backdrop'))
}