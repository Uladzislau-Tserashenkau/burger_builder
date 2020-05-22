import React, { useEffect, Suspense } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Checkout/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, [props]);

  let routes = (
    <Switch>
      <Route
        path="/auth"
        render={(props) => {
          return <Auth {...props} />;
        }}
      />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route
          path="/checkout"
          render={(props) => {
            return <Checkout {...props} />;
          }}
        />
        <Route
          path="/orders"
          render={(props) => {
            return <Orders {...props} />;
          }}
        />
        <Route path="/logout" component={Logout} />
        <Route
          path="/auth"
          render={(props) => {
            return <Auth {...props} />;
          }}
        />

        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense
          fallback={() => {
            return <p>Loading...</p>;
          }}
        >
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => {
      dispatch(actions.authCheckState());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
