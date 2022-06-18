import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Menubar from './Menubar';




// Custom component to wrap the PayPalButtons and handle currency changes

export default function VocabularyCenter(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  const [wordmean, setwordmean] = useState([])
  const [wordclear, setwordclearstate] = useState(false)
  const [close, setclose] = useState(false)
  const [confirm, setconfirmstate] = useState(false)
  
  const [success, setsuccess] = useState("")
  
  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  }, [])
  useEffect(() => {
    const url2 = `${process.env.REACT_APP_URL}/api/getMatchLossWord?user_id=` + window.sessionStorage.getItem("id");
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    fetch(url2, {
      headers: myHeaders
    }).then((response) => response.json())
      .then((response) => {
        if (response.status === 200 && response.message === "Success") {

          setwordmean(response.data)




        } else {

        }


      })
  }, [])

  async function clearword() {
   
    
    var myHeaders = new Headers();
    myHeaders.append(
        'APPKEY',
        'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url7 = `${process.env.REACT_APP_URL}/api/deleteAllMatchLossWord?user_id=` + window.sessionStorage.getItem("id");
    await fetch(url7, {
        headers: myHeaders
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if (response.status === 200 && response.message === "Success") {
              
              
              setclose(true)
              setsuccess(response.success_message)
            }else{
              
              setwordclearstate(false)
        
        
            }
        })
   
}

  return (
    <>

      <Menubar setpop={setsettingshow} audioRef={props.audio} />

      <div className='container-fluid'  >
        <div className="containermain backgroundgif ">
          <div className="paypalbox2 ">
            <div className="container" style={{ marginTop: "-50px" }}>

              <div className="row">
                <div className="col-md-12">
                  <p className="footerp">This is your vocabulary centre with a list of words that <b>NE GAMES</b> has identified as words you may not know and may wish to learn.</p>
                </div>
              </div>
              <div className="row" style={{ marginTop: "15px" }}>
                <div className="col-md-12">

                  <p className="footerp"><b>NE GAMES</b> is providing this "vocabulary centre" as an addition to the fun and challenging element of NE <i>Lite</i> and does not claim that it is 100% accurate.  However, <b>NE GAMES</b> is keen to provide the best meanings possible and would ask you, as members of <b>The NE GAMES Community</b>, to help us achieve that by informing us of any words or meanings that you feel could be improved upon (including adding or deleting words entirely) and we will amend our dictionary appropriately. </p>
                </div>
              </div>
              <div className="row" style={{ marginTop: "15px" }}>
                <div className="col-md-12">

                  <p className="footerp">Your amends will be reflected in everybody's vocabulary centres.</p>

                  <div className="proceed-to-clear">
              
                    <a  href="#" onClick={() => { setwordclearstate(true) }}>Request to clear</a>
                  
                  

                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-12">
                  <div className="" style={{ height: "337px", overflowY: "scroll" }}>
                    <table className="table table-responsive "  >
                      <thead style={{ backgroundColor:"#0170cd", color: "black", border: "none" }}>
                        <tr>
       
                          <th ><span class="word-text">Word</span></th>
                          <th ><span class="word-text">Meaning</span></th>

                        </tr>
                      </thead>

                      <tbody className="backgroundgif1">

                        {wordmean.length !== 0 && wordmean.map((number, key) =>
                          <tr key={key}>
                            <th scope="row">{number.correct_word.toLowerCase()}</th>
                            <td>{number.word_meaning}</td>
                          </tr>
                        )}

                       </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {wordclear ?
                    <div className='modalmaindiv2' id='welcomeDiv1'>
                        <div className='modaldiv'>
                        <button className='btn-clear-close text-center mb-1' type="text" onClick={() => { setwordclearstate(false); setconfirmstate(false); }}><i class="fa fa-window-close" aria-hidden="true"></i></button>
                            <div className=" cardbox vovulary-popup ">

                                <p className='text-center color--new-white'><h2>Request to clear</h2></p>
                                <br />

                                <p className='text-center  color--new-white' >I wish to clear my vocabulary center of all
words to date.

<br/><br/>
I understand that when I press the submit button, all the 
words and meanings I have to date will be deleted and that 
new words will subsequently appear as I Play. </p>


                                <div style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <div style={{ borderRadius: "10px", padding: "10px", width: "41%", margin: 'auto', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                    <button className='btnbox4 text-center mb-1' type="text" onClick={() => { setconfirmstate(true); setwordclearstate(false); }} >Submit</button>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                    : ""}
   
   {close ?
      <>
        <div className='modalmaindiv' id='welcomeDiv'>
          <div className='modaldiv'>
            <div className=" cardbox " style={{ backgroundColor: "#00c767" }} >
              <div className='eorriconbox'><i className="fas fa-check"></i></div>
              <br />
              <h2 className='text-center text-white'>{success}</h2>
              <br />
              <div className='mainerrorclosebtn'>
                <div className="errorclosebtn " onClick={() => { setclose(false); }}><p><Link to="/Dashboard">OK</Link> </p></div>
              </div>
            </div>
          </div>
        </div>
      </> : ""}

      {confirm ?
      <>
        <div className='modalmaindiv' id='welcomeDiv'>
          <div className='modaldiv-cancel'>
            <div className=" cardbox " style={{ backgroundColor: "#1987e3" }} >
            <div className="notificadelete">Are you sure that you wish to clear your vocabulary centre ?</div>
            
              <div className='mainerrorclosebtn'>
                <div className="cencle-btn " onClick={() => { setconfirmstate(false); setwordclearstate(false); }}><p><Link to="/VocabularyCenter">No</Link> </p></div>
                <div className="right-btn " onClick={() => { setconfirmstate(false); setwordclearstate(false); setclose(false); setsuccess(false); clearword() }}><p> yes </p></div>
              </div>
            </div>  
          </div>
        </div>
      </> : ""}



    </>
    

  );
}