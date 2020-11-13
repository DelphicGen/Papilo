import React from 'react'
import Logo from '../../assets/footer/footer-logo.png'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import SocialMedia from './SocialMedia'

const Footer = () => {
    return (
        <div className={`flex md:flex-row flex-col items-center md:justify-between justify-center bg-red-700 py-5 px-5 text-white`}>
            
            <img src={Logo} style={{height: '40px', width: 'auto'}} alt="logo papilo" />

            <div className="flex sm:flex-row flex-col justify-around w-full md:w-fit-content mt-10 md:mt-0">
                <SocialMedia name="Facebook">
                    <FacebookIcon />
                </SocialMedia>

                <SocialMedia name="Linkedin">
                    <LinkedInIcon />
                </SocialMedia>

                <SocialMedia name="Instagram">
                    <InstagramIcon />
                </SocialMedia>

                <SocialMedia name="Twitter">
                    <TwitterIcon />
                </SocialMedia>
            </div>
            
        </div>
    )
}

export default Footer
