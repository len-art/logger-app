import React from 'react'

import Button from '../button'

class Modal extends React.Component {
  render() {
    const {
      open, onClose, title, children, footer, onCancel, onConfirm, dim,
    } = this.props

    return (
      <div className="wrapper">
        <div className="content">
          <button className="closeButton" onClick={onClose}>
            X
          </button>
          <div className="title">{title}</div>
          {children}
          {footer && onCancel && onConfirm && (
            <div className="footer">
              <Button unstyled text="Cancel" onClick={onCancel} />
              <Button text="Create" onClick={onConfirm} />
            </div>
          )}
        </div>
        <style jsx>
          {`
            .title {
              margin-bottom: 15px;
              text-align: center;
            }
            .closeButton {
              position: absolute;
              right: 10px;
              top: 10px;
              border: none;
              background: none;
              cursor: pointer;
              padding: 5px;
            }
            .closebutton: focus {
              outline: none;
            }
            .content {
              padding: 20px;
              border-radius: 5px;
              background-color: #fff;
            }
            .footer {
              display: flex;
              justify-content: flex-end;
            }
            .wrapper {
              opacity: ${open ? 1 : 0};
              transition: 0.25s;
              display: flex;
              z-index: ${open ? 500 : -1};
              position: fixed;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background-color: ${dim ? 'rgba(0, 20, 20, .7)' : 'transparent'};
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('keydown', this.esc)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.esc)
  }

  esc = (target) => {
    if (target.keyCode === 27) {
      this.props.onCancel()
    }
  }
}

export default Modal
