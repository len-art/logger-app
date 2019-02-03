import React from 'react'

export default ({ onClick, text }) => (
  <button onClick={onClick} className="fab">
    {text}
    <style jsx>
      {`
        .fab {
          position: relative;
          background-color: #083b99;
          margin: 5px;
          padding: 8px 12px;
          border-style: none;
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-transform: uppercase;
          box-shadow: 0px 1px 2px #222;
          transition: 0.25s;
          overflow: hidden;
          z-index: 1;
        }
        .fab:hover {
          cursor: pointer;
          color: rgba(255, 255, 255, 1);
        }
        .fab:focus {
          outline: none;
        }
        .fab:hover .div1 {
          transform: translateX(-120px);
        }
        .fab:hover .div2 {
          transform: translateX(120px);
        }

        .fab:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: #2868dd;
          transform: scale(0);
          transition: 0.5s;
          border-radius: 50%;
          z-index: -1;
        }

        .fab:hover:after {
          transform: scale(1);
        }
      `}
    </style>
  </button>
)
