
import React from 'react'
// import { Link } from 'react-router-dom';


function Footer() {
  return (
    <>
      <div style={{ background: "#000" }}>

        <div className='container' style={{ paddingTop: "18px" }} >
          <div style={{
            background: "#ff9f00",
            borderRadius: "15px",
            paddingTop: "20px",
            paddingBottom: "20px"
          }}>
            <div className='row'>

              <div className='col-md-4' >
                <p style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>Location</p>
                <p style={{ fontSize: "18px", marginLeft: "46px" }} className="location">
                  D-100, Sector - 63, Noida 201301,
                  Uttar Pradesh,<br />
                  India</p>
              </div>

              <div className='col-md-4' style={{ textAlign: "center" }}>
                <p style={{ fontSize: "18px", fontWeight: "bold", }}>Call Us</p>

                <p style={{ fontSize: "18px" }}>&nbsp;&nbsp;&nbsp;<i className="fas fa-phone-alt"></i> &nbsp; +91-120 426-3501/03/04</p>

                <p style={{ fontSize: "18px" }}><i className="fas fa-envelope"></i> &nbsp;&nbsp; info@commediait.com</p>
                <div style={{ marginLeft: "23px" }}>
                  <br />
                  <a href="https://www.facebook.com/groups/939931373278304" target="blank" style={{ textDecoration: "none" }}> <div className="social-icon facebook" >
                    <i className="fab fa-facebook-f" ></i>
                  </div></a>
                  &nbsp;&nbsp;
                  <a href="https://twitter.com/negamesltd" target="blank" style={{ textDecoration: "none" }}> <div className="social-icon twitter">
                    <i className="fab fa-twitter"></i>
                  </div></a>
                  &nbsp;&nbsp;
                  <a href="https://www.linkedin.com/in/graham-jaggers-23575a208/" target="blank" style={{ textDecoration: "none" }}> <div className="social-icon linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </div></a>
                  &nbsp;&nbsp;
                  <a href="https://www.instagram.com/ne_games_ltd/" target="blank" style={{ textDecoration: "none" }}>   <div className="social-icon instagram">
                    <i className="fab fa-instagram"></i>
                  </div></a>
                  &nbsp;&nbsp;
                  <a href="http://www.pinterest.com/negamesltd" target="blank" style={{ textDecoration: "none" }}>   <div className="social-icon pinterest">
                    <i className="fab fa-pinterest"></i>
                  </div></a>
                  &nbsp;&nbsp;
                  <a href="https://www.youtube.com/channel/UCiBJcGR8Kysk4SQ9OLgzmfw" target="blank" style={{ textDecoration: "none" }}> <div className="social-icon youtube">
                    <i className="fab fa-youtube"></i>
                  </div></a>
                </div>


              </div>

              <div className='col-md-4' style={{ textAlign: "center" }}>
                <p style={{ fontSize: "18px", fontWeight: "bold", }}>Connect With Us</p>
                <p style={{ fontSize: "18px" }}>
                  <a href="https://ne-games.com/privacy_policy" rel="noreferrer" target={"_blank"} style={{ textDecoration: "none", color: 'black' }}>Privacy Policy Terms </a>|
                  <a href="https://ne-games.com/terms_and_conditions" rel="noreferrer" target={"_blank"} style={{ textDecoration: "none", color: 'black' }}> Cancellation</a> |
                  <a href="https://ne-games.com/cancellation_and_refund_policy" rel="noreferrer" target={"_blank"} style={{ textDecoration: "none", color: 'black' }}> <br /> Refund Policy</a> </p>
                <br />
                <div >
                <a href="https://play.google.com/store/apps/details?id=com.nelite.nelite" rel="noreferrer">  <img src='./images/image9.jpg' width={"100px"} /></a> &nbsp;<a href="https://apps.apple.com/us/app/itunes-connect/id376771144" rel="noreferrer"><img src='./images/image10.jpg' width={"100px"} /></a>
                </div>
              </div>

            </div>
            <div className="" style={{ width: "85%", margin: "auto" }}>

              <p className='text-center' style={{ fontSize: "18px" }}>An ISO 9001 : 2015 Certified. Designed and Developed by <a href="https://www.commediait.com" target="_Blank" rel="noreferrer" style={{ textDecoration: "none",color:"white" }}>Shriv ComMedia Solutions Pvt. Ltd.</a> <p>Software Development Company in India. All Rights Reserved</p></p>
            </div>

          </div>
          {/* <div className='' style={{ backgroundColor: "black", padding: "10px" }}>
          <p className='text-center text-white' style={{fontSize:"16px"}}>An ISO 9001 : 2015 Certified. Designed and Developed by <a href="https://www.commediait.com" target="_Blank" style={{textDecoration:"none"}}>Shriv ComMedia Solutions Pvt. Ltd.</a> - Software Development Company in India. All Rights Reserved</p>



        </div> */}
        </div>
      </div>



    </>
  )
}
export default Footer;
