import React from 'react'
import { inject, observer } from 'mobx-react'
import format from 'date-fns/format'
import Button from '../button'

const Footer = inject('store')(
  observer((props) => {
    const { months } = props.store
    return (
      <div>
        <footer className="footer">
          {months.map((month, index) => (
            <Button text={format(month.startsAt, 'MMM')} />
          ))}
          <style jsx>
            {`
              .footer {
                background-color: #cad9f5;
                width: 100%;
                height: 50px;
                position: fixed;
                padding: 0px;
                bottom: 0;
                left: 0;
                display: flex;
              }
            `}
          </style>
        </footer>
      </div>
    )
  }),
)

export default Footer

// const month = (11 - i + 1) % 12
//           const date = new Date(2010, month, 1)
//           return <button key={month}>{format(date, 'MMM')}</button>
