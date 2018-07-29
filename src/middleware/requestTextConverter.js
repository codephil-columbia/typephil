import { GET_CURRENT_LESSON } from '../actions/homepage';

const requestTextConverter = store => next => action => {
     console.log(store, next, action)

     switch(action.type) {
         case GET_CURRENT_LESSON:
            
     }

     return next(action);
}

export default requestTextConverter;