import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
