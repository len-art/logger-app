import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'

const LoggedIn = ({ user: { name }, resetCookies }) => (
  <div>
    {`Hey, ${name}!`}
    <button onClick={resetCookies} className="logout">
      LogOut
      <style jsx>
        {`
          .logout {
            margin: 10px;
            padding: 2px 9px;
            border-style: none;
            border-radius: 4px;
            background-color: transparent;
            font-size: 10px;
            font-style: italic;
            opacity: 0.5;
          }
          .logout:hover {
            opacity: 1;
            cursor: pointer;
          }
        `}
      </style>
    </button>
  </div>
)

const NotLoggedIn = () => (
  <div>
    <Link href="/login">
      <a>Login</a>
    </Link>
  </div>
)

export default inject('store')(
  observer(({ store: { auth: { user, resetCookies } } }) => (
    <div className="user">
      {user ? <LoggedIn user={user} resetCookies={resetCookies} /> : <NotLoggedIn />}
    </div>
  )),
)
