import SearchForm from './SearchForm';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


const Page = () => {
	
	return (
		<Router>
			<Switch>
				<Route path="/">
	 		 		<SearchForm />
	 		 	</Route>
	 		</Switch>
  	</Router>
  );
};

export default Page;
