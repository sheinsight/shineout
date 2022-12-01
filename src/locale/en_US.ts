export default {
  weekdayValues: {
    narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },

  startOfWeek: 0,

  monthValues: {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },

  pickerTitle: ['Start Time', 'End Time'],

  timeOfDayValues: ['a.m.', 'p.m.'],

  ok: 'Ok',
  cancel: 'Cancel',
  noData: 'Data not found',
  selectAll: 'Select All',
  loading: 'loading...',

  rules: {
    required: {
      array: 'Please select {title}',
      string: 'Please enter {title}',
    },
    type: 'Please enter a valid {title}',
    length: {
      max: {
        string: '{title} must less than {max} choices',
        number: '{title} must less than {max}',
        array: '{title} must select less than {max} choices',
      },
      min: {
        string: '{title} must be at least {min} characters',
        number: '{title} must greater than {min}',
        array: '{title} must select at least {min} choices',
      },
    },
    reg: '{title} is invalid.',
  },

  selected: 'selected',
  search: 'search',
  urlInvalidMsg: 'Picture format is incorrect, please upload again',
  invalidAccept: 'Invalid file format',

  notFound: 'not found',
}
