import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DATE_FORMAT } from 'config'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { truncate } from 'helpers/utils'
import { Link } from 'react-router-dom'

class UsersListItem extends Component {
  render() {
    let { user } = this.props
    return (
      <Card>
        <Link to={`/admin/users/${user.id}/edit`}>
          <CardActionArea>
            <CardContent style={{ height: 150 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {user.name}
              </Typography>
              <Typography component="p">{user.email}</Typography>
              <Typography component="p">{user.status}</Typography>
              <Typography component="p">{user.userType}</Typography>
              <Typography component="p">{user.isAdmin}</Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    )
  }
}

UsersListItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UsersListItem
