async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  console.log(process.env.GRAPHCMS_PROJECT_API)
  const json = await res.json()

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllCategories({preview = false}) {
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
          }
        }
      }
    }
    `,
    {
      preview,
      variables: {
       
      },
    }
  )
  return data.categories
}
