import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import AssetsReducer from './assets_reducer';
import ChartDataReducer from './chart_data_reducer';
import PortfolioChartDataReducer from './portfolio_chart_data_reducer';
import PortfolioActionsReducer from './portfolio_actions_reducer';

export default combineReducers({
  user: UserReducer,
  assets: AssetsReducer,
  portfolioActions: PortfolioActionsReducer,
  chartData: ChartDataReducer,
  portfolioChartData: PortfolioChartDataReducer,
});