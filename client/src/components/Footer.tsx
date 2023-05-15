import React from 'react'
import {BsInstagram, BsGithub, BsLinkedin} from 'react-icons/bs'
import './Footer.css'

function Footer() {
    return (
      <div className='app__social'>
          <div className='footer_div'>
              <BsLinkedin
              style={{cursor: "pointer"}}
              onClick={(e) => {
                window.open("https://www.linkedin.com/in/vinicius-rcampos/", "_blank");
        }}/>
          </div>
          <div className='footer_div'>
              <BsGithub
              style={{cursor: "pointer"}}
              onClick={(e) => {
                window.open("https://github.com/ViniciusRCampos", "_blank");
        }} 
              />
          </div>
      </div>
    )
  }
  
  export default Footer