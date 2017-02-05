import _ from 'lodash';


export function getHealth(baseUrl) {
  return fetch(`${baseUrl}/health`)
    .then(response => response.json())
    .then(data => {

      let components = _.pickBy(data, (value, key) => key !== 'status');
      components = _.toPairs(components).map(entry => {
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
  return fetch(`${baseUrl}/info`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get app info');
      }

      return response.json();
    });
}

export function getConfigProps(baseUrl) {
  return fetch(`${baseUrl}/configprops`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get config props');
      }

      return response.json();
    })
    .then(data => {
      const configProps = [];

      _.forOwn(data, (value, group) => {
        let properties = [];

        _.forOwn(value.properties, (value, name) => {
          properties.push({
            name,
            value,
          });
        });

        properties = _.sortBy(properties, property => property.name);

        const configProp = {
          group,
          prefix: value.prefix,
          properties,
        };
        configProps.push(configProp);
      });

      return _.sortBy(configProps, configProp => configProp.prefix);
    });
}

export function getMetrics(baseUrl) {
  return fetch(`${baseUrl}/metrics`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get metrics');
      }

      return response.json();
    })
    .then(data => {
      let metrics = [];

      _.forOwn(data, (value, name) => {
        metrics.push({
          name,
          value: _.round(value, 3),
        });
      })

      metrics = _.sortBy(metrics, property => property.name);

      return metrics;
    });
}
