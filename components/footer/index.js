import React from 'react'
import { inject, observer } from 'mobx-react'
import format from 'date-fns/format'
import AddMonth from './addMonth'

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
          <AddMonth />
        </div>
        <style jsx>
          {`
            .button {
              height: 45px;
              padding: 0px 20px 12px 20px;
              margin: 0;
              background-color: #eeeeee;
              border-style: none;
              text-transform: uppercase;
              font-size: 13px;
              clip-path: polygon(
                0 10%,
                15% 0,
                85% 0,
                100% 10%,
                100% 100%,
                100% 100%,
                100% 100%,
                0 100%
              );
              transition: 0.25s;
              cursor: pointer;
              position: relative;
            }
            .button:hover:not(.selected) {
              transform: translateY(-2px);
            }
            .button:focus {
              outline: none;
            }
            .selected {
              transform: translateY(-4px);
              background-color: #fff;
              color: black;
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
