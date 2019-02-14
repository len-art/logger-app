import React from 'react'

export default () => (
  <div className="wrapper">
    <div className="inner">
      <div className="srv">
        <div className="f1" />
        <div className="f2" />
        <div className="f3" />
      </div>
      <div className="clnt" />
    </div>
    <style jsx>
      {`
        .f1,
        .f2,
        .f3 {
          height: 16px;
          width: 80px;
          background-color: #888;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          transform: translate(0, 0);
        }

        @keyframes f1Loading {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0);
            opacity: 1;
          }
          30% {
            transform: translate(0, 19px);
            opacity: 1;
          }
          70% {
            transform: translate(340px, 19px);
            opacity: 1;
          }
          85% {
            transform: translate(340px, 0);
            opacity: 1;
          }
          100% {
            transform: translate(340px, 0);
            opacity: 0;
          }
        }

        @keyframes f2Loading {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0);
            opacity: 1;
          }
          30% {
            transform: translate(0, 0);
            opacity: 1;
          }
          70% {
            transform: translate(340px, 0);
            opacity: 1;
          }
          85% {
            transform: translate(340px, 0);
            opacity: 1;
          }
          100% {
            transform: translate(340px, 0);
            opacity: 0;
          }
        }

        @keyframes f3Loading {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0);
            opacity: 1;
          }
          30% {
            transform: translate(0, -19px);
            opacity: 1;
          }
          70% {
            transform: translate(340px, -19px);
            opacity: 1;
          }
          85% {
            transform: translate(340px, 0);
            opacity: 1;
          }
          100% {
            transform: translate(340px, 0);
            opacity: 0;
          }
        }

        .f1 {
          top: 14px;
          animation: f1Loading 4s infinite;
        }
        .f2 {
          top: 42px;
          animation: f2Loading 4s infinite;
        }
        .f3 {
          top: 70px;
          animation: f3Loading 4s infinite;
        }
        .srv,
        .clnt {
          height: 100px;
          width: 100px;
          border-radius: 10px;
          border: 5px solid #ccc;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
        }
        .srv {
          left: 0;
        }
        .clnt {
          right: 0;
        }
        .inner {
          width: 100%;
          height: 100%;
          max-width: 450px;
          max-height: 450px;
          margin: 25px;
          position: relative;
        }
        .wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fafafa;
        }
      `}
    </style>
  </div>
)
