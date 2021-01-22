import { data } from "autoprefixer"

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        preview
          ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }

  return json.data
}

export async function getWorkById(workId) {
  const data = await fetchAPI(
    `
    query WorkById($id: ID!){
      work(where: {id: $id}){
        id
        title
        height
        width
        technich
        coverImage{
          id
          url
        }
        category{
          titulo
        }
      }
    }`,
    {
      preview: false,
      variables: {
        id: workId,
      },
    }
  )
  return data.work
}

export async function getWorksByCategory(categoryName) {
  const data = await fetchAPI(
    `
    query WorksByCategory($category: String!){
      works(where: {category:{titulo: $category} }) {
        id,
          coverImage {
            url
          }
          category {
            titulo
          }
        }
    }`,
    {
      preview: false,
      variables: {
        // stage: "PUBLISHED",
        category: categoryName,
      },
    }
  )
  return data.works
}

export async function getAllCategories({ preview = false }) {
  const data = await fetchAPI(
    `
    query AllCategories {
      categories {
        id
        titulo
        works{
          coverImage {
            id
            url
            height
            width
          }
        }
      }
    }
    `,
    {
      preview,
      variables: {},
    }
  )
  return data.categories
}

export async function getAllWorks({ preview = flase }) {
  const data = await fetchAPI(
    `query AllWorks{
      works {
        id
      }
    }`,
    {
      preview,
      variables: {},
    }
  )

  return data.works
}
