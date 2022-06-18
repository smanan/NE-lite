import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import Sharehook from './sharehook';
import Sound from "./Sound"
export default function Genius(props) {
    const [settingshow, setsettingshow] = useState(props.setting)
    const history = useHistory();
    const [exitstate, setExitState] = useState(false)
    const [storesummary, setStoresummary] = useState([{ "CountTotalWin": "0", "CountTotalLoss": "0", "totalPoints": "0", "totalWin": "0", "totalLoss": "0" }])
    const [roundcounter, setRoundCounter] = useState(window.sessionStorage.getItem("counter"));

    const [classnm, setclassnm] = useState("easylose")

    const [color, setcolor] = useState("linear-gradient(#977f72, #c3a26e)")
    const [image, setimage] = useState("lose_reslut.png")
    const [val, setVal] = useState("");
    const [val1, setVal1] = useState("")
    const [defination, setDefination] = useState("")
    const [turn, setTurn] = useState("computer");
    const [startgame, setStartGame] = useState(true)
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [countset, setcountset] = useState(3);
    const [showTimer, setShowTimer] = useState(false);

    const [conmsgdown, setconmsgdown] = useState("")
    const [conmsg, setconmsg] = useState("")

    const [gameoverbox, setGameOverBox] = useState(false)

    const [msg, setMsg] = useState("")



    const [turndata, setturndata] = useState("")

    useEffect(() => {
        if (window.sessionStorage.getItem("subscribe") === "") {
            history.push("/Paymentplan")
        }
    })

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";
    }, [])
    const startGame = async () => {




        setturndata("")


        setTurn("user");

        setMinutes(2)
        setSeconds(0)
        setcountset(3)

        setShowTimer(true);





    }


    useEffect(() => {
        if (turndata !== "") {

        } else {

            if (countset > 0) {
                if (countset > 2) {
                    if (minutes === 0) {
                        setcountset(countset - 1);
                    }
                } else {
                    if (seconds === 0) {
                        setcountset(countset - 1);
                    }
                }

                let myInterval = setInterval(() => {
                    if (seconds > 0) {
                        setSeconds(seconds - 1);
                    }
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(myInterval);
                        } else {
                            setMinutes(minutes - 1);
                            setSeconds(59);
                        }
                    }
                }, 1000);
                return () => {
                    clearInterval(myInterval);
                };
            } else {
                setGameOverBox(true)
                setExitState(false)
                const url = `${process.env.REACT_APP_URL}/api/level_four?search=` + window.sessionStorage.getItem("geniusword").toLowerCase() + "&length=" + window.sessionStorage.getItem("length");

                const myHeaders = new Headers();
                myHeaders.append(
                    'APPKEY',
                    'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                );
                fetch(url, {
                    headers: myHeaders
                }).then((response) => response.json())
                    .then((response) => {

                        if (response.status === 200 && response.message === "Success") {

                            const word = response.data.word;
                            setVal1(word.toUpperCase())
                            setDefination(response.data.definition)

                        }
                    })

                setclassnm("easylose")
                setimage("lose_reslut.png")
                setcolor("linear-gradient(#977f72, #c3a26e)")
                setMsg("TRY AGAIN")
                setconmsg("Time Out!")
                setconmsgdown("A word that could have been made is")

            }






        }
    }, [minutes, seconds, countset, turn]);

    const handle = (event) => {
        var newVal = event.target.name
        if (window.sessionStorage.getItem("sound") === "true") {

            if (newVal === "A") {
                new Audio("./a.mp3").play()
            } else if (newVal === "B") {
                new Audio("./b.mp3").play()
            }
            else if (newVal === "C") {
                new Audio("./c.mp3").play()
            }
            else if (newVal === "D") {
                new Audio("./d.mp3").play()
            }
            else if (newVal === "E") {
                new Audio("./e.mp3").play()
            }
            else if (newVal === "F") {
                new Audio("./f.mp3").play()
            }
            else if (newVal === "G") {
                new Audio("./g.mp3").play()
            }
            else if (newVal === "H") {
                new Audio("./h.mp3").play()
            }
            else if (newVal === "I") {
                new Audio("./i.mp3").play()
            }
            else if (newVal === "J") {
                new Audio("./j.mp3").play()
            }
            else if (newVal === "K") {
                new Audio("./k.mp3").play()
            }
            else if (newVal === "L") {
                new Audio("./l.mp3").play()
            }
            else if (newVal === "M") {
                new Audio("./m.mp3").play()
            }
            else if (newVal === "N") {
                new Audio("./n.mp3").play()
            }
            else if (newVal === "o") {
                new Audio("./o.mp3").play()
            }
            else if (newVal === "P") {
                new Audio("./p.mp3").play()
            }
            else if (newVal === "Q") {
                new Audio("./q.mp3").play()
            }
            else if (newVal === "R") {
                new Audio("./r.mp3").play()
            }
            else if (newVal === "S") {
                new Audio("./s.mp3").play()
            }
            else if (newVal === "T") {
                new Audio("./t.mp3").play()
            }
            else if (newVal === "U") {
                new Audio("./u.mp3").play()
            }
            else if (newVal === "V") {
                new Audio("./v.mp3").play()
            }
            else if (newVal === "W") {
                new Audio("./w.mp3").play()
            }
            else if (newVal === "X") {
                new Audio("./x.mp3").play()
            }
            else if (newVal === "Y") {
                new Audio("./y.mp3").play()
            }
            else if (newVal === "Z") {
                new Audio("./z.mp3").play()
            }



        }
        if (event.target.name === "back" && val.length > 0) {
            setVal(val.slice(0, val.length - 1))
        } else {
            if (event.target.name === "back") {

            } else {
                if (val.length < window.sessionStorage.getItem("length")) {
                    setVal((val + event.target.name).toUpperCase())
                }
            }

        }







        setTurn("computer");







    };


    useEffect(() => {
        startGame()




    }, [startgame]);










    function getrandomInput(inputStr, randomStr) {

        let randomStrmap = new Map();
        let inputStrmap = new Map();

        for (let i = 0; i < randomStr.length; i++) {
            randomStrmap.set(i, String(randomStr.charAt(i)));
        }

        for (let i = 0; i < inputStr.length; i++) {
            for (let j = 0; j < randomStr.length; j++) {
                if (inputStr.charAt(i) === randomStr.charAt(j) && !inputStrmap.has(j)) {
                    inputStrmap.set(j, String(randomStr.charAt(j)));
                    break;
                }
            }
        }
        var unionKeys = new Set(inputStrmap.keys());

        for (const [key, value] of randomStrmap.entries()) {
            unionKeys.add(key)
        }




        for (const [key, value] of inputStrmap.entries()) {
            unionKeys.delete(key)
        }

        var arr1 = Array.from(unionKeys)

        return randomStrmap.get(arr1[Math.floor((Math.random() * arr1.length) + 0)])
    }
    async function Play() {


        if (getrandomInput(val.toLowerCase(), window.sessionStorage.getItem("geniusword").toLowerCase()) === undefined) {





            let url = `${process.env.REACT_APP_URL}/api/level_four?search=` + window.sessionStorage.getItem("geniusword").toLowerCase() + "&length=" + window.sessionStorage.getItem("length");

            var myHeaders = new Headers();
            myHeaders.append(
                'APPKEY',
                'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
            );

            const url1 = `${process.env.REACT_APP_URL}/api/check_word?search=` + val.toLowerCase();
            const wordFinder = new Promise(async (resolve, reject) => {
                await fetch(url1, {
                    headers: myHeaders
                }).then((response) => response.json())
                    .then((response) => {
                        resolve(response)

                    }).catch((err) => {
                        reject(err)
                    })
            })
            wordFinder.then(async (result) => {

                if (result.status === 200 && result.message === "Success") {


                    setconmsgdown("")
                    setDefination(result.data.definition)
                    setGameOverBox(true)
                    setVal1("")
                    setimage("win_reslut.png")
                    setcolor("linear-gradient(1deg,#33cc66,#33cc66,#33cc66,#33cc66)")

                    setclassnm(`easywinnergenius${window.sessionStorage.getItem("length")}`)
                    setconmsg("You completed the word")
                    setturndata("deded2")
                    setMsg("YOU WIN")




                } else {
                    await fetch(url, {
                        headers: myHeaders
                    }).then((response) => response.json())
                        .then((response) => {

                            if (response.status === 200 && response.message === "Success") {

                                const word = response.data.word;




                                setVal("")
                                setconmsg("")
                                setconmsgdown("Computer completed the word ")
                                setVal1(word.toUpperCase())
                                setDefination(response.data.definition)
                                setMsg("TRY AGAIN")
                                setclassnm("easylose")
                                setimage("lose_reslut.png")
                                setcolor("linear-gradient(#977f72, #c3a26e)")
                                setGameOverBox(true)
                                setturndata("dsdsd")


                            }


                        })

                }
            })

        } else {
            alert("you have used an incorrect letter")
        }


    }




    function showDiv() {
        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        if (msg === "TRY AGAIN") {

            var formdata2 = new FormData();
            formdata2.append('user_id', window.sessionStorage.getItem("id"));
            formdata2.append('match_id', window.sessionStorage.getItem("match_id"));
            formdata2.append('level', roundcounter);
            formdata2.append('length', "0");
            if (val === "") {
                formdata2.append('incorrect_word', val1);
                formdata2.append('correct_word', val1);
            } else {
                formdata2.append('incorrect_word', val);
                formdata2.append('correct_word', val1);
            }

            formdata2.append('word_meaning', defination);




            const url4 = `${process.env.REACT_APP_URL}/api/createMatchLossWord`


            fetch(url4, {
                method: 'POST',
                headers: myHeaders,
                body: formdata2,
                redirect: 'follow',
            }).then((response) => response.json())
                .then(async (response) => {

                    if (response.status === 200) {




                    } else {

                    }


                })

            var formdata = new FormData();
            formdata.append('id', window.sessionStorage.getItem("mat_id"));
            formdata.append('round', roundcounter);
            formdata.append('status', "0");
            formdata.append('points', "-91");





            const url3 = `${process.env.REACT_APP_URL}/api/match/round`


            fetch(url3, {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            }).then((response) => response.json())
                .then(async (response) => {

                    if (response.status === 200) {




                    } else {

                    }


                })
        } else {

            var formdata3 = new FormData();
            formdata3.append('user_id', window.sessionStorage.getItem("id"));
            formdata3.append('match_id', window.sessionStorage.getItem("match_id"));
            formdata3.append('level', roundcounter);
            formdata3.append('length', "0");
            if (val === "") {
                formdata3.append('incorrect_word', val1);
                formdata3.append('correct_word', val1);
            } else {
                formdata3.append('incorrect_word', val);
                formdata3.append('correct_word', val);
            }

            formdata3.append('word_meaning', defination);





            const url5 = `${process.env.REACT_APP_URL}/api/createMatchLossWord`


            fetch(url5, {
                method: 'POST',
                headers: myHeaders,
                body: formdata3,
                redirect: 'follow',
            }).then((response) => response.json())
                .then(async (response) => {

                    if (response.status === 200) {




                    } else {

                    }


                })
            var formdata1 = new FormData();
            formdata1.append('id', window.sessionStorage.getItem("mat_id"));
            formdata1.append('round', roundcounter);
            formdata1.append('status', "1");
            formdata1.append('points', "+91");





            const url3 = `${process.env.REACT_APP_URL}/api/match/round`


            fetch(url3, {
                method: 'POST',
                headers: myHeaders,
                body: formdata1,
                redirect: 'follow',
            }).then((response) => response.json())
                .then(async (response) => {

                    if (response.status === 200) {




                    } else {

                    }


                })
        }
        setturndata("")
        setMinutes(2)
        setSeconds(0)
        setcountset(3)
        document.getElementById('welcomeDiv').style.display = "none";
        window.sessionStorage.setItem("counter", parseInt(roundcounter) + 1)
        history.push("/Genius")

        //   handles()

        //   setGameOverBox(false)


    }
    async function exit() {
        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        const url4 = `${process.env.REACT_APP_URL}/api/user/exit?user_id=` + window.sessionStorage.getItem("id");
        await fetch(url4, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {




                } else {


                }


            })
        const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");



        await fetch(url2, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {

                    if (window.sessionStorage.getItem("logintype") === "username") {
                        window.sessionStorage.setItem("image", response.image_path + "/" + response.data.image);
                    }
                    window.sessionStorage.setItem("hints", response.hints)
                    window.sessionStorage.setItem("points", response.currentMonth_total_points)


                } else {


                }


            })
        setMinutes(2)
        setSeconds(0)
        setcountset(3)
        setExitState(false)
        setRoundCounter(1)
        window.sessionStorage.setItem("counter", 1)
    }


    async function concede() {
        const url = `${process.env.REACT_APP_URL}/api/level_four?search=` + window.sessionStorage.getItem("geniusword").toLowerCase() + "&length=" + window.sessionStorage.getItem("length");

        const myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        await fetch(url, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {

                if (response.status === 200 && response.message === "Success") {

                    const word = response.data.word;
                    setVal1(word.toUpperCase())
                    setDefination(response.data.definition)

                }
            })

        setGameOverBox(true)
        setimage("lose_reslut.png")
        setcolor("linear-gradient(#977f72, #c3a26e)")
        setclassnm("easylose")
        setMsg("TRY AGAIN")
        setconmsg("You conceded")
        setconmsgdown("A word that could have been made is")

        setturndata("dsds")





    }
    async function getsummarydata() {
        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        const url7 = `${process.env.REACT_APP_URL}/api/getCurrentPoint?match_id=` + window.sessionStorage.getItem("match_id");
        await fetch(url7, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {

                if (response.status === 200 && response.message === "Success") {
                    setStoresummary([{
                        "CountTotalLoss": response.CountTotalLoss,
                        "CountTotalWin": response.CountTotalWin,
                        "totalLoss": response.totalLoss,
                        "totalWin": response.totalWin,
                        "totalPoints": response.totalPoints
                    }])

                }
            })
        setExitState(true)
    }




    return (

        <>


            <div className='easybg_image'>


                <div className='layer'>

                    <div className="flex-container">

                        <div className="">
                            <div className=' mt-1 ml-5' onClick={getsummarydata}>    <img src="./images/back-btn.png" className="extbtn" alt="..."  height={"40px"} width={"40px"}/> </div>
                        </div>
                        <div className="" style={{ color: "white" }}>
                            <h2 className='text-center mb-2'>NE <i>Lite</i></h2>
                            <h4 className='text-center'>Genius Level Word : {window.sessionStorage.getItem("length")}</h4>
                        </div>
                        <div className="">
                            <div className=' mt-1 ml-5' style={{ float: ' right' }} onClick={() => { setsettingshow(true) }}><img src="./Newdesign/dashboard/settings.png" className="extbtn" alt="..." height={"40px"} width={"40px"} /> </div>
                        </div>


                    </div>
                    {settingshow ?
                        <Sound settinghide={setsettingshow} audioRef={props.audio} />
                        : ""}

                </div>




                <div className="container">
                    <div className="esaybox" style={{ marginTop: "-10px" }}>
                        <div className="esayprofilebox">

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="circal">
                                        <img src={window.sessionStorage.getItem("image")} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "./profilephoto.png";
                                        }} className="circalbox1" alt="..." />
                                    </div>

                                </div>
                                <div className="col-md-6">
                                <h6 className='text-center mt-3' ><i>Play letters anywhere and re-arrange them</i></h6>
                                    <h4 className="text-center mt-2" >GAME : {roundcounter}</h4>

                                    <h2 className="text-center mt-2" style={{ visibility: showTimer ? "visible" : "hidden", marginTop: "21px " }}>00:0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
                                    <h3 className="text-center  mt-2" style={{ color: "white" }}>{window.sessionStorage.getItem("geniusword")}</h3>
                                </div>
                                <div className="col-md-3">
                                    <div className="circal">
                                        <img src="./images/computer.gif" className="circalbox1" alt="..." />
                                    </div>
                                </div>
                            </div>  </div>



                        <div className="mainformbox">
                            <div className="formboxs2">
                                <h1 className=" easytextbox3 mt-2" style={{ height: "45px" }} > {val}</h1>
                            </div>
                        </div>







                        <div className="keybordbox mr-5 ml-5">




                            <br />
                            <div id="keyword">

                                <div className="keyfirstrow" >
                                    <button className="operator mediumlevel" name='Q' id="clear" onClick={handle}>Q</button>
                                    <button className="operator mediumlevel" name='W' id="backspace" onClick={handle} >W</button>
                                    <button className="operator mediumlevel" name='E' id="%" onClick={handle} >E</button>
                                    <button className="operator mediumlevel" name='R' id="/" onClick={handle} >R</button>
                                    <button className="number mediumlevel" name='T' id="7" onClick={handle} >T</button>
                                    <button className="number mediumlevel" name='Y' id="8" onClick={handle} >Y</button>
                                    <button className="number mediumlevel" name='U' id="9" onClick={handle} >U</button>
                                    <button className="operator mediumlevel" name='I' id="*" onClick={handle} >I</button>
                                    <button className="number mediumlevel" name='o' id="4" onClick={handle} >O</button>
                                    <button className="number mediumlevel" name='P' id="5" onClick={handle} >P</button><br />
                                </div>
                                <div className="keysecondbox">
                                    <button className="number mediumlevel" name='A' id="6" onClick={handle} >A</button>
                                    <button className="operator mediumlevel" name='S' id="-" onClick={handle} >S</button>
                                    <button className="number mediumlevel" name='D' id="1" onClick={handle} >D</button>
                                    <button className="number mediumlevel" name='F' id="2" onClick={handle} >F</button>
                                    <button className="number mediumlevel" name='G' id="3" onClick={handle} >G</button>
                                    <button className="operator mediumlevel" name='H' id="+" onClick={handle} >H</button>
                                    <button className="empty mediumlevel" name='J' id="empty" onClick={handle} >J</button>
                                    <button className="number mediumlevel" name='K' id="0" onClick={handle} >K</button>
                                    <button className="empty mediumlevel" name='L' id="empty" onClick={handle} >L</button><br />
                                </div>
                                <div className='keythirdbox'>
                                    <button className="operator mediumlevel" name='Z' id="=" onClick={handle} >Z</button>
                                    <button className="operator mediumlevel" name='X' id="=" onClick={handle} >X</button>
                                    <button className="operator mediumlevel" name='C' id="=" onClick={handle} >C</button>
                                    <button className="operator mediumlevel" name='V' id="=" onClick={handle} >V</button>
                                    <button className="operator mediumlevel" name='B' id="=" onClick={handle} >B</button>
                                    <button className="operator mediumlevel" name='N' id="=" onClick={handle} >N</button>
                                    <button className="operator mediumlevel" name='M' id="=" onClick={handle} >M</button>
                                    <button className="operator1 mediumlevel" name='back' id="=" onClick={handle} >CLEAR</button>
                                </div>
                                <div className='hintbtbmain' >
                                    <button className='btnbox4 text-center mb-3' onClick={Play}  >Check</button>
                                    <button className='btnbox2 text-center mb-3' onClick={concede} >Concede</button>
                                </div>
                            </div>

                        </div>






                    </div>
                </div>


                <div>{gameoverbox ?



                    <div className='modalmaindiv2' id='welcomeDiv'>
                        <div className='modaldiv'>
                            <div className=" cardbox bg-color-code-blue">
                                <div className="closebuttonmain mt-4">
                                    <div className='colsebutton'  >

                                        <img src="./images/navlogo.png" className="loseimg" alt="..." />

                                    </div>
                                </div>
                                <br />
                                <h2 className='text-center color-white'>{msg}</h2>

                                <div className={classnm}>
                                    <div className='mainimg color-white'>

                                    </div>
                                </div>

                                <p className='text-center color-white'>{conmsg}</p>
                                <h2 className='text-center  color-white'>{val}</h2>

                                <p className='text-center color-white'>{conmsgdown}</p>

                                <h2 className='text-center color-white white-color-lose'>{val1}</h2>
                                <p className='text-center mb-2 color-white' ><i>{defination}</i></p>
                                <button type="button" className="mainroundbtn roundbtn" onClick={showDiv}>New Game</button>
                                {/* <button type="button" className="sherebox sherebtn" style={{marginTop:"10px"}}>SHARE</button>
 */}
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}>
                                    <Sharehook />
                                </div>


                            </div>
                        </div>
                    </div>

                    : ' '}</div>

            </div>
            {exitstate ?

                <div className='modalmaindiv2' id='exitmodal'>
                    <div className='modaldiv ' style={{ width: "800px" }} >
                        <div className="modal-content modal-lg" style={{ borderRadius: "10px", backgroundImage: "linear-gradient(#977f72, #c3a26e)" }}>
                            <div className="modal-body " style={{ textAlign: "center" }}>
                                <h3 className='text_color ' style={{ color: "black" }}>Summary</h3>
                                <div>
                                    <div className='row' style={{ color: "black" }}>
                                        <div className='col-md-1'>
                                            <h5> WON </h5>
                                        </div>
                                        <div className='col-md-1'>
                                            <h5> {storesummary[0].CountTotalWin} </h5>
                                        </div>
                                        <div className='col-md-1' >
                                            <h5>Scored</h5>
                                        </div>
                                        <div className='col-md-2' style={{textAlign:"right",marginLeft:"-30px"}}>
                                            <h5> {storesummary[0].totalWin}</h5>
                                        </div>
                                        <div className='col-md-1'>
                                            <h5> Points</h5>
                                        </div>
                                    </div>
                                    <div className='row' style={{ color: "black" }}>
                                        <div className='col-md-1'>
                                            <h5> LOST  </h5>
                                        </div>
                                        <div className='col-md-1'>
                                            <h5>{storesummary[0].CountTotalLoss}</h5>
                                        </div>
                                        <div className='col-md-1' >
                                            <h5>Scored </h5>
                                        </div>
                                        <div className='col-md-2' style={{textAlign:"right",marginLeft:"-30px"}}>
                                            <h5>{storesummary[0].totalLoss}</h5>
                                        </div>
                                        <div className='col-md-1'>
                                            <h5> Points</h5>
                                        </div>
                                    </div>
                                    <div className='row' style={{ color: "black" }}>
                                        <div className='col-md-1'>
                                            <h5>TOTAL  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h5>
                                        </div>
                                        <div className='col-md-1'>

                                        </div>
                                        <div className='col-md-1' >
                                            <h5>Scored </h5>
                                        </div>
                                        <div className='col-md-2' style={{textAlign:"right",marginLeft:"-30px"}}> 
                                            <h5> {storesummary[0].totalPoints}</h5>
                                        </div>
                                        <div className='col-md-1'>
                                            <h5> Points</h5>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div style={{ backgroundColor: "transparent", borderRadius: "10px", padding: "10px", width: "41%", margin: 'auto' }}>

                                    <h4 style={{ marginBottom: "20px" }}>Do you want to exit game</h4>


                                    <button type="button" className="btnbox4 text-center mb-3" onClick={() => { setExitState(false) }}>No</button>

                                    <Link to="/Dashboard" > <button type="button" className="btnbox2 text-center mb-3" onClick={exit}   >Yes</button></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""}

        </>







    )
}
