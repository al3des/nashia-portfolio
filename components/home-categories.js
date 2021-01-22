import Image from "next/image"
import styles from "./home-categories.module.css"

export default function HomeCategories({ categories }) {
  function getRandomCover(category) {
    let randomWork =
      category.works[Math.floor(Math.random() * category.works.length)]
    let coverImage = randomWork.coverImage
    return (
      <img src={coverImage.url} alt="" />
      // <Image
      //   src={coverImage.url}
      //   alt=""
      //   height={coverImage.height}
      //   width={coverImage.width}
      //   layout="responsive"
      // />
    )
  }
  return (
    <div className={styles.wrapper}>
      {categories &&
        categories.map((category) => (
          <div key={category.id} className={styles.categoryContainer}>
            <h2 className={styles.categoryTitle}>{category.titulo}</h2>
            <div className={styles.imgContainer}>
              <div className={styles.imgWrapper}>
                {getRandomCover(category)}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
