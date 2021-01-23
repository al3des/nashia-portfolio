import Head from "next/head"
import Container from "../components/container"
import Header from "../components/header"
import Footer from "../components/footer"
import Meta from "../components/meta"

export default function Layout({ preview, children }) {
  return (
    <Container>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </Container>
  )
}
