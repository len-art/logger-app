import React from 'react'
import { inject, observer } from 'mobx-react'
import format from 'date-fns/format'

const Footer = inject('store')(
  observer((props) => {
    const { months } = props.store
    return (
      <footer className="footer">
        {months.map(month => (
          <button
            onClick={() => props.store.setSelectedMonth(month.id)}
            className={month.id === props.store.selectedMonth ? 'button selected' : 'button'}
          >
            {format(month.startsAt, 'MMM')}
          </button>
        ))}
        <style jsx>
          {`
            .button {
              margin: 5px 12px 5px 6px;
              padding: 8px 12px;
              background-color: #eeeeee;
              border-style: none;
              border-radius: 3px;
              text-transform: uppercase;
              font-size: 13px;
            }
            .selected {
              background-color: #705c5c;
              font-weight: bold;
              color: white;
            }
            .footer {
              background-color: #a7a6a6;
              width: 100%;
              height: 50px;
              position: fixed;
              padding: 0px;
              bottom: 0;
              left: 0;
              display: flex;
              z-index: 400;
              box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.4);
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
