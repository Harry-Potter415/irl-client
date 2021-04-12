import { createMuiTheme } from '@material-ui/core/styles'
import { PRIMARY_GREEN, LIGHT_GREEN, RED } from 'lib/colors'

export const theme = createMuiTheme({
  palette: {
    background: {
      default: '#FFF',
      active: '#d5eef9',
    },
    primary: {
      main: PRIMARY_GREEN,
      light: LIGHT_GREEN,
      contrastText: '#FFF',
    },
    secondary: {
      main: '#F05A8D',
      contrastText: '#FFF',
    },
    success: {
      main: '#42B662',
      light: '#D9F0E0',
    },
    error: {
      main: RED,
    },
    textColor: {
      secondary: '#b4b4b4',
    },
    borderColor: {
      main: '#ECF0F1',
    },
    label: {
      pending: '#EFD9C5',
      accepted: '#CAE3BF',
      rejected: '#EF4829',
    },
    grey: {
      250: '#f0f0f0',
      350: '#E1E1E1',
      450: '#b3b3b3',
    },
  },
  overrides: {
    MuiToolbar: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    MuiDivider: {
      root: {
        margin: '10px 0',
      },
    },
    MuiAppBar: {
      root: {
        color: '#b4b4b4 !important',
        fontSize: 15,
      },
    },
    MuiMenuItem: {
      root: {
        height: 30,
      },
    },
    MuiListItemIcon: {
      root: {
        marginRight: 0,
      },
    },
    MuiTableCell: {
      root: {
        padding: '5px 10px',
      },
      head: {
        textTransform: 'uppercase',
        borderBottom: '1px solid #fbb03d',
        letterSpacing: '3px',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        padding: '0.85rem 2rem',
      },
    },
    MuiFlatPageButton: {
      root: {
        border: '1px solid #156052',
        marginRight: 10,
        marginBottom: 20,
        marginTop: 20,
        width: 40,
        height: 40,
        padding: 0,
      },
      rootCurrent: {
        background: '#156052',
        color: '#fff',
        hover: {
          background: '#156052',
        },
      },
      textSecondary: {
        '&:hover': {
          background: '#156052',
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
    },
    MuiTabs: {
      flexContainer: {
        borderBottom: '1px solid #E8E8E8',
      },
      indicator: {
        height: 1,
      },
    },
    MuiTab: {
      wrapper: {
        fontSize: '1rem',
        fontFamily: 'Muli',
        fontWeight: 'bold',
        color: '#372E2E',
      },
      textColorInherit: {
        opacity: 0.5,
      },
    },
    MuiChip: {
      root: {
        color: 'white',
        backgroundColor: '#156052',
        borderRadius: 0,
      },
      deleteIcon: {
        color: 'white',
        opacity: 0.7,
      },
    },
    MuiStepper: {
      root: {
        justifyContent: 'center',
        height: 60,
      },
    },
    MuiStepConnector: {
      root: {
        maxWidth: 20,
        width: 20,
      },
    },
    // Form Inputs
    MuiPrivateNotchedOutline: {
      root: {
        borderRadius: 0,
      },
    },
  },
  typography: {
    fontFamily: '"Apercu", "Roboto", "Helvetica", "Arial", sans-serif',
    color: '#372E2E',
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: '400',
    },
    h1: {
      fontSize: '2rem',
      fontWeight: '800',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: '800',
    },
    h3: {
      fontSize: '1.75rem',
      lineHeight: '1.5em',
      fontWeight: '800',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: '800',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: '400',
    },
    caption: {
      textTransform: 'uppercase',
      fontSize: '.75rem',
      color: '#372E2E',
      fontWeight: '800',
      letterSpacing: '3px',
    },
    headline: {
      fontSize: '1.5rem',
      fontWeight: '800',
    },
    button: {
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: '0px',
  },
  zIndex: {
    drawer: 1300,
  },
  shadows: [
    'none',
    '0px 0px 1px 0px rgba(0,0,0,0.05),0px 0px 1px 0px rgba(0,0,0,0.05),0px 0px 1px 0px rgba(0,0,0,0.05)',
    '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
    '0px 2px 20px 10px rgba(55, 46, 46, 0.08)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
})
