import styles from "./home-categories.module.css"

export default function HomeCategories({ categories }) {
  return (
    <div className={styles.wrapper}>
      {categories &&
        categories.map((category) => (
          <div key={category.id} className={styles.categoryContainer}>
            <h2>{category.titulo}</h2>
            <div className={styles.imgContainer}>
              <div className={styles.imgWrapper}>
                <img
                  src={
                    category.works[
                      Math.floor(Math.random() * category.works.length)
                    ].coverImage.url
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
