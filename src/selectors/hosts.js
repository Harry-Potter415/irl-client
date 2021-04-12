export const selectMyHosts = state => {
  const { hosts } = state
  const myHosts = Object.values(hosts.hosts || {})
  const citiesWithRooms = myHosts
    .map(host => [host.cities[0], host.totalRooms])
    .reduce((agg, item) => {
      agg[item[0]] = (agg[item[0]] || 0) + item[1]
      return agg
    }, {})
  const myAudienceTypes = myHosts.flatMap(host => host.audience)
  const myAgeGroups = myHosts.flatMap(host => host.ageGroup)
  return {
    myHosts,
    citiesWithRooms,
    myAudienceTypes,
    myAgeGroups,
  }
}
