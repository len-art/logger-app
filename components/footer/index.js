import React from 'react'
import { inject, observer } from 'mobx-react'
import format from 'date-fns/format'

const Footer = inject('store')(
  observer((props) => {
    const { months } = props.store
    return (
      <footer>
        <div className="wrapper">
          {months.map(month => (
            <button
              key={month.id}
              onClick={() => props.store.setSelectedMonth(month.id)}
              className={month.id === props.store.selectedMonth ? 'button selected' : 'button'}
            >
              {format(month.startsAt, 'MMM')}
            </button>
          ))}
        </div>
        <style jsx>
          {`
            .button {
              height: 45px;
              padding: 0px 20px 12px 20px;
              margin: 0;
              border-style: none;
              text-transform: uppercase;
              font-size: 13px;
              transition: 0.25s;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              background-color: transparent;
              z-index: 1;
              color: #eee;
            }
            .button:before,
            .button:after {
              position: absolute;
              left: 0;
              width: 100%;
              content: '';
              box-shadow: 1px 2px 5px -1px rgba(50, 50, 50, 0.8);
              z-index: -1;
            }
            .button:before {
              top: 0;
              background: transparent;
              width: calc(100% - 20px);
              border-top: 0px solid transparent;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid #333;
            }
            .button:after {
              top: 10px;
              left: 0;
              height: 100%;
              background-color: #333;
            }
            .button:hover:not(.selected) {
              transform: translateY(-2px);
            }
            .button:not(.selected):before {
              border-bottom: 10px solid #555;
            }
            .button:not(.selected):after {
              background-color: #555;
            }
            .button:focus {
              outline: none;
            }
            .selected {
              transform: translateY(-4px);
              font-weight: bold;
            }
            footer {
              background-color: rgba(250, 250, 250, 0.5);
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
    )
  }),
)

export default Footer

// const month = (11 - i + 1) % 12
//           const date = new Date(2010, month, 1)
//           return <button key={month}>{format(date, 'MMM')}</button>
