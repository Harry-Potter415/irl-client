export const selectStripeAccount = state => {
  const accounts = state.stripeAccounts.stripeAccount
  if (!accounts) return null
  return Object.values(accounts)[0]
}
