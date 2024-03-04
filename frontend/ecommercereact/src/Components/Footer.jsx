import React from 'react'
import FooterCss from '../cssfolder/footer.module.css'
import { LuInstagram } from "react-icons/lu";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineFacebook } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className={FooterCss.mainfooter}>
      <div className={FooterCss.container}>
        <ul className={FooterCss.ullist}>
          <li>Home</li>
          <li>About us</li>
          <li>Jobs</li>
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>Contactus</li>
          <li>Payment</li>
          <ul className={FooterCss.logolist}>
            <li><LuInstagram /></li>
            <li><CiLinkedin /></li>
            <li><AiOutlineFacebook /></li>
            <li><RiTwitterXLine /></li>
          </ul>
        </ul>
        
      </div>
      <footer className={FooterCss.footer}>

        <div className={FooterCss.waves}>
          <div className={FooterCss.wave} id={FooterCss.wave1} />
          <div className={FooterCss.wave} id={FooterCss.wave2} />
          <div className={FooterCss.wave} id={FooterCss.wave3} />
          <div className={FooterCss.wave} id={FooterCss.wave4} />
        </div>
        <p>©2023 Nadine Coelho | All Rights Reserved</p>
      </footer>

    </div>
  )
}

export default Footer