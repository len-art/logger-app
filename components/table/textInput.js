import React from 'react'

export default ({
  onClick, onChange, value, onBlur, onFocus, autoFocus,
}) => (
  <div className="wrapper">
    <input
      autoFocus={autoFocus}
      type="text"
      onClick={onClick}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
    />
    <span className="border" />
    <style jsx>
      {`
        .wrapper {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          position: relative;
        }
        input {
          width: 100%;
          height: 100%;
          border: none;
          padding: 10px;
          background-color: inherit;
          box-sizing: border-box;
        }
        input:focus {
          outline: none;
        }
        input:hover {
          background: rgba(34, 50, 84, 0.05);
        }
        .border {
          position: absolute;
          content: '';
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #aaa;
          transition: 0.25s;
          transform: scaleX(0);
          transform-origin: left;
        }
        input:focus + .border {
          transform: scaleX(1);
        }
      `}
    </style>
  </div>
)
