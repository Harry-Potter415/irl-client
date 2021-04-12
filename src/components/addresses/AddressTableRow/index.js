import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'
import DeleteButton from 'components/layout/DeleteButton'
import { deleteAddress } from 'actions/addresses'
import styled from 'styled-components'

const Actions = styled.div`
  display: flex;
  align-items: center;
`
const DeleteAddress = styled.div`
  color: ${props => props.theme.palette.action.active};
  position: relative;
  top: 2px;
`

const AddressTableRow = ({ address, deleteAddress }) => (
  <TableRow>
    <TableCell>
      {[address.address1, address.address2].filter(a => a && a.length > 0).join(', ')}
    </TableCell>
    <TableCell>{address.city}</TableCell>
    <TableCell>{address.state}</TableCell>
    <TableCell>{address.country}</TableCell>
    <TableCell>{address.zipcode}</TableCell>
    <TableCell>
      <Chip
        label={address.isPrimary ? 'Yes' : 'No'}
        color={address.isPrimary ? 'primary' : 'default'}
      />
    </TableCell>
    <TableCell align="right">
      <Actions>
        <IconButton component={Link} to={`/addresses/${address.id}/edit`} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <DeleteAddress>
          <DeleteButton
            title="Delete address"
            action={deleteAddress.bind(this, address.id)}
            deleteText=""
            fontSize="default"
          />
        </DeleteAddress>
      </Actions>
    </TableCell>
  </TableRow>
)

AddressTableRow.propTypes = {
  address: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteAddress,
    },
    dispatch
  )

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressTableRow)
