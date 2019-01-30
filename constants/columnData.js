const listColumns = ['day', 'start', 'end', 'hours', 'details']

const registerFields = [
  {
    label: 'E-mail',
    field: 'email',
    type: 'email',
    onLogin: true,
  },
  {
    label: 'User Name',
    field: 'userName',
    type: 'text',
    onLogin: false,
  },
  {
    label: 'Password',
    field: 'password',
    type: 'password',
    onLogin: true,
  },
]

export default {
  listColumns,
  registerFields,
}
