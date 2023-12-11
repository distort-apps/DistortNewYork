import MainNav from './main-nav'

function Layout ({ children }) {
  return (
    <>
      <MainNav /> <main>{children}</main>
    </>
  )
}
export default Layout
