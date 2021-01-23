import styles from "./container.module.css"

export default function Container({ children }) {
  return (
    <div className={`${styles.container} max-w-screen-lg mx-auto`}>
      {children}
    </div>
  )
}
