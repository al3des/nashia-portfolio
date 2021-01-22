import Layout from "components/layout"
import { getAllWorks, getWorkById } from "lib/graphcms"

export default function Work({ work, preview, params }) {
  let { title, height, width, technich, coverImage, category } = work
  return (
    <Layout>
      <div>
        <h2>Title: {title}</h2>

        <h3>
          {width} x {height} cm
        </h3>
        <h3>{technich}</h3>
        <img src={coverImage.url} alt="" />
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
      params,
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
