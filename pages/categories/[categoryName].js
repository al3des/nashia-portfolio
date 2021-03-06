import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Layout from "components/layout"
import Head from "next/head"
import styles from "./[categoryName].module.css"
import { NASHI } from "lib/constants"
import Link from "next/link"

import { getAllCategories, getWorksByCategory } from "lib/graphcms"

export default function Category({ works, preview, params }) {
  const router = useRouter()

  if (!router.isFallback && !works) {
    return <ErrorPage statusCode={404} />
  }

  return router.isFallback ? (
    <h2>Loading…</h2>
  ) : (
    <Layout preview={preview}>
      <Head>
        <title>
          {NASHI} | {params.categoryName.toUpperCase()}
        </title>
      </Head>
      <div className={`${styles.worksContainer} min-h-screen`}>
        {works &&
          works.map((work) => (
            <div className={styles.worksItem}>
              <Link href={`/works/${work.id}`}>
                <a className="flex">
                  <img key={work.id} src={work.coverImage.url} alt="" />
                </a>
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const works = await getWorksByCategory(params.categoryName, preview)
  return {
    props: {
      preview,
      works,
      params,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const categories = await getAllCategories({ preview: false })
  return {
    paths: categories.map(({ titulo }) => ({
      params: { categoryName: titulo },
    })),
    fallback: true,
  }
}
