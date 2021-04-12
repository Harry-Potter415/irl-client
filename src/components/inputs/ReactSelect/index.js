import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Sync from 'react-select'
import Async from 'react-select/lib/Async'
import Creatable from 'react-select/lib/Creatable'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import { emphasize } from '@material-ui/core/styles/colorManipulator'

export const SELECT_TYPES = {
  Sync,
  Creatable,
  Async,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 4,
  },
  input: {
    display: 'flex',
    height: 'auto',
    wordBreak: 'break-word',
  },
  multiValue: {
    color: 'red',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
    lineHeight: 1,
  },
  placeholder: {
    position: 'absolute',
    left: 14,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
})

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  if (!props.selectProps.textFieldProps.placeholder) return null
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
}

class ReactSelect extends React.Component {
  state = {
    single: null,
    multi: null,
  }

  handleChange = name => value => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      classes,
      theme,
      label,
      name,
      handleChange,
      error,
      loadOptions,
      hasValue,
      placeholder,
      SelectComponent,
    } = this.props

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    }
    const textFieldProps = {
      label,
      placeholder: placeholder,
      name,
      margin: 'dense',
      variant: 'outlined',
      error: Boolean(error),
      InputLabelProps: {},
    }
    if (hasValue || placeholder) {
      textFieldProps.InputLabelProps.shrink = true
    }

    return (
      <div className={classes.root}>
        <NoSsr>
          <SelectComponent
            {...this.props}
            classes={classes}
            styles={selectStyles}
            textFieldProps={textFieldProps}
            defaultOptions
            loadOptions={loadOptions}
            components={components}
            isClearable
            onChange={e => handleChange(e)}
            closeMenuOnSelect={!this.props.isMulti}
          />
        </NoSsr>
        <Typography color="error" variant="caption" gutterBottom>
          {error}
        </Typography>
      </div>
    )
  }
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  loadOptions: PropTypes.func,
  hasValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  SelectComponent: PropTypes.oneOf(Object.values(SELECT_TYPES)),
}

ReactSelect.defaultProps = {
  SelectComponent: Async,
}

export default withStyles(styles, { withTheme: true })(ReactSelect)
