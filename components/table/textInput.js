import React from 'react'

export default ({ onChange, value, onConfirm }) => (
  <span>
    <input type="text" onChange={onChange} value={value} />
    <button onClick={onConfirm}>✔</button>
    <style jsx>
      {`
        input {
          position: relative;
          width: calc(100% - 50px);
          border: none;
          padding: 10px 40px 10px 10px;
        }
        input:focus {
          outline: none;
        }
        button {
          position: absolute;
          right: 25px;
          top: 0;
          bottom: 0;
          margin: auto;
          background: none;
          border: none;
          font-size: 15px;
          border-radius: 50%;
          border: 1px solid #c8ccd4;
          height: 25px;
          width: 25px;
          cursor: pointer;
          transform: scale(1);
          transition: 0.25s;
        }
        button:focus {
          outline: none;
        }
        button:hover {
          transform: scale(1.03);
        }
      `}
    </style>
  </span>
)
