import { reducer as recommend } from '../application/Recommend/store';
import { reducer as singer } from '../application/Singers/store';
import { reducer as rank } from '../application/Rank/store';
import { reducer as album } from '../application/Album/store';

const reducers = { recommend, singer, rank, album };

export default reducers;
