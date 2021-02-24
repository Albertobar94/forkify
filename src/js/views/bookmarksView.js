import View from "./View";
import previewView from "./previewView";


class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerRender(handler){
    window.addEventListener('load', handler)
  }
  _generateMarkup() {
    // * this converts to a string and returns
    return this._data.map( bookmark => previewView.render(bookmark, false) ).join('');

  }
  
}

export default new BookmarksView;