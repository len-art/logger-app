import React from 'react'
import { inject, observer } from 'mobx-react'
import format from 'date-fns/format'
import AddMonth from './addMonth'

const Footer = inject('store')(
  observer(({
    store: {
      months, selectedMonth, selectedProject, setSelectedMonth,
    },
  }) => (
    <footer>
      <div className="wrapper">
        {months.map(month => (
          <button
            key={month.id}
            onClick={() => setSelectedMonth(month.id)}
            className={month.id === selectedMonth ? 'button selected' : 'button'}
          >
            {format(month.startsAt, 'MMM')}
          </button>
        ))}
        {selectedProject && <AddMonth />}
      </div>
      <style jsx>
        {`
          .button {
            height: 45px;
            padding: 0px 20px 12px 20px;
            margin: 0;
            text-transform: uppercase;
            font-size: 13px;
            transition: 0.25s;
            position: relative;
            z-index: 1;
            color: #eee;
            font-weight: bold;
          }
          .button:before,
          .button:after {
            position: absolute;
            left: 0;
            width: 100%;
            content: '';
          }
          .button:before {
            top: 0;
            background: transparent;
            width: calc(100% - 20px);
            border-top: 0px solid transparent;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #087599;
          }
          .button:after {
            top: 10px;
            left: 0;
            height: 100%;
            background-color: #087599;
            box-shadow: 1px 2px 5px -1px rgba(50, 50, 50, 0.8);
            z-index: -1;
          }
          .button:hover:not(.selected) {
            transform: translateY(-2px);
          }
          .button:not(.selected):before {
            border-bottom: 10px solid #041a44;
          }
          .button:not(.selected):after {
            background-color: #041a44;
          }
          .selected {
            transform: translateY(-4px);
            color: #fff;
          }
          footer {
            background-color: #f5f5f5;
            width: 100%;
            position: fixed;
            padding: 0;
            margin: 0;
            bottom: 0;
            left: 0;
            z-index: 400;
            box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.4);
          }
          .wrapper {
            padding: 0 10px;
            margin: 0;
            height: 40px;
          }
        `}
      </style>
    </footer>
  )),
)

export default Footer
