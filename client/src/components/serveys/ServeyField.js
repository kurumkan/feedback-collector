import React from 'react';

const ServeyField = ({input, label, meta: {error, touched}}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  );
};

export default ServeyField;