import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'

const LoggedIn = ({ user: { name }, resetCookies }) => (
  <div className="logged">
    {`Hey, ${name}!`}
    <button onClick={resetCookies} className="logout">
      logout
      <style jsx>
        {`
          .logged {
            display: flex;
          }
          .logout {
            padding: 0 0 0 5px;
            border-style: none;
            border-radius: 4px;
            background-color: transparent;
            font-size: 10px;
            font-style: italic;
            opacity: 0.5;
            transition: 0.25s;
            color: #eee;
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
  observer(({ store: { auth: { isLoggedIn, user, resetCookies } } }) => (
    <div className="user">
      {isLoggedIn ? <LoggedIn user={user} resetCookies={resetCookies} /> : <NotLoggedIn />}
    </div>
  )),
)
