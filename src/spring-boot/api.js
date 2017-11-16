import uuid from 'uuid';
import { sortBy, forOwn, pickBy, toPairs, round } from 'lodash-es';


export function getHealth(baseUrl) {
  return get(`${baseUrl}/health`)
    .then(response => response.json())
    .then(data => {

      let components = pickBy(data, (value, key) => key !== 'status');
      components = toPairs(components).map(entry => {
        return {
          ...entry[1],
          name: entry[0],
        };
      });

      return {
        status: data.status,
        components,
      };
    });
}

export function getInfo(baseUrl) {
  return get(`${baseUrl}/info`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get app info');
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(`Can't get infos for ${baseUrl}: ${error}`);
    });
}

export function getConfigProps(baseUrl) {
  return get(`${baseUrl}/configprops`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get config props');
      }

      return response.json();
    })
    .then(data => {
      const configProps = [];

      forOwn(data, (value, group) => {
        let properties = [];

        forOwn(value.properties, (value, name) => {
          properties.push({
            name,
            value,
          });
        });

        properties = sortBy(properties, property => property.name);

        const configProp = {
          group,
          prefix: value.prefix,
          properties,
        };
        configProps.push(configProp);
      });

      return sortBy(configProps, configProp => configProp.prefix);
    });
}

export function getMetrics(baseUrl) {
  return get(`${baseUrl}/metrics`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get metrics');
      }

      return response.json();
    })
    .then(data => {
      let metrics = [];

      forOwn(data, (value, name) => {
        metrics.push({
          name,
          value: round(value, 3),
        });
      });

      metrics = sortBy(metrics, property => property.name);

      return metrics;
    });
}

export function getEnv(baseUrl) {
  return get(`${baseUrl}/env`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get app info');
      }

      return response.json();
    })
    .then(data => {
      const env = {
        profiles: data.profiles,
        properties: [],
      };

      forOwn(data, (value, name) => {
        if (name !== 'profiles') {
          const propertiesGroup = {
            group: name,
            properties: [],
          };

          forOwn(value, (subValue, subName) => {
            propertiesGroup.properties.push({
              name: subName,
              value: subValue,
            });
          });

          propertiesGroup.properties = sortBy(propertiesGroup.properties, property => property.name);

          env.properties.push(propertiesGroup);
        }
      });

      return env;
    });
}


function get(url) {
  return fetch(url, {
    headers: {
      'X-Correlation-ID': `React-${uuid.v4()}`,
      'Accept': 'application/json',
    },
  });
}
