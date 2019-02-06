import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

import Input from '../input'
import Button from '../button'

import { columnData } from '../../constants'

@inject('store')
@observer
export default class extends React.Component {
  @observable
  email = ''

  @observable
  name = ''

  @observable
  password = ''

  handleInputChange = (e, field) => {
    this[field] = e.target.value
  }

  render() {
    const {
      email,
      name,
      password,
      props: { error },
    } = this
    return (
      <form className="register" onSubmit={e => e.preventDefault()}>
        <h3>Register</h3>
        {/* TODO: style error */}
        {error || ''}
        {columnData.registerFields.map(({ label, field, type }) => (
          <Input
            key={field}
            className="margined"
            label={label}
            value={this[field]}
            type={type}
            onChange={e => this.handleInputChange(e, field)}
          />
        ))}
        <Button
          onClick={() => this.props.handleRegister({ email, name, password })}
          text="Register"
        />
        <style jsx>
          {`
            .register {
              display: flex;
              flex-direction: column;
              box-shadow: 0px 1px 4px -1px;
              border-radius: 5px;
              padding: 20px;
            }
            h3 {
              text-align: center;
            }
          `}
        </style>
      </form>
    )
  }
}
