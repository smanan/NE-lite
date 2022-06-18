import React from 'react'
import NewLogin from './frontComponent/NewLogin'
import BackButton from './frontComponent/BackButton'


const NewHome = (props) => {
    const {loginhandler, emailcheck, changeemail, err, passwerr,loader,setloader, popup,removepopup, removeerrbox, updatefill, mailfillds} = props
  return (
    <div className="Newbannerbox"> 
    <BackButton  />
<NewLogin  loginhandler={loginhandler} emailcheck={emailcheck} changeemail={changeemail} err={err} passwerr={passwerr} loader={loader} setloader={setloader} popup={popup}   removepopup={removepopup} removeerrbox={removeerrbox} updatefill={updatefill} mailfillds={mailfillds} />
    </div>
  )
}

export default NewHome