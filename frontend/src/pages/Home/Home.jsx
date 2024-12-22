import React, {useState} from 'react'
import './Home.css'
import ExploreAll from '../../components/ExploreAll/ExploreAll'
import F1Display from '../../components/F1Display/F1Display'

const Home = () => {

    const [category, setCategory] = useState("All");
  return (
    <div>
      <ExploreAll category={category} setCategory={setCategory}/>
      <F1Display category={category}/>
    </div>
  )
}

export default Home
