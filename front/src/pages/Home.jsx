import React, { useContext, useState } from 'react'
import Column from '../components/Column/Column'
import PostsContext from '../components/Context/Postcontext'
import Header from '../components/Header/Header'
import styles from './Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const [wentWellColor, setWentWell] = useState('#44BBA4')
  const [toImproveColor, setToImprovecolor] = useState('#DA627D')
  const [kudosColor, setKudosColor] = useState('#4A8FE7')
  const { posts } = useContext(PostsContext)
  return (
    <>
      <Header />
      <h1><b>My first retro dashboard</b></h1>
      <main className={styles.main}>
        <Column
          posts={posts}
          category="wentWell"
          color={wentWellColor}
          setColor={setWentWell}
        />
        <Column
          posts={posts}
          category="toImprove"
          color={toImproveColor}
          setColor={setToImprovecolor}
        />
        <Column
          posts={posts}
          category="kudos"
          color={kudosColor}
          setColor={setKudosColor}
        />
      </main>
    </>
  )
}

export default Home