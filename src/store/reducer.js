import { reducer as recommend } from '../application/Recommend/store';
import { reducer as singers } from '../application/Singers/store';
import { reducer as rank } from '../application/Rank/store';
import { reducer as album } from '../application/Album/store';
import { reducer as singer } from '../application/Singer/store';

const reducers = { recommend, singers, rank, album, singer };

export default reducers;
