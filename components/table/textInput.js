import React from 'react'

export default ({ onChange, value }) => (
  <>
    <input type="text" onChange={onChange} value={value} />
    <style jsx>
      {`
        input {
          width: 100%;
          border: none;
          padding: 10px;
        }
        input:focus {
          outline: none;
        }
      `}
    </style>
  </>
)
