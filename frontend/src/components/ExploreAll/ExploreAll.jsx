import React from 'react'
import './ExploreAll.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreAll = ({category, setCategory}) => {
  return (
    <div className='explore-all' id='explore-all'>
        <h1>Exploreaza intreaga lume Formula 1</h1>
        <p className='explore-all-text'>Simte fiorul vitezei, preciziei și adrenalinei! Plonjează în lumea Formula 1, unde tehnologia de vârf întâlnește măiestria fără egal. Trăiește drama, pasiunea și gloria în timp ce cei mai buni piloți din lume se întrec pe circuitele iconice de pe tot globul. Formula 1: Mai mult decât o cursă – este un spectacol!</p>
        <div className="explore-all-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev==item.menu_name?"All":item.menu_name)} key={index} className="explore-all-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreAll
