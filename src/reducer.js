export const initialState = {
    user : null,
    classroom : null,
}

const reducer = (state,action) =>{
    switch(action.type){
        case 'SET_USER' :
            return {
                ...state,
                user : action.user
            }
        case 'SET_CLASSROOM' : 
            return{
                ...state,
                classroom : action.classroom
            }
        default :
            return state;
    }
}
export default reducer;