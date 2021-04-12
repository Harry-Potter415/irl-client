import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withAlerts } from 'hocs/withAlerts'
import { withRouter } from 'react-router'
import { isMobile } from 'helpers/utils'
import { getMyAddresses, deleteAddress } from 'actions/addresses'
import { selectMyAddresses } from 'selectors/addresses'
import { Button, List } from '@material-ui/core'
import ListPageHeader from 'components/layout/ListPageHeader'
import AddressItem from 'containers/addresses/AddressItem'
import Placeholder from 'components/alerts/Placeholder'
import AddressIcon from 'icons/AddressIcon'

class MyAddresses extends Component {
  componentDidMount() {
    const { getMyAddresses } = this.props
    getMyAddresses()
  }

  handleDeleteClick = async address => {
    const { deleteAddress, showAlertError, showAlertSuccess } = this.props

    try {
      await deleteAddress(address.id)
      showAlertSuccess('Address removed')
    } catch (e) {
      showAlertError('There was an error deleting the address')
    }
  }

  render() {
    let { addresses, history, isFetched } = this.props

    return (
      <div>
        <ListPageHeader title="Addresses">
          <Button
            color="primary"
            variant="contained"
            size={isMobile() ? 'small' : 'medium'}
            onClick={() => history.push('/addresses/new')}
          >
            New Address
          </Button>
        </ListPageHeader>
        {addresses && addresses.length > 0 ? (
          <List>
            {addresses.map((address, i) => (
              <AddressItem
                key={address.id}
                address={address}
                handleDeleteClick={this.handleDeleteClick}
              />
            ))}
          </List>
        ) : (
          isFetched && (
            <Placeholder
              icon={<AddressIcon />}
              title="No Addresses"
              description="Your addresses will appear here"
            />
          )
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteAddress,
      getMyAddresses,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { addresses, isFetched } = selectMyAddresses(state)
  const { currentUser } = state.auth
  return {
    currentUser,
    addresses,
    isFetched,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(MyAddresses)))
