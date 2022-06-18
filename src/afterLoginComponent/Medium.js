import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Sharehook from './sharehook';
import Sound from "./Sound"
export default function Medium(props) {
    const history = useHistory()
    const [settingshow, setsettingshow] = useState(props.setting)
    const [exitstate, setExitState] = useState(false)
    const mediumword = useRef("")
    const [storesummary, setStoresummary] = useState([{ "CountTotalWin": "0", "CountTotalLoss": "0", "totalPoints": "0", "totalWin": "0", "totalLoss": "0" }])
    const [functioncall, setFunctioncall] = useState("")
    const [leftcolor, setleftcolor] = useState(" #0681e8")
    const [rightcolor, setrightcolor] = useState("#0165bb")
    const [positionflag, setPositionflag] = useState(1)
    const [roundcounter, setRoundCounter] = useState(1);
    const [hintvalue, sethintvalue] = useState("Hints: (0)")
    const [classnm, setclassnm] = useState("easylose")
    const [hintword, sethintword] = useState("")
    const [hintstate, sethintstate] = useState(false)
    const [color, setcolor] = useState("linear-gradient(#977f72, #c3a26e)")
    const [image, setimage] = useState("")
    const [val, setVal] = useState("");
    const [val1, setVal1] = useState("")
    const [defination, setDefination] = useState("")
    const [turn, setTurn] = useState("computer");
    const [startgame, setStartGame] = useState(true)
    const [time, setTime] = useState(59);
    const [showTimer, setShowTimer] = useState(false);
    const [showbutton, setShowButton] = useState(true);
    const [conmsgdown, setconmsgdown] = useState("")
    const [conmsg, setconmsg] = useState("")
    const [word, setWord] = useState("")
    const [gameoverbox, setGameOverBox] = useState(false)
    const [turndata, setturndata] = useState("")


    const [msg, setMsg] = useState("")
    const [newclass, setnewclass] = useState("")
    const [counter, setcounter] = useState(0)
    const dateweek = useRef(getweek())
    const getdate = useRef(new Date().getDate() + 1 + "-" + (new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1) + "-" + new Date().getFullYear())
    function getweek() {
        var date = new Date(window.sessionStorage.getItem("createdAt")).getFullYear() + "-" + (new Date(window.sessionStorage.getItem("createdAt")).getMonth() + 1) + "-" + new Date(window.sessionStorage.getItem("createdAt")).getDate()
        var firstDay = new Date(date);
        var nextWeek = new Date(firstDay.getTime() + 8 * 24 * 60 * 60 * 1000);

        nextWeek.setMinutes(nextWeek.getMinutes() + nextWeek.getTimezoneOffset())


        let dateStr = nextWeek.getDate() + "-" + ((nextWeek.getMonth() + 1) < 10 ? "0" + (nextWeek.getMonth() + 1) : (nextWeek.getMonth() + 1)) + "-" + nextWeek.getFullYear();
        return dateStr;
    }
    useEffect(() => {
        if (window.sessionStorage.getItem("playButtonStatus") === '0') {
            history.push("/Paymentplan")
        }
    })
    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";
    }, [])

    const randomChar = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVW";
        text = possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    const randomint = () => {
        var text = "";
        var possible = "01";
        text = possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    const startGame = async () => {
        let newVal;


        newVal = randomChar()

        window.sessionStorage.setItem("mediumword", newVal.toLowerCase())
        setVal(newVal);
        mediumword.current = newVal.toLowerCase()
        setTurn("user");
        setturndata("")
        setTime(59);
        setShowTimer(true);
        setShowButton(false)
        const url3 = `${process.env.REACT_APP_URL}/api/userHints?user_id=` + window.sessionStorage.getItem("id");

        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        await fetch(url3, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {

                if (response.status === 200 && response.message === "Success") {
                    window.sessionStorage.setItem("hint_id", response.hint_id);
                    sethintvalue(`Hints: (${response.count})`)

                } else {
                    sethintvalue("Hints: (0)")
                }
            })


    }
    // useEffect(()=>{
    //     history.push('/Easy')
    // })

    useEffect(() => {
        if (turndata !== "") {

        } else {
            if (time > 0) {
                const interval = setInterval(() => {
                    setTime(time - 1);
                }, 1000);
                return () => {
                    clearInterval(interval);
                };
            } else if (time === 0) {
                setExitState(false)
                setGameOverBox(true)
                setVal1("")
                const url = `${process.env.REACT_APP_URL}/api/level_two?search=` + val.toLowerCase();

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
                setimage("./lose_reslut.png")
                setcolor("linear-gradient(#977f72, #c3a26e)")
                setMsg("TRY AGAIN")
                setconmsg("Time Out!")
                setconmsgdown("A word that could have been made is")
                setnewclass("card-bg-new")



            }
        }
    }, [time, turn]);

    const handle = (event) => {

        if (turn === "user" && time > 0) {
            var newVal = event.target.name;
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

            if (functioncall === "Left" && positionflag === 0) {

                newVal = newVal.concat(val)
                setVal(newVal.toUpperCase());
            } else if (functioncall === "Right" && positionflag === 1) {

                newVal = val.concat(newVal)
                setVal(newVal.toUpperCase());
            } else {
                newVal = val + newVal
                setVal(newVal.toUpperCase());
            }
            setWord(val)

            setTurn("computer");




            setShowButton(true)

        }
    };


    useEffect(() => {
        startGame()




    }, [startgame]);









    function handles() {
        setStartGame(false)
        startGame()


    }
    function Left() {

        setrightcolor(" #0681e8")
        setleftcolor("#0165bb")
        setFunctioncall("Left")
        setPositionflag(0)


    }
    function Right() {
        setrightcolor("#0165bb")
        setleftcolor(" #0681e8")
        setFunctioncall("Right")
        setPositionflag(1)



    }
    function anyindexvalue(val2, value2) {
        if (value2.indexOf(val2) === 0) {

            val2 = val2 + value2[val2.length]
            return val2
        } else if (value2.length === value2.indexOf(val2) + val2.length) {

            val2 = value2[value2.indexOf(val2) - 1].concat(val2)
            return val2
        } else {
            var randomnumber = parseInt(randomint())


            if (randomnumber === 0) {

                var val1 = value2.slice(0, value2.indexOf(val2))
                val2 = val1[val1.length - 1].concat(val2)
                return val2
            } else {

                val2 = val2 + value2[value2.indexOf(val2) + val2.length]
                return val2
            }
        }
    }
    async function Play() {
        let newVal;

        setrightcolor("#0165bb")
        setleftcolor(" #0681e8")
        setFunctioncall("")
        setPositionflag(1)

        if (val.length < 3) {

            var url = `${process.env.REACT_APP_URL}/api/level_two?search=` + val.toLowerCase();

            var myHeaders = new Headers();
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

                        newVal = anyindexvalue(val.toLowerCase(), word.toLowerCase());

                        mediumword.current = newVal.toLowerCase()
                        window.sessionStorage.setItem("mediumword", newVal.toLowerCase())

                        setVal(newVal.toUpperCase());
                        setTime(59);
                        setturndata("")
                        setShowTimer(true);
                        setTurn("user");
                        setShowButton(false)
                    } else if (response.status === 400 && response.message === "Error") {



                        url = `${process.env.REACT_APP_URL}/api/level_two?search=` + mediumword.current.toLowerCase();
                        fetch(url, {
                            headers: myHeaders
                        }).then((response) => response.json())
                            .then((response) => {

                                if (response.status === 200 && response.message === "Success") {
                                    setVal1(response.data.word.toUpperCase())
                                    setDefination(response.data.definition)
                                }
                            })

                        setclassnm("easylose")
                        setconmsg("There is no word in the NE Games dictionary that could be made from the letters")
                        setconmsgdown("A word that could have been made is")
                        setimage("./lose_reslut.png")
                        setcolor("linear-gradient(#977f72, #c3a26e)")
                        setturndata("deded")
                        setMsg("TRY AGAIN")
                        setnewclass("card-bg-new")

                        setGameOverBox(true)
                    }


                })





        } else {

            let url = `${process.env.REACT_APP_URL}/api/level_two?search=` + val.toLowerCase();

            myHeaders = new Headers();
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

                    if (result.data.word.length === val.length) {
                        if (turn !== "computer") {
                            setconmsgdown("")
                            setDefination(result.data.definition)
                            setGameOverBox(true)
                            setVal1("")
                            setimage("./win_reslut.png")
                            setcolor("linear-gradient(1deg,#33cc66,#33cc66,#33cc66,#33cc66)")
                            setclassnm("easywinnermedium")
                            setconmsg("The computer completed the word")
                            setturndata("deded")
                            setMsg("")
                            setnewclass("card-bg-win-new")
                        } else {
                            setVal("")
                            setconmsg("")
                            setconmsgdown("You completed the word ")
                            setVal1(val)
                            setDefination(result.data.definition)
                            setMsg("TRY AGAIN")
                            setclassnm("easylose")
                            setimage("./lose_reslut.png")
                            setcolor("linear-gradient(#977f72, #c3a26e)")
                            setGameOverBox(true)
                            setturndata("dsdsd")
                            setnewclass("card-bg-new")
                        }
                    }


                } else {
                    await fetch(url, {
                        headers: myHeaders
                    }).then((response) => response.json())
                        .then((response) => {

                            if (response.status === 200 && response.message === "Success") {

                                const word = response.data.word;

                                newVal = anyindexvalue(val.toLowerCase(), word.toLowerCase());
                                mediumword.current = newVal.toLowerCase()

                                setVal(newVal.toUpperCase());
                                setTime(59);
                                setturndata("")
                                setShowTimer(true);
                                setTurn("user");
                                setShowButton(false)
                            } else if (response.status === 400 && response.message === "Error") {


                                url = `${process.env.REACT_APP_URL}/api/level_two?search=` + mediumword.current.toLowerCase()

                                fetch(url, {
                                    headers: myHeaders
                                }).then((response) => response.json())
                                    .then((response) => {

                                        if (response.status === 200 && response.message === "Success") {
                                            setVal1(response.data.word.toUpperCase())
                                            setDefination(response.data.definition)
                                        }
                                    })

                                setclassnm("easylose")
                                setconmsg("There is no word in the NE Games dictionary that could be made from the letters")
                                setconmsgdown("A word that could have been made is")
                                setimage("./lose_reslut.png")
                                setcolor("linear-gradient(#977f72, #c3a26e)")

                                setMsg("TRY AGAIN")
                                setGameOverBox(true)
                                setturndata("dsds")
                                setnewclass("card-bg-new")


                            }


                        })

                }
            })


        }

    }
    useEffect(() => {

        if (turn !== "computer" && val.length > 3) {
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

                    if (result.data.word.length === val.length) {
                        if (turn !== "computer") {
                            setconmsgdown("")
                            setDefination(result.data.definition)
                            setGameOverBox(true)
                            setVal1("")
                            setimage("./win_reslut.png")
                            setcolor("linear-gradient(1deg,#33cc66,#33cc66,#33cc66,#33cc66)")
                            setclassnm("easywinnermedium")
                            setconmsg("The computer completed the word")
                            setMsg("")
                            setturndata("deded")
                            setnewclass("card-bg-win-new")
                        } else {

                            setVal1(val)
                            setconmsg("")
                            setVal("")
                            setconmsgdown("You completed the word ")
                            setDefination(result.data.definition)
                            setMsg("TRY AGAIN")
                            setimage("./lose_reslut.png")
                            setcolor("linear-gradient(#977f72, #c3a26e)")
                            setclassnm("easylose")
                            setGameOverBox(true)
                            setturndata("fdfd")
                            setnewclass("card-bg-new")
                        }
                    }


                } else {
                    // let passvalue = ""
                    // if(val.toLowerCase() ===  window.sessionStorage.getItem("mediumword")){
                    //     passvalue = val.toLowerCase()
                    // }else if(laststore === ""){
                    //     passvalue = val.toLowerCase()
                    // }
                    // else if(laststore !== ""){

                    //     passvalue = window.sessionStorage.getItem("mediumword")
                    // }
                    const url = `${process.env.REACT_APP_URL}/api/level_two?search=` + mediumword.current.toLowerCase();

                    myHeaders = new Headers();
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
                    setimage("./lose_reslut.png")
                    setcolor("linear-gradient(#977f72, #c3a26e)")
                    setclassnm("easylose")
                    setMsg("TRY AGAIN")
                    setconmsg("There is no word in the NE Games dictionary that could be made from the letters")
                    setconmsgdown("A word that could have been made is")
                    setnewclass("card-bg-new")




                }

            })

        }
    }, [turn, val])

    function cancel() {

        var newVal = word
        setVal(newVal);
        setTurn("user");
        setMsg("")
        setFunctioncall("")
        setPositionflag(1)
        setShowTimer(true)
        setShowButton(false)
        setrightcolor("#0165bb")
        setleftcolor(" #0681e8")


    }
    async function gethintvalue() {
        const url3 = `${process.env.REACT_APP_URL}/api/useHints`
        const url4 = `${process.env.REACT_APP_URL}/api/userHints?user_id=` + window.sessionStorage.getItem("id");
        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        var formdata = new FormData();
        formdata.append("user_id", window.sessionStorage.getItem("id"));
        formdata.append("hint_id", window.sessionStorage.getItem("hint_id"))
        formdata.append("match_id", window.sessionStorage.getItem("match_id"))
        formdata.append("round", roundcounter);

        await fetch(url3, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        }).then((response) => response.json())
            .then(async (response) => {

                if (response.status === 200 && response.message === "Success") {


                    await fetch(url4, {
                        headers: myHeaders
                    }).then((response) => response.json())
                        .then((response) => {

                            if (response.status === 200 && response.message === "Success") {
                                window.sessionStorage.setItem("hint_id", response.hint_id);
                                sethintvalue(`Hints Used`)
                            }
                        })
                }
            })

    }
    async function showDiv() {
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


            await fetch(url4, {
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
            
            var today = new Date(),   
             time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();     
            var formdata = new FormData();
            formdata.append('id', window.sessionStorage.getItem("mat_id"));
            formdata.append('round', roundcounter);
            formdata.append('status', "0");
            formdata.append('points', "-91");
            formdata.append('endtime', time);





            const url3 = `${process.env.REACT_APP_URL}/api/match/round`


            await fetch(url3, {
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


            await fetch(url5, {
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
            var today = new Date(),   
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();    
            var formdata1 = new FormData();
            formdata1.append('id', window.sessionStorage.getItem("mat_id"));
            formdata1.append('round', roundcounter);
            formdata1.append('status', "1");
            formdata1.append('points', "+91");
            formdata.append('endtime', time);





            const url3 = `${process.env.REACT_APP_URL}/api/match/round`


            await fetch(url3, {
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

        document.getElementById('welcomeDiv').style.display = "none";
        setturndata("")
        setRoundCounter(roundcounter + 1)
        handles()

        setcounter(0)
        setGameOverBox(false)

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
        setExitState(false)
        setcounter(0)
        setRoundCounter(1)
        window.open("/Dashboard", "_self")
    }


    async function concede() {
        const url = `${process.env.REACT_APP_URL}/api/level_two?search=` + val.toLowerCase();

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
                    setconmsgdown(word.toUpperCase())

                    setDefination(response.data.definition)

                }
            })
        setTime(0)
        setimage("./lose_reslut.png")
        setcolor("linear-gradient(#977f72, #c3a26e)")
        setclassnm("easylose")
        setMsg("TRY AGAIN")
        setconmsg("You conceded")
        setVal1("A word that could have been made is")
        setFunctioncall("")
        setPositionflag(1)
        setrightcolor("#0165bb")
        setleftcolor(" #0681e8")
        setturndata("dsds")
        setnewclass("card-bg-new")
    }

    async function hint() {
        if (hintvalue !== "Hints: (0)") {
            if (counter < 1) {
                const url3 = `${process.env.REACT_APP_URL}/api/userHints?user_id=` + window.sessionStorage.getItem("id");
                const url = `${process.env.REACT_APP_URL}/api/level_two?search=` + val.toLowerCase();

                var myHeaders = new Headers();
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

                            sethintword(word)
                            gethintvalue()
                            setcounter(counter + 1)
                            sethintstate(true)
                            sethintvalue("Hints Used")
                        }
                    })
                await fetch(url3, {
                    headers: myHeaders
                }).then((response) => response.json())
                    .then((response) => {

                        if (response.status === 200 && response.message === "Success") {
                            window.sessionStorage.setItem("hint_id", response.hint_id);

                        }
                    })
            } else {
                sethintvalue("Hints Used")
            }
        }

    }
    async function getsummarydata() {
        
      //code by santosh
      if(msg === "TRY AGAIN"){
        var today = new Date(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var formdata = new FormData();
        formdata.append('id', window.sessionStorage.getItem("mat_id"));
        formdata.append('round', roundcounter);
        formdata.append('status', "0");
        formdata.append('endtime',time);
        formdata.append('points', "-91");





        const url3 = `${process.env.REACT_APP_URL}/api/match/round`

        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
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
    }else{
        var today = new Date(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var formdata = new FormData();
        formdata.append('id', window.sessionStorage.getItem("mat_id"));
        formdata.append('round', roundcounter);
        formdata.append('status', "1");
        formdata.append('endtime',time);
        formdata.append('points', "+91");





        const url3 = `${process.env.REACT_APP_URL}/api/match/round`

        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
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
    }

    
     
       //end  

        const url7 = `${process.env.REACT_APP_URL}/api/getCurrentPoint?match_id=` + window.sessionStorage.getItem("mat_id");
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
                 
                 setExitState(true)  
                }
            })
        //setExitState(true)
    }



    return <>


        <div className='easybg_image'>


            <div className='layer'>

                <div className="flex-container">
                   {/* 
                    <div className="" style={{ zIndex: "34256789" }} >

                        <div className=' mt-1 ml-5' onClick={getsummarydata} >   <img src="./images/back-btn.png" className="extbtn" alt="..."  height={"40px"} width={"40px"}/> </div>
                    </div>
                    */}
                    <div className="" style={{ color: "#000" }}>
                        <h2 className='text-center mb-2'>NE <i>Lite</i></h2>
                        <h4 className='text-center'>Medium Level</h4>
                    </div>
                    {/* 
                    <div className="" style={{ zIndex: "34256789" }}>
                        <div className='mt-1 ml-5' style={{ float: ' right', marginRight: "10px" }} onClick={() => { setsettingshow(true) }}><img src="./Newdesign/dashboard/settings.png" className="extbtn" alt="..." height={"40px"} width={"40px"} /> </div>
                    </div>
                    */}

                </div>

                {settingshow ?
                    <Sound settinghide={setsettingshow} audioRef={props.audio} />
                    : ""}
            </div>




            <div className="container">
                <div className="esaybox" style={{ marginTop: "-10px", height: "450px" }}>
                    <div className="esayprofilebox">

                        <div className="row">
                            <div className="col-md-4">
                                <div className="circal">
                                    <img src={window.sessionStorage.getItem("image")} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "./profilephoto.png";
                                    }} className="circalbox1" alt="..." />
                                </div>

                            </div>
                            <div className="col-md-4">
                            <h6  className='text-center mt-3 play-black' ><i>Play letters at the front or behind</i></h6>
                                <h4 className="text-center mt-3 play-black" >GAME : {roundcounter}</h4>

                                <h2 className="text-center mt-4 play-black" style={{ visibility: showTimer ? "visible" : "hidden" }}>00:00:{time}</h2>

                            </div>
                            <div className="col-md-4">
                                <div className="circal">
                                    <img src="./images/computer.gif" className="circalbox1" alt="..." />
                                </div>
                            </div>
                        </div>  </div>



                    <div className="mainformbox">
                        <div className="formboxs2">
                            <h1 className=" easytextbox1 mt-2" > {val}</h1>
                        </div>
                    </div>




                    {showbutton ?



                        <div className='keyword-blank'>         
                        <div className="playbuttonbox  ">
                            {/* <div className="row"> */}
                            {/* <div className="col-md-6"> */}
                            <div className='btnbox4 text-center mb-3' role="button" onClick={Play}>Play</div>
                            <br />
                            <div className='btnbox2 text-center mb-3' role="button" onClick={cancel}>Cancel</div>
                            {/* </div> */}
                            {/* <div className="col-md-6"> */}
                            {/* </div> */}
                            {/* </div> */}

                        </div>
                        </div>


                        :


                        <div className="keybordbox keyborbottom ">
                            <div id="keyword">
                                <div className='hintbtbmain1' >
                                    <button className='hintbtbleft mediumlevel' onClick={Left} style={{ backgroundColor: leftcolor }}><i className="fas fa-chevron-left"></i> </button>
                                    <button className='hintbtbright mediumlevel' onClick={Right} style={{ backgroundColor: rightcolor }}><i className="fas fa-chevron-right"></i> </button>
                                </div>

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
                                </div>
                                <div className='hintbtbmain' >
                                    <button className='btnbox4 text-center mb-3' onClick={hint} >{hintvalue}</button>
                                    <button className='btnbox2 text-center mb-3 ' onClick={concede} >Concede</button>
                                </div>
                            </div>

                        </div>



                    }



                </div>
            </div>


            <div>{gameoverbox ?



                <div className='modalmaindiv2' id='welcomeDiv'>
                    <div className='modaldiv'>
                        <div className={newclass}>
                            <div className="closebuttonmain mt-4">
                                <div className='text-center'  >

                                    <img src={image} className="loseimg" alt="..." />

                                </div>
                            </div>
                    
                            <h2 className='text-center color-white'></h2>

                            <div className={classnm}>
                                <div className='mainimg play-white'>
                                
                                </div>
                            </div>

                            <p className='text-center color-white'>{conmsg}</p>
                            <h2 className='text-center  color-red'>{val}</h2>
                            <p className='text-center color-white'>{conmsgdown}</p>



                            <h2 className='text-center  color-white white-color-lose'>{val1}</h2>
                            <p className='text-center  mb-2 color-white' ><i>{defination}</i></p>
                            <button type="button" className="mainroundbtn roundbtn" onClick={showDiv}>New Game</button>
                            {/* <button type="button" className="sherebox sherebtn" style={{marginTop:"10px"}}>SHARE</button> */}
                            <div className='home-dashboard-auto' style={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}>
                                <Sharehook />
                                <button type="button" onClick={getsummarydata} className="sherebox home-dashboard-btn" >  <span class="share-right-dashboard"><i class="fas fa-home"></i></span><span className="dashboard-home">Dashboard</span></button>

                               </div>

                        </div>
                    </div>
                </div>

                : ' '}</div>



            {hintstate ?
                <div className='modalmaindiv2' id='welcomeDiv1'>
                    <div className='modaldiv'>
                        <div className=" cardbox " style={{ backgroundImage: "linear-gradient(#0170cd, #0170cd)" }} >

                            <p className='text-center color-white'><h2>Your Hint</h2></p>
                            <br />

                            <p className='text-center color-white'><h3>{hintword.toUpperCase()}</h3></p>

                            <div style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <div style={{ borderRadius: "10px", padding: "10px", width: "41%", margin: 'auto', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                    <button className='btnbox4 text-center mb-1' type="text" onClick={() => { sethintstate(false) }}>OK</button>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
                : ""}


        </div>






        {exitstate ?

            <div className='modalmaindiv2' id='exitmodal'>
                <div className='modaldiv ' style={{ width: "800px" }} >
                    <div className="modal-content modal-lg" style={{ borderRadius: "10px", backgroundImage: "linear-gradient(#977f72, #c3a26e)" }}>
                        <div className="modal-body " style={{ textAlign: "center" }}>
                            <h3 className='text_color ' style={{ color: "#fff" }}>Summary</h3>
                            <div>
                                    <div className='row' style={{ color: "#fff" }}>
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
                                    <div className='row' style={{ color: "#fff" }}>
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
                                    <div className='row' style={{ color: "#fff" }}>
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

                            <div style={{ backgroundColor: "transparent", borderRadius: "10px", padding: "10px", width: "41%", margin: 'auto' }}>

                                <h4 class="color-white" style={{ marginBottom: "20px" }}>Do you want to exit game</h4>

                                <button type="button" className="btnbox4 text-center mb-3" onClick={() => { setExitState(false) }}>No</button>

                                <Link to="/Dashboard" > <button type="button" className="btnbox2 text-center mb-3" onClick={exit}   >Yes</button></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ""}












    </>;

}
