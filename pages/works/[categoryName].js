import { getAllCategories, getWorksByCategory } from "lib/graphcms"

export default function Category({ works, preview }) {
  return (
    <div>
      {works.map((work) => (
        <img key={work.id} src={work.coverImage.url} alt="" />
      ))}
    </div>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const works = await getWorksByCategory(params.categoryName, preview)
  return {
    props: {
      preview,
      works,
    },
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
