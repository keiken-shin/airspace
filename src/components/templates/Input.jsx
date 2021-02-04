/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

import { PassEye, PassEyeClose } from '../icons';

const StyledInput = styled.div`
  ${tw`flex bg-whiteSmoke h-16 relative w-full rounded-xl`}

  input {
    ${tw`bg-transparent z-10 w-full rounded-xl px-4 outline-none transform transition-all h-full`}
  }

  .label-placeholder {
    ${tw`absolute top-1/2 left-4 text-dimGray transform transition-all`}
    transform: translateY(-50%);
    user-select: none;
  }

  input:focus ~ .label-placeholder,
  input:not(:placeholder-shown) ~ .label-placeholder {
    top: -1rem;
    ${tw`text-sm`}
  }

  input:not(:placeholder-shown) ~ .eye {
    ${tw`block`}
  }

  .eye {
    width: 24px;
    height: 24px;
    ${tw`hidden absolute bg-transparent border-0 text-dimGray top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10 outline-none`}
  }
`;

const Input = ({ label, type, name, placeholder, required, reference }) => {
  const [passType] = useState(type === 'password');
  const [passwordShown, setPasswordShown] = useState({
    passEye: false,
    passText: 'password',
  });

  const handleClick = () => {
    if (passwordShown.passEye) {
      setPasswordShown({
        passEye: false,
        passText: 'password',
      });
    } else {
      setPasswordShown({
        passEye: true,
        passText: 'text',
      });
    }
  };

  return (
    <StyledInput className="styled-input">
      <input
        type={passType ? passwordShown.passText : type}
        placeholder={placeholder}
        name={name}
        ref={reference}
        autoComplete={passType ? 'off' : 'on'}
        required={required}
      />
      <span className="label-placeholder">{label}</span>

      {passType && (
        <button type="button" className="eye" onClick={handleClick}>
          {passwordShown.passEye ? <PassEye /> : <PassEyeClose />}
        </button>
      )}
    </StyledInput>
  );
};

Input.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  placeholder: ' ',
  reference: null,
  required: true,
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  reference: PropTypes.any,
  required: PropTypes.bool,
};

export default Input;
