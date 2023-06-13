import styles from './page.module.css'
import Header from '@/components/header'
import NotesListPage from '@/pages/NotesListPage'

function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <NotesListPage />
    </main>
  )
}


export default Home;