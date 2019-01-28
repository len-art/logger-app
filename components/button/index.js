import React from 'react'

const Button = props => (
  <button onClick={props.handleClick} className="button">
    <div className="div1" />
    <div className="div2" />
    {props.text}
    <style jsx>
      {`
        .button {
          position: relative;
          background-color: #2868dd;
          margin: 5px;
          padding: 8px 12px;
          border-style: none;
          border-radius: 5px;
          color: #fff;
          text-transform: uppercase;
          box-shadow: 0px 1px 2px #222;
          transition: 0.25s;
        }
        .button:hover {
          background-color: #759ee9;
          cursor: pointer;
        }

        .button:hover .div1 {
          transform: translate(-10px);
        }

        .div1 {
          height: 30px;
          width: 50%;
          position: absolute;
          top: 0px;
          left: 0px;
          right: 10px;
          background-color: #0000ff;
        }

        .div2 {
          height: 30px;
          width: 50%;
          top: 0px;
          right: 0px;
          position: absolute;
          background-color: #ff0000;
        }
        .div2:hover {
          transform: translate(10px);
        }
      `}
    </style>
  </button>
)

export default Button
