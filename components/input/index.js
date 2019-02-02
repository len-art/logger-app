import React from 'react'

export default ({
  type = 'text', placeholder = '\u00A0', label = '', value, onChange,
}) => (
  <label htmlFor="input" className="wrapper">
    <input
      className="input"
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
    <span className="label">{label}</span>
    <span className="border" />
    <style jsx>
      {`
        .wrapper {
          position: relative;
          width: 100%;
          max-width: 300px;
          transition: all 0.2s ease;
          outline: none;
          display: inline-flex;
          align-items: flex-end;
          height: 50px
        }
        .label {
          position: absolute;
          bottom: 2px;
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
          bottom: 0px;
          left: 0;
          height: 1px;
          width: 100%;
          background #0077FF;
          transform: scaleX(0);
          transform-origin: 0 0;
          transition: all .25s ease;
        }
        .input {
          -webkit-appearance: none;
          width: 100%;
          border: 0;
          height: 21px;
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
        .wrapper input:not(:placeholder-shown) + span {
          transform: translateY(-20px) scale(.75);
        }
        .wrapper:hover  {
          background: rgba(34, 50, 84, .05);
        }
        .input:focus + span {
          background: none;
          outline: none;
        }
        .input:focus + .label {
          color #0077FF;
          transform: translateY(-20px) scale(.75);
        }
        .input:focus + .label + .border {
          transform: scaleX(1)
        }
      `}
    </style>
  </label>
)
