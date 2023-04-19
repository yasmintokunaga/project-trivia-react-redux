import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '/path/to/your/root/reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


export default store;