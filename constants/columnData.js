const listColumns = [
  {
    id: 'day',
    display: 'Day',
  },
  {
    id: 'add',
    display: '',
  },
  {
    id: 'start',
    display: 'Start',
  },
  {
    id: 'end',
    display: 'End',
  },
  {
    id: 'hours',
    display: 'Hours',
  },
  {
    id: 'details',
    display: 'Details',
  },
]

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
