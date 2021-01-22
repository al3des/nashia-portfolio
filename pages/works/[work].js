import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Layout from "components/layout"
import Head from "next/head"
import { NASHI } from "lib/constants"
import { getAllWorks, getWorkById } from "lib/graphcms"

export default function Work({ work, preview }) {
  const router = useRouter()

  if (!router.isFallback && !work) {
    return <ErrorPage statusCode={404} />
  }

  return router.isFallback ? (
    <h2>Loading…</h2>
  ) : (
    <Layout>
      <Head>
        <title>
          {NASHI} | {work.title.toUpperCase()}
        </title>
      </Head>
      <div>
        <h2>Title: {work.title}</h2>

        <h3>
          {work.width} x {work.height} cm
        </h3>
        <h3>{work.technich}</h3>
        <img src={work.coverImage.url} alt="" />
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const work = await getWorkById(params.work, preview)
  return {
    props: {
      preview,
      work,
    },
  }
}

export async function getStaticPaths() {
  const works = await getAllWorks({ preview: false })
  return {
    paths: works.map(({ id }) => ({
      params: { work: id },
    })),
    fallback: true,
  }
}
