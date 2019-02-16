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
      <div className="wrapper">
        <input
          ref={this.ref}
          type="text"
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
        />
        <span className="border" />
        <style jsx>
          {`
            .wrapper {
              width: 100%;
              margin: 0;
              padding: 0;
              position: relative;
            }
            input {
              width: 100%;
              border: none;
              padding: 10px;
              background-color: inherit;
            }
            input:focus {
              outline: none;
            }
            .border {
              position: absolute;
              content: '';
              bottom: 0;
              left: 0;
              width: 100%;
              height: 1px;
              background-color: #aaa;
              transition: 0.25s;
              transform: scaleX(0);
              transform-origin: left;
            }
            input:focus + .border {
              transform: scaleX(1);
            }
          `}
        </style>
      </div>
    )
  }
}
