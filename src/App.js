
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./Config/routes";
import { AuthProvider } from "./Context";
import AppRoute from "./components/AppRoutes";

function App() {

   function changebackground(){
     document.body.style.backgroundColor = '#111315';
   }
 
  // function changebackground(){
  //   document.getElementById('id').style.backgroundColor = 'black' ; 
  // }
  return (
    <AuthProvider>
      
      <Router>
        <Switch>
          {changebackground()}
          {routes.map((route) => (
            <AppRoute 
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
