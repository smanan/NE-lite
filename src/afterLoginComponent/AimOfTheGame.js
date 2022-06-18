import React, { useEffect, useState } from 'react'
import Menubar from './Menubar'
import Sound from "./Sound"
export default function Dictionary(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  })
  return (
    <>
      <Menubar setpop={setsettingshow} audioRef={props.audio} />

      <div className="mainbox">

        <div class="container">
<div class="row">
<div className='col-md-2'></div>
<div className='col-md-8'>
<p className='font40p text-center'>THE AIM OF THE GAME</p>
<div className='mart26pa aim-of-the-game-graphic'>
 <p className="aim-content"> <strong  class="the-basic-norm">TO WIN </strong>
 <br/>Play letters in turn with the computer trying to make the computer play a letter that ends 
 or completes a word more than three letters long.</p>

<p style={{marginTop:"20px", textAlign: "left"}} className="aim-content">However, <strong  class="the-basic-norm">YOU LOSE</strong> if <strong  class="the-basic-norm">YOU</strong> play a letter that ends or completes a word of more than three letters</p>
<br/> 
<p style={{marginTop:"0px", textAlign: "left"}}  class="aimargin-none"><strong>A WORD THAT CANNOT BE MADE </strong></p>

<p className="aim-content">You will also <strong class="the-basic-norm">LOSE</strong> if <strong class="the-basic-norm">YOU</strong>  play a letter that makes it impossible to make a word that is in the NE Games Dictionary.
</p>
<br/>

<p style={{marginTop:"0px", textAlign: "left"}} class="aimargin-none"><strong>DIFFICULTY LEVELS</strong></p>
<p className="aim-content">There are four levels of difficulty: easy, medium, expert and genius. Young 
children can play the easy level.  Genius level will challenge the very best word smiths.</p>

<p style={{marginTop:"10px", textAlign: "left"}} class="the-basic-norm">Select the level you want to play at by clicking on the top tool bar on the dashboard</p>

</div>
</div>
<div className='col-md-2'></div>
</div>
</div>

       

        {settingshow ?
          <Sound settinghide={setsettingshow} audioRef={props.audio} />
          : ""}
      </div>
    </>
  )
}
