import React, { Component } from 'react'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'

import './Snackbar.css'

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

export class Snackbar extends Component {
  render() {
    const { classes, message, onClose, variant, ...other } = this.props
    const Icon = variantIcon[variant]
  
    return (
      <SnackbarContent
        className={`${variant} margin`}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className="message">
            <Icon className="icon iconVariant" />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className="icon" />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
}