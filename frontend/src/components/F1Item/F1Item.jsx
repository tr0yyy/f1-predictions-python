import React, {useContext} from 'react'
import './F1Item.css'
import { assets } from '../../assets/frontend_assets/assets'

const F1Item = ({id, name, description, image}) => {

  return (
    <div className='f1-item'>
      <div className="f1-item-img-container">
        <img className='f1-item-image' src={image} alt="" />
      </div>
      <div className="f1-item-info">
        <div className="f1-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="f1-item-desc">{description}</p>
      </div>
      
    </div>
  )
}

export default F1Item
