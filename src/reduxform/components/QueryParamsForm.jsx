import React from 'react';
import PropTypes from 'prop-types';

import { Field, FieldArray, reduxForm, propTypes as formPropTypes } from 'redux-form';


export default function QueryParamsForm({ model, initialValues }) {
  return (
    <QueryParamsReduxForm form="queryParams" model={model} initialValues={initialValues} />
  );
}

QueryParamsForm.propTypes = {
  model: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
};


class InnerQueryParamsForm extends React.Component {

  static propTypes = {
    ...formPropTypes,
  };

  render() {
    const { model } = this.props;

    const fields = model.map(item => {
      const { label, name, type, enumValues } = item;

      switch (type) {

      case 'enum': {
        const options = enumValues.map(enumValue => {
          return {
            value: enumValue,
            label: enumValue,
          };
        });

        return (
          <label key={name}>
            {label}
            <Field name={name} component={SelectField} options={options} />
          </label>
        );
      }

      case 'array': {
        return (
          <FieldArray key={name} name={name} component={MultiTextField} label={label} />
        );
      }

      default: {
        return (
          <label key={name}>
            {label}
            <Field name={name} component={TextField} />
          </label>
        );
      }

      }
    });

    return (
      <div>
        {fields}
      </div>
    );
  }

}


function TextField({ input }) {
  return <input type="text" {...input} />
}

TextField.propTypes = {
  input: PropTypes.object.isRequired,
};


function SelectField({ input, options }) {
  const optionFields = options.map(option => {
    return (
      <option key={option.value} value={option.value}>{option.label}</option>
    );
  });

  return (
    <select {...input}>
      <option value=""></option>
      {optionFields}
    </select>
  );
}

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};


function MultiTextField({ fields, label }) {
  const fieldComponents = fields.map((field, index) => {
    return (
      <label key={index}>
        {label} n°{index + 1}
        <Field name={field} component={TextField} />
      </label>
    );
  });

  return (
    <div>{fieldComponents}</div>
  );
}

MultiTextField.propTypes = {
  fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};



const QueryParamsReduxForm = reduxForm()(InnerQueryParamsForm);
