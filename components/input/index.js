import React from 'react'

export default ({
  type = 'text', placeholder = '\u00A0', label = '', value, onChange,
}) => (
  <label htmlFor="input" className="input">
    <input id="input" type={type} placeholder={placeholder} />
    <span className="label" value={value} onChange={onChange}>
      {label}
    </span>
    <span className="border" />
    <style jsx>
      {`
        .input {
          position: relative;
          width: 100%;
          max-width: 280px;
          padding: 15px 0 5px;
          transition: all 0.2s ease;
        }
        .label {
          position: absolute;
          top: 15px;
          left: 0;
          font-size: 16px;
          color: #9098a9;
          font-weight: 500;
          transform-origin: 0 0;
          transition: all 0.2s ease;
          z-index: -1;
        }
        .border {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 100%;
          background #0077FF;
          transform: scaleX(0);
          transform-origin: 0 0;
          transition: all .25s ease;
        }
        input {
          -webkit-appearance: none;
          width: 100%;
          border: 0;
          font-family: inherit;
          padding: 0;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid #c8ccd4;
          background: none;
          border-radius: 0;
          color: #223254;
          transition: all 0.15s ease;
          outline: none;
          z-index: 1;
        }
        .input input:not(:placeholder-shown) + span {
          transform: translateY(-15px) scale(.75);
        }
        .input:hover  {
          background: rgba(34, 50, 84, .05);
        }
        {/* input:hover:not(span) {
          color #5A667F;
        } */}
        input:focus + span {
          background: none;
          outline: none;
        }
        input:focus + .label {
          color #0077FF;
          transform: translateY(-15px) scale(.75);
        }
        input:focus + .label + .border {
          transform: scaleX(1)
        }
      `}
    </style>
  </label>
)
