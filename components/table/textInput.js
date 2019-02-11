import React from 'react'

export default class extends React.Component {
  ref = React.createRef()

  componentDidMount() {
    if (this.ref.current) this.ref.current.focus()
  }

  render() {
    const {
      onChange, value, onBlur, onFocus,
    } = this.props
    return (
      <>
        <input
          ref={this.ref}
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
        />
        <style>
          {`
            input {
              position: relative;
              width: calc(100% - 50px);
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
  }
}
