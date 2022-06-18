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

<div className='container'>
        <div class="row">
<div className='col-md-2'></div>
<div className='col-md-8'>
<p className='font40p text-center'>THE NEVER ENDING GAME COMMUNITY</p>
<div className=' mart26pa aim-of-the-game-graphic bold-font-disc'>
 <p className="aim-content"> <strong  class="the-basic-norm text-deunder">THE NE GAMES DICTIONARY </strong>
 </p>
 <p className='dic-mar'>Our NE GAMES dictionary has over 100,000 words and associated meanings.</p>

<br/>

<p className="aim-content"> <strong class="the-basic-norm">DISCLAIMER: </strong> 
However, we are aware that it is not 100% complete, with some words missing, some meanings which
 could be improved and even some words that could be deleted.
</p>
<br/>


<p className="aim-content">
As members of the growing Never Ending Game Community, we ask for your help in updating the NE 
GAMES dictionary by using the "suggest a word" link in the menu on the dashboard page to make 
any suggestions you see fit.  We will update the dictionary appropriately.
</p>

<p style={{marginTop:"10px", textAlign: "left"}} class="the-basic-norm">Many thanks and enjoy NE-<i>Lite</i></p>
<p style={{marginTop:"10px", textAlign: "left"}} class="note-dictonary">
<span className='the-note'>Note:</span> In general, English and American spellings are included in the NE GAMES dictionary.
</p>
</div>
</div>
<div className='col-md-2'></div>
</div>
</div>

        <br />
        

        {settingshow ?
          <Sound settinghide={setsettingshow} audioRef={props.audio} />
          : ""}
      </div>
    </>
  )
}
