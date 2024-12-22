import React, {useContext} from 'react'
import './F1Display.css'
import { F1Context } from '../../context/F1Context'
import F1Item from '../F1Item/F1Item'

const F1Display = ({category}) => {

    const {f1_list} = useContext(F1Context)

  return (
    <div className='f1-display' id='f1-display'>
      <h2>Cele mai captivante curse sunt aici!</h2>
      <div className="f1-display-list">
        {f1_list.map((item, index)=>{
            if(category==="All" || category===item.category){
                return <F1Item key={index} id={item._id} name={item.name} description={item.description} image={item.image}/>
            }
        })}
      </div>
    </div>
  )
}

export default F1Display
