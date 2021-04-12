import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { connect } from 'react-redux'
import { selectMyHosts } from 'selectors/hosts'

const BarChart = ({ cities, rooms }) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: cities,
      title: {
        text: 'Number of Rooms',
      },
    },
    yaxis: {
      title: {
        text: 'Locations',
      },
    },
    noData: {
      text: 'No data to display',
    },
  }

  const series = [
    {
      name: 'Rooms',
      data: rooms,
    },
  ]

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height="175" />
    </div>
  )
}

const mapStateToProps = state => {
  const { citiesWithRooms } = selectMyHosts(state)
  const cities = Object.keys(citiesWithRooms).length === 0 ? [null] : Object.keys(citiesWithRooms)

  return {
    cities,
    rooms: Object.values(citiesWithRooms),
  }
}

export default connect(mapStateToProps)(BarChart)
