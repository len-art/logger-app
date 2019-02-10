const listColumns = ['day', '', 'start', 'end', 'hours', 'details']

const registerFields = [
  {
    label: 'E-mail',
    field: 'email',
    type: 'email',
    onLogin: true,
  },
  {
    label: 'User Name',
    field: 'name',
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
