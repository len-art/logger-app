import React from 'react'

export default ({ onClick }) => (
  <button onClick={onClick} className="fab">
    <div className="fabBg" />
    <style jsx>
      {`
        .fab {
          position: relative;
          background-color: #083b99;
          height: 32px;
          width: 32px;
          margin: 5px;
          padding: 8px 12px;
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-transform: uppercase;
          box-shadow: 1px 2px 5px -1px rgba(50, 50, 50, 0.8);
          transition: 0.25s;
          overflow: hidden;
          z-index: 1;
          transform: scale(1);
        }
        .fab:hover {
          color: rgba(255, 255, 255, 1);
          transform: scale(1.05);
          box-shadow: 2px 3px 7px -1px rgba(50, 50, 50, 0.6);
        }

        .fabBg {
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

        .fab:hover .fabBg {
          transform: scale(1);
          transition: 0.25s;
        }
        .fab:before,
        .fab:after {
          content: '';
          position: absolute;
          transition: 0.25s;
          background-color: rgba(255, 255, 255, 0.8);
        }
        .fab:before {
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          transform: scaleY(0.4);
        }
        .fab:after {
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          transform: scaleX(0.4);
        }
        .fab:hover:before,
        .fab:hover:after {
          background-color: rgba(255, 255, 255, 1);
        }
        .fab:hover:before {
          transform: scaleY(0.6);
        }
        .fab:hover:after {
          transform: scaleX(0.6);
        }
      `}
    </style>
  </button>
)
