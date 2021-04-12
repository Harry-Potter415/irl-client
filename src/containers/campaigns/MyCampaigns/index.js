import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { withAlerts } from 'hocs/withAlerts'
import { getMyCampaigns, getAvailableCampaigns } from 'actions/campaigns'
import { selectMyCampaigns, selectAvailableCampaigns } from 'selectors/campaigns'
import { getMyProducts } from 'actions/products'
import { selectProducts } from 'selectors/products'
import Button from '@material-ui/core/Button'
import { isMobile } from 'helpers/utils'
import CampaignsListItem from 'components/campaigns/CampaignsListItem'
import TabbedPage from 'components/layout/TabbedPage'
import List from 'components/layout/Grid'
import TabContent from 'components/layout/TabContent'
import Placeholder from 'components/alerts/Placeholder'
import CampaignIcon from 'icons/CampaignIcon'
import { isAuthorized } from 'helpers/auth'
import { selectCurrentUser } from 'selectors/auth'
import { USER_TYPES } from 'lib/constants'
import HeroImage from 'components/layout/HeroImage'
import HeroImageText from 'components/layout/HeroImageText'

const TABS = {
  availableCampaigns: 0,
  myCampaigns: 1,
}

// FIXME: this is a temporary workaround: the whole app has a padding around the content and the
// final solution will probably remove it. Until then, we don't want to break other pages
const MarginAdjustWrapper = styled.div`
  margin: -31px;
  @media (max-width: 600px) {
    margin: -21px;
  }
  // margin: -31px -30px -30px -45px;
`

class MyCampaigns extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: TABS.availableCampaigns,
    }
    this.generateTabs = this.generateTabs.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.hasProducts = this.hasProducts.bind(this)
  }

  componentDidMount() {
    this.getCampaigns(this.props)
    this.getProducts(this.props)
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.currentUser && newProps.currentUser) {
      this.getCampaigns(newProps)
      this.getProducts(newProps)
    }
  }

  getProducts(props) {
    const { currentUser, getMyProducts } = props
    if (currentUser && currentUser.attributes.userType === USER_TYPES.brand) {
      getMyProducts()
    }
  }

  getCampaigns(props) {
    const { currentUser } = props
    if (isAuthorized(currentUser, 'list', 'myCampaigns')) {
      this.props.getMyCampaigns()
    }
    if (isAuthorized(currentUser, 'list', 'availableCampaigns')) {
      this.props.getAvailableCampaigns()
    }
  }

  generateTabs() {
    const {
      currentUser,
      myCampaigns,
      availableCampaigns,
      availablePage,
      availableTotal,
      availableFetched,
      myPage,
      myTotal,
      isFetched,
      getMyCampaigns,
      getAvailableCampaigns,
      productsFetched,
    } = this.props
    const tabs = []
    if (!productsFetched) return tabs

    if (isAuthorized(currentUser, 'list', 'availableCampaigns') && availableFetched) {
      const title = 'Available Placements'
      const id = TABS.availableCampaigns
      const content =
        availableCampaigns && availableCampaigns.length > 0 ? (
          <List
            resources={availableCampaigns}
            resourceName="campaign"
            ItemComponent={CampaignsListItem}
            urlPrefix=""
            total={availableTotal}
            page={availablePage}
            action={getAvailableCampaigns}
          />
        ) : (
          <Placeholder
            icon={<CampaignIcon />}
            title="No Placements"
            description="Available placements will appear here"
          />
        )

      tabs.push({ title, content, id })
    }

    if (isAuthorized(currentUser, 'list', 'myCampaigns') && isFetched) {
      const title = 'My Placements'
      const id = TABS.myCampaigns
      const content =
        myCampaigns && myCampaigns.length > 0 ? (
          <List
            resources={myCampaigns}
            resourceName="campaign"
            ItemComponent={CampaignsListItem}
            urlPrefix=""
            total={myTotal}
            page={myPage}
            action={getMyCampaigns}
          />
        ) : (
          <Fragment>
            {this.hasProducts() ? (
              <Placeholder
                icon={<CampaignIcon />}
                title="No Placements"
                description="Your placements will appear here"
              />
            ) : (
              <Placeholder
                icon={<CampaignIcon />}
                title="No Placements"
                description="First, create a product before creating a placement"
              />
            )}
          </Fragment>
        )

      tabs.push({ title, content, id })
    }
    return tabs
  }

  handleTabChange(tab) {
    this.setState({ activeTab: tab })
  }

  hasProducts() {
    const { products, currentUser } = this.props
    return currentUser.attributes.userType === USER_TYPES.brand
      ? products && products.length > 0
      : true
  }

  render() {
    let { currentUser, history } = this.props
    const { activeTab } = this.state
    const tabs = this.generateTabs()

    return (
      <MarginAdjustWrapper className="placements-page">
        <HeroImage
          url="assets-images/placements-billboard.jpg"
          darken={0.1}
          style={{ marginLeft: -15, width: 'calc(100% + 15px)' }}
        >
          <HeroImageText
            preamble="Introducing"
            title="Placements"
            description={"Offer amenities in an authentic way to elevate your guest's experience"}
          />
        </HeroImage>
        {isAuthorized(currentUser, 'create', 'campaigns') && (
          <Fragment>
            {this.hasProducts() ? (
              <Button
                color="primary"
                variant="contained"
                size={isMobile() ? 'small' : 'medium'}
                onClick={() => history.push('/placements/new')}
              >
                New Placement
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size={isMobile() ? 'small' : 'medium'}
                onClick={() => history.push('/products/new')}
              >
                Add your first product
              </Button>
            )}
          </Fragment>
        )}
        {tabs.length > 1 ? (
          <TabbedPage activeTab={activeTab} handleTabChange={this.handleTabChange}>
            {tabs.map((tab, i) => {
              return (
                <TabContent key={i} title={tab.title}>
                  {tab.content}
                </TabContent>
              )
            })}
          </TabbedPage>
        ) : (
          tabs[0] && tabs[0].content
        )}
      </MarginAdjustWrapper>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyCampaigns,
      getAvailableCampaigns,
      getMyProducts,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { myCampaigns, myPage, myTotal, isFetched } = selectMyCampaigns(state)
  const {
    availableCampaigns,
    availablePage,
    availableTotal,
    availableFetched,
  } = selectAvailableCampaigns(state)
  const currentUser = selectCurrentUser(state)
  const productsQuery = selectProducts(state)
  const { products } = productsQuery
  const productsFetched =
    currentUser && currentUser.userType === USER_TYPES.brand ? productsQuery.isFetched : true
  return {
    currentUser,
    myCampaigns,
    availableCampaigns,
    availablePage,
    availableTotal,
    availableFetched,
    myPage,
    myTotal,
    isFetched,
    products,
    productsFetched,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAlerts(MyCampaigns)))
