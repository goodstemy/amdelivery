


const initialState = {
    loadingDataIsOver: true,
    citySelected: true,
    allItems: [],
    idItemForAdding: null,
    quantity: 1,
    itemsInCart: [],
    currentOrder: []

}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "CITY_SELECTED":
            return {
                ...state,
                citySelected: true
            }
        case "DATA_FIRSTLOAD":
            return {
                ...state,
                loadingDataIsOver: true,
                allItems: action.payload
            }
        case "GET_ID":
            return {
                ...state,
                idItemForAdding: action.payload
            }
        case "ID_NULL":
            return {
                ...state,
                idItemForAdding: null,
                quantity: 1
            }
        case "PLUS_QUANT":
            return {
                ...state,
                quantity: state.quantity+1
            }
        case "MINUS_QUANT":
            return {
                ...state,
                quantity: state.quantity-1
            }
        case "ADD_TO_CART": {
            const {id} = action.payload
            const findItem = state.allItems.filter(item => item.id === id);
            const newItem = {
                name: findItem[0].name,
                id: findItem[0].id,
                price: findItem[0].price,
                quantity: action.payload.quantity
            }
            return {
                ...state,
                itemsInCart: [...state.itemsInCart, newItem],
                idItemForAdding: null,
                quantity: 1
            }
        }
        case "CHANGE_QUANT":{
            const {id, quantity} = action.payload;
            const itemIndex = state.itemsInCart.findIndex(item => item.id === id);
            const findItem = state.allItems.filter(item => item.id === id);
            const newItem = {
                name: findItem[0].name,
                id: findItem[0].id,
                price: findItem[0].price,
                quantity: state.itemsInCart[itemIndex].quantity + quantity
            }

            return {
                ...state,
                itemsInCart: [...state.itemsInCart.slice(0, itemIndex), newItem, ...state.itemsInCart.slice(itemIndex+1)],
                idItemForAdding: null,
                quantity: 1
            }
        }

        case "PLUS_QUANT_CART": {

            const id = action.payload;
            const itemIndex = state.itemsInCart.findIndex(item => item.id === id);
            const findItem = state.allItems.filter(item => item.id === id);
            const newItem = {
                name: findItem[0].name,
                id: findItem[0].id,
                price: findItem[0].price,
                quantity: state.itemsInCart[itemIndex].quantity + 1
            }

            return {
                ...state,
                itemsInCart: [...state.itemsInCart.slice(0, itemIndex), newItem, ...state.itemsInCart.slice(itemIndex+1)],
                idItemForAdding: null,
                quantity: 1
            }
        }

        case "MINUS_QUANT_CART": {

            const id = action.payload;
            const itemIndex = state.itemsInCart.findIndex(item => item.id === id);
            const findItem = state.allItems.filter(item => item.id === id);
            const newItem = {
                name: findItem[0].name,
                id: findItem[0].id,
                price: findItem[0].price,
                quantity: state.itemsInCart[itemIndex].quantity - 1
            }

            return {
                ...state,
                itemsInCart: [...state.itemsInCart.slice(0, itemIndex), newItem, ...state.itemsInCart.slice(itemIndex+1)],
                idItemForAdding: null,
                quantity: 1
            }
        }

        case "ADD_TO_ORDER":{
            console.log(state.currentOrder);
            const newOrder = action.payload.filter(item => item.quantity > 0)
            return {
                ...state,
                currentOrder: [newOrder]
            }
        }
            
        

        default :
            return state
    }
}

export default reducer;