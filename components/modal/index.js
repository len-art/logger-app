import React from 'react'

import Button from '../button'

export default props => (
  <div className="wrapper">
    <div className="content">
      <button className="closeButton" onClick={props.onClose}>
        X
      </button>
      <div className="title">{props.title}</div>
      {props.children}
      {props.footer && props.onCancel && props.onConfirm && (
        <div className="footer">
          <Button unstyled text="Cancel" onClick={props.onCancel} />
          <Button text="Create" onClick={props.onConfirm} />
        </div>
      )}
    </div>
    <style jsx>
      {`
        .title {
          margin-bottom: 15px;
          text-align: center;
        }
        .closeButton {
          position: absolute;
          right: 10px;
          top: 10px;
          border: none;
          background: none;
          cursor: pointer;
          padding: 5px;
        }
        .closebutton: focus {
          outline: none;
        }
        .content {
          padding: 20px;
          border-radius: 5px;
          background-color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .wrapper {
          display: ${props.open ? 'block' : 'none'};
          z-index: 500;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: ${props.dim ? 'rgba(0, 20, 20, .7)' : 'transparent'};
        }
      `}
    </style>
  </div>
)
