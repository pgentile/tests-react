import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Env from '../components/Env';
import * as actions from '../actions';

const selectEnv = createSelector(
  state => state.springBoot.env,
  state => state.springBoot.envFilter,
  (env, envFilter) => {

    // Filter env properties based on name
    if (env && env.properties && envFilter) {
      const allEnvProperties = env.properties
        .map(envGroup => {
          const filteredProperties = envGroup.properties.filter(property => {
            const nameIndex = property.name.indexOf(envFilter);
            return nameIndex >= 0;
          });

          return {
            ...envGroup,
            properties: filteredProperties,
          }
        })
        .filter(envGroup => envGroup.properties.length > 0);

      return {
        ...env,
        properties: allEnvProperties,
      };
    }

    // All env properties
    return env;
  },
);

const EnvContainer = connect(
  state => {
    return {
      env: selectEnv(state),
    };
  },
  {
    onLoad: actions.getEnv,
  },
)(Env);

export default EnvContainer;
