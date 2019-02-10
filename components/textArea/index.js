import React from 'react'

export default ({
  rows, cols, disabled, placeholder = '',
}) => (
  <textarea rows={rows} cols={cols} disabled={disabled} placeholder={placeholder} />
)
