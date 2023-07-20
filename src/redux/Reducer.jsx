import * as actionTypes from "./ActionTypes";

const initialState = {
  ingrediants: [
    { type: "salad", amount: 0 },
    { type: "cheese", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalAmount: 80,
  purchsesAble: false,
  orders: [],
  order_is_loading: true,
  errorMessage: "",
  order_load_err: false,
  userId: null,
  tokenId: null,
  auth_is_loading: false,
  auth_error_message: null,
};

let ingrediantPrice = {
  salad: 20,
  cheese: 40,
  meat: 50,
};

const Reducer = (state = initialState, action) => {
  let ingrediantArr = [...state.ingrediants];
  switch (action.type) {
    case actionTypes.ADD_INGREDIANT:
      for (let ingrediant of ingrediantArr) {
        if (ingrediant.type == action.payload) {
          ingrediant.amount += 1;
        }
      }
      return {
        ...state,
        ingrediants: ingrediantArr,
        totalAmount: state.totalAmount + ingrediantPrice[action.payload],
      };
    case actionTypes.REMOVE_INGREDIANT:
      for (let ingrediant of ingrediantArr) {
        if (ingrediant.type == action.payload) {
          if (ingrediant.amount > 0) {
            ingrediant.amount -= 1;
            return {
              ...state,
              ingrediants: ingrediantArr,
              totalAmount: state.totalAmount - ingrediantPrice[action.payload],
            };
          }
        }
      }
    case actionTypes.UPDATE_PURCSHEABLE:
      let sum = 0;
      for (let item of ingrediantArr) {
        sum += item.amount;
      }

      return {
        ...state,
        purchsesAble: sum > 0,
      };
    case actionTypes.RESET_STORE:
      return {
        ...state,
        ingrediants: [
          { type: "salad", amount: 0 },
          { type: "cheese", amount: 0 },
          { type: "meat", amount: 0 },
        ],
        totalAmount: 80,
        purchsesAble: false,
      };
    case actionTypes.LOAD_ORDERS:
      let orders = [];
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key,
          
        });
      }
      return {
        ...state,
        orders: orders,
        order_is_loading: false,
      };

    case actionTypes.ORDER_LOAD_ERROR:
      return {
        ...state,
        order_is_loading: false,
        orders: [],
        errorMessage: action.payload,
        order_load_err: true,
      };
    // authenication

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        tokenId: action.payload.tokenId,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        tokenId: null,
        userId: null,
        auth_error_message: null,
      };
    case actionTypes.AUTH_IS_LOADING:
      return {
        ...state,
        auth_is_loading: action.payload,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        auth_error_message: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
