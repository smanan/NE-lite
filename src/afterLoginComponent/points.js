import React,{useEffect} from 'react'
import Menubar from './Menubar';

export default function Points(props) {
    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";
      },[])
    return (
        <>
            <Menubar audioRef={props.audio}/>
            
               
                    <div className="dict1" >
                        <div  style={{ textAlign: "center" }}>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h4 className='text_color ' style={{ color: "#fff", fontWeight: "700" }}>Points & Rankings</h4>
                                </div>
                                
                            </div>

                            <div className='row' >
                                <div className='col-md-12'>
                                    <h4 className='color-white-points' style={{ color: "#1a1616", textAlign: "center", marginTop: "5px", marginBottom: "5px" }}>
                                        <p  className='color-white-points you-earn'>You earn points every time you win a game.</p>
                                        <div className='row' style={{marginTop:"10px; "}}>
                                            <div className='col-md-4' style={{ paddingTop:"5px", borderBottom:"0px solid #fff"}}>
                                                <p className='color-white-points'><b>EASY</b></p>
                                                <p className='color-white-points'>300</p>
                                            </div>
                                            <div className='col-md-4' style={{  paddingTop:"5px", borderBottom:"0px solid#fff"}}>
                                                <p className='color-white-points'><b>MEDIUM</b></p>
                                                <p className='color-white-points'>400</p>
                                            </div>
                                            <div className='col-md-4'style={{  paddingTop:"5px", borderBottom:"0px solid #fff"}}>
                                                <p className='color-white-points'><b>EXPERT</b></p>
                                                <p className='color-white-points'>500</p>
                                            </div>
                                        </div>
                                    
                                        <div className='row'>
                                            <div className='col-md-4'style={{borderTop:"1px solid #fff",  paddingTop:"5px", borderBottom:"1px solid #fff"}}>
                                                <p className='color-white-points'><b>GENIUS (8)</b></p>
                                                <p className='color-white-points'>600</p>
                                            </div>
                                            <div className='col-md-4'style={{borderTop:"1px solid #fff",  paddingTop:"5px", borderBottom:"1px solid #fff"}}>
                                                <p className='color-white-points'><b>GENIUS (9)</b></p>
                                                <p className='color-white-points'>700</p>
                                            </div>
                                            <div className='col-md-4'style={{borderTop:"1px solid #fff",  paddingTop:"5px", borderBottom:"1px solid #fff"}}>
                                                <p className='color-white-points'><b>GENIUS (10)</b></p>
                                                <p className='color-white-points'>800</p>
                                            </div>
                                        </div>
                                        <p className='color-white-points' style={{ marginTop: "20px", }}>91 points are deducted for all games lost.</p>
                                        
                                        <p className='color-white-points' style={{marginTop:"20px", marginLeft: "30px", textAlign: "left" }}><b>RANKINGS TABLE:</b></p>
                                        <p className='color-white-points' style={{ marginTop:"5px",marginLeft: "30px", textAlign: "left", fontSize: "18px" }}>Your points are totalled and displayed in the rankings table.</p>
                                    
                                        <div style={{ marginLeft: "30px", textAlign: "left", fontSize: "13px" }}>
                                        <p className='color-white-points' style={{marginTop:"10px", textAlign: "left"}}><b>You are ranked by:</b></p>
                                            
                                            <p className='color-white-points'> - Age (Under 11, Under 15, Under 18 and All Ages) </p>
                                            <p className='color-white-points'> - Locally (by County/State/Province)</p>
                                            <p className='color-white-points'>- Nationally (by Country)</p>
                                            <p className='color-white-points'>- Internationally (Worldwide Ranking)</p>
                                            <br />
                                            <p className='color-white-points'><b>HISTORY:</b></p>
                                            <p className='color-white-points'>Your monthly scores are displayed in real time on the top of the levels dashboard page.</p>
                                            <br />
                                            <p className='color-white-points'><b>MONTHLY TARGETS:</b></p>
                                            <p className='color-white-points'> They are also analysed for you on your history page showing your individual monthly totals over time as targets for you to improve on each month.</p>
                                        </div>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                
          

        </>

    )
}
