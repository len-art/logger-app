import React from 'react'

const Button = props => (
  <button onClick={props.handleClick} className="button">
    {props.text}
    <div className="div1" />
    <div className="div2" />
    <style jsx>
      {`
        .button {
          position: relative;
          background-color: #2868dd;
          margin: 5px;
          padding: 8px 12px;
          border-style: none;
          border-radius: 5px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-transform: uppercase;
          box-shadow: 0px 1px 2px #222;
          transition: 0.25s;
          overflow: hidden;
          z-index: 1;
        }
        .button:hover {
          cursor: pointer;
          color: rgba(255, 255, 255, 1);
        }

        .button:hover .div1 {
          transform: translateX(-120px);
        }
        .button:hover .div2 {
          transform: translateX(120px);
        }

        .div1,
        .div2 {
          height: 100%;
          width: 50%;
          position: absolute;
          top: 0px;
          background-color: #083b99;
          transform: translateX(0px);
          transition: 0.5s;
          z-index: -1;
        }

        .div1 {
          top: 0px;
          right: 50%;
        }

        .div2 {
          top: 0px;
          left: 50%;
        }
      `}
    </style>
  </button>
)

export default Button
