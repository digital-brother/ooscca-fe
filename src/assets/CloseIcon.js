import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function CloseIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Component 1">
          <path id="Vector" d="M0 18.0956L1.80938 19.9051L19.9032 1.80958L18.0938 2.0318e-05L0 18.0956Z"
                fill="#717980"/>
          <path id="Vector_2"
                d="M18.0938 19.9052L19.9031 18.0956L1.80929 3.57609e-05L-9.17583e-05 1.80959L18.0938 19.9052Z"
                fill="#6C757D"/>
        </g>
      </svg>
    </SvgIcon>
  );
}