import React from 'react'

export default ({ type = 'text', placeholder = '', label = '' }) => (
  <label htmlFor="input" className="input">
    <input id="input" type={type} placeholder={placeholder} />
    <span className="label">{label}</span>
    <style jsx>
      {`
        .input {
          position: relative;
          margin: auto;
          width: 100%;
          max-width: 280px;
        }
        .label {
          position: absolute;
          top: 16px;
          left: 0;
          font-size: 16px;
          color: #9098a9;
          font-weight: 500;
          transform-origin: 0 0;
          transition: all 0.2s ease;
        }
        input {
          -webkit-appearance: none;
          width: 100%;
          border: 0;
          font-family: inherit;
          padding: 12px 0;
          height: 48px;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 2px solid #c8ccd4;
          background: none;
          border-radius: 0;
          color: #223254;
          transition: all 0.15s ease;
        }
        input:hover {
          background: rgba(#223254,.03)
        }
        input:hover:not(span) {
          color #5A667F;
          transform: translateY(-26px) scale(.75);
        }
        input:focus {
          background: none;
          outline: none;
        }
        input:focus span {
          color #0077FF;
          transform: translateY(-26px) scale(.75);
        }
      `}
    </style>
  </label>
)
