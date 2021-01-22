import Layout from "../components/layout"
import HomeCategories from "../components/home-categories"

import { getAllCategories } from "../lib/graphcms"
import Head from "next/head"
import { CMS_NAME } from "../lib/constants"

export default function Index({ categories, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <HomeCategories categories={categories} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const categories = (await getAllCategories(preview)) || []
  return {
    props: { categories, preview },
    revalidate: 1,
  }
}
