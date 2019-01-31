import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'

const LoggedIn = ({ user: { name } }) => <div>{`Hey, ${name}!`}</div>

const NotLoggedIn = () => (
  <div>
    <Link href="/login">
      <a>Login</a>
    </Link>
  </div>
)

export default inject('store')(
  observer(({ store: { user } }) => (
    <div className="user">{user ? <LoggedIn user={user} /> : <NotLoggedIn />}</div>
  )),
)
