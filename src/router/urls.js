const cookieName = '.ArcadianApplications.Authenticated'
const identity = '/Identity/Account/Manage'
const singIn = '/Identity/Account/Login'
const singOut = '/Identity/Account/Logout'

export default {
  cookieName,
  identity,
  singIn,
  singOut,
  knownUrls: [identity, singIn, singOut],
  navigateTo: (url) => {
    window.location.href = url
  }
}
