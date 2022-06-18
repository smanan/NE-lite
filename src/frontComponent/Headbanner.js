
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"

import Carousel from "./Carousel"
function Headbanner() {
  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "";
  }, [])
  return (
    <>
      {/* <div className="bannerbox"> */}
      {/* <img src="./images/Website Background.gif" className="d-block w-100" alt="..." height={"240px"} /> */}
      {/* <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require('../assets/images/banner.png')} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
    <img src={require('../assets/images/banner.png')} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
    <img src={require('../assets/images/banner.png')} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}


      {/* </div> */}
      <div className="aboutbox" >
        <img src="../images/rahul-raghav-design_05.jpg"  style={{ width: "100%" }} alt="" />


        <div className="abouttext">
          <p className="aboutfont text-center text-white">About Us</p>
          <p className="aboutfont1 text-center text-white">NE GAMES specialise in producing: "fun and challenging games for all the family". Fun is the core element of our games, but where <br />possible, they are designed so that they are as much fun for young people to play as they are for adults.</p>

          <div className="" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center", marginTop: "30px"
          }}>
            <Link to="/About"><button className='active headbuton '  >READ MORE</button></Link>
          </div>
        </div>

      </div>
      <div className="nelitebox">
        <img src="../images/laptop-bg.png" className='backremove'  style={{ width: "100%" }} alt="" />

        <div className="nelitetext133">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className=" aboutfontnelite text-white" >NE <i>Lite</i></p>
                <p className="aboutfont2 text-white"  > It is a brand new word game which has never been played by anyone digitally or a on board prior to Apr 2022. It's a fun game of skill that tests your knowledge of English vocabulary and spelling with four levels of difficulty. This makes the game equally fun and challenging for children from an early reading age, through teenagers, to adults of any standard of English, all the way up to the very best word smiths.</p>
                <div className="neliteread" >
                  <Link to="/Nelite"><button className='active headbuton '   >READ MORE</button></Link>
                </div>
                </div>

                <div className="col-md-6" style={{ display: "flex", justifyContent: "end" }}>
                  <img src="../images/Avatar_Animation-2.gif" className='animated'  style={{ width: "80%" }} alt="" />
                </div>
              </div>
            </div>


          </div>

        </div>




        <div style={{ background: "#000" }} >
          <div className="container-fluid">

            <p className="aboutfont text-center text-white">NE <i>Lite</i> Images</p>
            <br />

            <Carousel />
            <br />



          </div>
        </div>

        {/* <Bannerad /> */}



      </>
      )
}

      export default Headbanner;
