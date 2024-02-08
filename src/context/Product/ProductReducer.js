import {
  REVIEW_PRODUCT,
  PRODUCT_INDEX,
  REVIEW_PRODUCT_SUBGROUP,
  STEP,
  SHOW_MESSAGE,
  RESET_REVIEW_SUBGROUP,
  CHANGE_STATE_MESSAGE,
  REJECTED_PRODUCT,
  ACCEPTED_PRODUCT,
  UPDATE_PRODUCTS,
  RESET_PRODUCTS_STATE,
  RESET_ALL_REVIEWS,
} from "types/index";

const ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case REVIEW_PRODUCT:
      return {
        ...state,
        reviewed: !state.reviewed?.includes(payload)
          ? [...state.reviewed, payload]
          : state.reviewed,
      };
    case PRODUCT_INDEX:
      return {
        ...state,
        productIndex: payload,
      };

    case REJECTED_PRODUCT:
      return {
        ...state,
        rejected: payload,
      };

    case ACCEPTED_PRODUCT:
      return {
        ...state,
        accepted: payload,
      };

    case REVIEW_PRODUCT_SUBGROUP:
      const { idSubgroup, counter } = payload;

      let isIndexExist = !state.reviewedSubgroup.some(
        (reviewed) => reviewed.id === idSubgroup
      );

      const addReviewSubgroup = isIndexExist
        ? [
            ...state.reviewedSubgroup,
            {
              id: idSubgroup,
              counter,
            },
          ]
        : state.reviewedSubgroup.map((reviewed) => {
            return reviewed.id === idSubgroup
              ? {
                  id: reviewed.id,
                  counter,
                }
              : reviewed;
          });

      return {
        ...state,
        reviewedSubgroup: addReviewSubgroup,
      };

    case STEP:
      return {
        ...state,
        step: payload,
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        isMessageActive: !state.isMessageActive,
      };

    case CHANGE_STATE_MESSAGE:
      return {
        ...state,
        isMessageActive: payload,
      };

    case RESET_REVIEW_SUBGROUP:
      return {
        ...state,
        reviewedSubgroup: [],
        reviewed: [],
        productIndex: 1,
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        isUpdateProducts: true,
      };
    case RESET_PRODUCTS_STATE:
      return {
        ...state,
        isUpdateProducts: false,
      };
    case RESET_ALL_REVIEWS:
      return {
        ...state,
        reviewed: [],
        rejected: [],
        accepted: [],
        productIndex: 1,
        reviewedSubgroup: [],
      };

    default:
      return state;
  }
};

export default ProductReducer;
