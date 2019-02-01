import React from 'react'
import { inject, observer } from 'mobx-react'
import { format } from 'date-fns'

const Footer = inject('store')(
  observer((props) => {
    const { months } = props.store
    return (
      <footer className="footer">
        <div>{}</div>
      </footer>
    )
  }),
)

// const Footer = props => (
//   <footer className="footer">
//     {Array.from(new Array(12), (_, i) => {
//       const month = (11 - i + 1) % 12
//       const date = new Date(2010, month, 1)
//       return <button key={month}>{format(date, 'MMM')}</button>
//     })}
//     <style jsx>
//       {`
//         .footer {
//           position: fixed;
//           padding: 20px;
//           bottom: 0;
//           left: 0;
//           display: flex;
//         }
//       `}
//     </style>
//   </footer>
// )

export default Footer
