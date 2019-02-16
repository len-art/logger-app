import React from 'react'

export default class extends React.Component {
  ref = React.createRef()

  componentDidMount() {
    if (this.ref.current && this.props.autofocus) this.ref.current.focus()
  }

  render() {
    const {
      onClick, onChange, value, onBlur, onFocus,
    } = this.props
    return (
      <>
        <input
          ref={this.ref}
          type="text"
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
        />
        <style>
          {`
            input {
              position: relative;
              width: 100%;
              border: none;
              padding: 10px;
              background-color: inherit;
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
