import config from 'shopjs/config'
const { main } = config.muiTheme.palette.primary

export const selectStyles = {
  select: styles => ({
    ...styles,
    borderRadius: '0',
  }),
  control: styles => ({
    ...styles,
    borderRadius: '0',
    marginTop: '8px',
    opacity: '0.8',
    width: '100%',
    color: '#000 !important',
    fontSize: '14px',
    fontFamily: 'Apercu',
    padding: '1px 5px',
    backgroundColor: 'white',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: '14px',
    fontFamily: 'Apercu',
    color: 'black',
    ':hover': {
      backgroundColor: main,
      color: 'white',
    },
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontSize: '14px',
    fontFamily: 'Apercu',
  }),
  input: styles => ({
    ...styles,
  }),
  placeholder: styles => ({
    ...styles,
    color: '#666',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#666',
  }),
  multiValue: styles => ({
    ...styles,
    padding: '5px',
    margin: '0 5px 5px 0',
    backgroundColor: main,
  }),
  multiValueLabel: styles => ({
    ...styles,
    backgroundColor: main,
    color: 'white',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: main[700],
      color: 'white',
    },
  }),
}
