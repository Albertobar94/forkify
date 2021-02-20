import icons from  'url:../../img/icons.svg';

export default class View {

  render(data){

    if(!data || (Array.isArray(data)) && data.length === 0 ) return this.renderError();
    this._data = data;

    const markup = this._generateMarkup();
    this._clear()
    // * inserting fetched data.
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
  update(data){

    // if(!data || (Array.isArray(data)) && data.length === 0 ) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    // * Converting the string of markup to a DOM representation
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // * Converting the node values to an array
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // * Iterating over each element of the array and comparing new elements against old elements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // * Checking if each New node differs from the old node
      // * AND also if it is the actual nodeValue Which is only text
      // * then replace the curEl text with the newEl textContent
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      // * Checking if if each New node differs from the old node
      // * converting the attributes of the newEl that passes the condition
      // * iterating over each attribute of the new array (and because this is the node that changed)
      // * we set the attributes name and value to the curEl 
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => 
          curEl.setAttribute(attr.name, attr.value)
        ) 
      }
    })
  }
  _clear(){
    this._parentElement.innerHTML = '';
  }
  renderSpinner = () => {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
  renderError(message = this._errorMessage){
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
  renderMessage(message = this._message){
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}