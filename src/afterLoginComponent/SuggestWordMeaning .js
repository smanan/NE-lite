import React, { useState, useEffect } from 'react';
import Menubar from './Menubar';
import Button from 'react-bootstrap/Button';

export default function SuggestWordMeaning(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  const [word, setword] = useState("")
  const [defination, setdefination] = useState("")
  const [color1, setcolor1] = useState("")
  const [error, seterror] = useState("")
  const [popshow, setpopshow] = useState(false)


  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  })

  async function addword() {
    if (word === "") {
      seterror("Word is required")
      setpopshow(true)
      setcolor1("#C70100")
    } else if (defination === "") {
      seterror("Meaning is Required")
      setpopshow(true)
      setcolor1("#C70100")
    } else {
      var myHeaders = new Headers();
      myHeaders.append(
        'APPKEY',
        'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
      );

      var formdata = new FormData();
      formdata.append('word', word);
      formdata.append("definition", defination)
      formdata.append("user_id", window.sessionStorage.getItem("id"))




      const url = `${process.env.REACT_APP_URL}/api/addSuggestedWord`


      await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      }).then((response) => response.json())
        .then(async (response) => {
          if (response.status === 200) {
            seterror(response.success_message)
            setpopshow(true)
            setcolor1("#00c767")
            setword("")
            setdefination("")


          } else {

            seterror(response.error_message)
            setpopshow(true)
            setcolor1("#C70100")
          }
        })
    }
  }


  return <>
    <Menubar setpop={setsettingshow} audioRef={props.audio} />
    <br /><br /><br />


    <div className='container-fluid'>

      <div className='formbox'>

        <div className='formboxs p-4 pt-4' >
          <h4 className='text-center' style={{ color: "white" }}>Add New Word</h4>



          <input type="text" name="name" placeholder='Enter Word' autoComplete='off' value={word} onChange={(e) => { setword(e.target.value) }} />
          <br />

          <textarea type="text" name="username" placeholder='Enter Meaning' autoComplete='off' value={defination} onChange={(e) => { setdefination(e.target.value) }}></textarea>
          <br />
          <div className='container' style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "column" }}>
            <Button className='  btnbox text-center mb-1' onClick={addword}  ><span style={{color:"white"}}>Add Word</span></Button>


            <Button className=' btnbox2 text-center mb-1' onClick={addword} style={{borderRadius:"18px"}} >Change Meaning</Button>

            <Button className=' btnbox1  text-center mb-1' onClick={addword}  >Remove Word</Button>
          </div>
        </div>
      </div>
    </div>





    {popshow ? <>
      <div className='modalmaindiv' id='welcomeDiv'>
        <div className='modaldiv'>
          <div className=" cardbox " style={{ backgroundColor: color1 }} >
            {color1 === "#C70100" ? <><div className='eorriconbox'><i className="fa fa-exclamation-triangle"></i></div></> : <><div className='eorriconbox'><i className="fa fa-badge-check"></i></div></>}



            <br />
            <h2 className='text-center text-white'>{error}</h2>
            <br />
            <div className='mainerrorclosebtn'>
              <div className="errorclosebtn " onClick={() => { setpopshow(false) }}><p>OK</p></div>
            </div>

          </div>
        </div>
      </div>
    </> : ""}
  </>
}
