import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext=createContext();
const CardDispatchContext=createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case "ADD":
            return[...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case "REMOVE":
            let newArr=[...state]
            newArr.splice(action.index,1)
            return newArr;
            case "UPDATE":
                return state.map(food => {
                    if (food.id === action.id) {
                        return {
                            ...food,
                            qty: parseInt(action.qty) + parseInt(food.qty),
                            price: action.price + food.price
                        };
                    }
                    return food; // Return unchanged element for non-matching IDs
                });            
        case "DROP":
            let emptyarr=[]
            return emptyarr
        default:
            console.log("error in reducer");
    }
}

export const CartProvider = ({children}) => {
    const [state,dispatch]=useReducer(reducer,[]);
  return (
    <CardDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CardDispatchContext.Provider>
  )
}

export const UseCart=()=>useContext(CartStateContext);
export const UseDispatchCart=()=>useContext(CardDispatchContext);

