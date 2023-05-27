import { fromJS } from 'immutable';
import { CHANGE_BANNER, CHANGE_RECOMMEDLIST } from './constants';

const initState = fromJS({
  bannerList: [],
  recommendList: [],
});

const recommend = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case CHANGE_RECOMMEDLIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
};

export default recommend;
