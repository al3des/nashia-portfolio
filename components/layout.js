import Container from "../components/container"
import Header from "../components/header"
import Footer from "../components/footer"
import Meta from "../components/meta"

export default function Layout({ preview, children }) {
  return (
    <Container>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </Container>
  )
}
