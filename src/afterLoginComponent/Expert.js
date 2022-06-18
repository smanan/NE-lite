import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom'
import Sharehook from './sharehook';
import Sound from "./Sound"
export default function Expert(props) {
    const history = useHistory()
    const [settingshow, setsettingshow] = useState(props.setting)
    const [exitstate, setExitState] = useState(false)
    const [storesummary, setStoresummary] = useState([{ "CountTotalWin": "0", "CountTotalLoss": "0", "totalPoints": "0", "totalWin": "0", "totalLoss": "0" }])
    const [functioncall, setFunctioncall] = useState("")
    const [anyleftcolor, setAnyLeftColor] = useState(" #0681e8")
    const [anyrightcolor, setAnyRightColor] = useState(" #0165bb")
    const [leftcolor, setleftcolor] = useState(" #0681e8")
    const [rightcolor, setrightcolor] = useState("#0165bb")
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
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [countset, setcountset] = useState(2);
    const [showTimer, setShowTimer] = useState(false);
    const [showbutton, setShowButton] = useState(true);
    const [conmsgdown, setconmsgdown] = useState("")
    const [conmsg, setconmsg] = useState("")
    const [word, setWord] = useState("")
    const [gameoverbox, setGameOverBox] = useState(false)
    const [positionflag, setPositionflag] = useState(1)
    const [msg, setMsg] = useState("")
    const [counter, setcounter] = useState(0)
    const [laststore, setlaststore] = useState("")
    const [counter1, setcounter1] = useState(val.length - 1);
    const [turndata, setturndata] = useState("")
    const [newclass, setnewclass] = useState("")
    const randomChar = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVW";
        text = possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    useEffect(() => {
        if (window.sessionStorage.getItem("playButtonStatus") !== "2") {
            history.push("/Paymentplan")
        }
    })

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";
    }, [])
    const startGame = async () => {
        let newVal;


        newVal = randomChar();
        setturndata("")
        setlaststore(newVal.toLowerCase())
        setVal(newVal);
        setTurn("user");
        setPositionflag(1)
        setMinutes(1)
        setSeconds(30)
        setcountset(2)
        setAnyLeftColor(" #0681e8")
        setAnyRightColor(" #0681e8")
        setleftcolor(" #0681e8")
        setrightcolor("#0165bb")
        setShowTimer(true);
        setPositionflag(1)
        setcounter1(newVal.length - 1)
        setFunctioncall("")
        setlaststore("")
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

            if (countset > 0) {
                if (countset > 1) {
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
                setExitState(false)
                setVal1("")
                setGameOverBox(true)
                let passvalue = ""
                if (val.toLowerCase() === laststore.toLowerCase()) {
                    passvalue = val.toLowerCase()
                } else if (laststore === "") {
                    passvalue = val.toLowerCase()
                }
                else if (laststore !== "") {

                    passvalue = laststore.toLowerCase()
                }
                const url = `${process.env.REACT_APP_URL}/api/level_three?search=` + passvalue.toLowerCase();

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
                setFunctioncall("")
                setAnyLeftColor(" #e5991a")
                setAnyRightColor(" #e5991a")
                setleftcolor(" #137cd4")
                setrightcolor("#0165bb")
                setnewclass("card-bg-new")
            }






        }
    }, [minutes, seconds, countset, turn]);
    function getrandomInput(inputStr, randomStr) {

        let randomStrmap = new Map();
        let inputStrmap = new Map();
        let lastIndex = 0;
        for (let i = 0; i < inputStr.length; i++) {
            for (let j = lastIndex; j < randomStr.length; j++) {
                if (inputStr.charAt(i) === randomStr.charAt(j)) {
                    inputStrmap.set(j, String(randomStr.charAt(j)));
                    lastIndex = j + 1;
                    break;
                } else {
                    randomStrmap.set(j, String(randomStr.charAt(j)));
                }
            }
        }
        for (let i = lastIndex; i < randomStr.length; i++) {
            randomStrmap.set(i, String(randomStr.charAt(i)));
        }
        let crunchifyKeys = [];
        crunchifyKeys = Array.from(randomStrmap.keys());

        let key = crunchifyKeys[Math.floor(Math.random() * crunchifyKeys.length)];

        inputStrmap.set(key, randomStrmap.get(key));
        var str4 = ""
        var arr1 = Array.from(inputStrmap.keys()).sort(function (a, b) { return a - b })
        for (let i = 0; i < arr1.length; i++) {
            str4 += inputStrmap.get(arr1[i])
        }


        return str4
    }
    const handle = (event) => {


        var value = document.querySelectorAll(".getdata")
        if (turn === "user" && countset > 0) {
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
            } else if (functioncall === "AnyLeft") {
                let givenString1 = val;

                let stringToInsert = newVal;
                let arrGivenString = [...givenString1];
                if (counter1 === 0) {
                    let insertAtPosition = counter1;
                    arrGivenString.splice(insertAtPosition + 1, 0, stringToInsert);
                    let givenString = arrGivenString.join("");

                    setVal(givenString.toUpperCase());

                    setcounter1(givenString.length - 1);
                    value[counter1].classList.remove("color");
                } else if (counter1 > 0 && counter1 < val.length - 1) {
                    let insertAtPosition = counter1;
                    arrGivenString.splice(insertAtPosition + 1, 0, stringToInsert);
                    let givenString = arrGivenString.join("");

                    setVal(givenString.toUpperCase());

                    setcounter1(givenString.length - 1);
                    value[counter1].classList.remove("color");

                } else if (counter1 === val.length - 1) {
                    let insertAtPosition = counter1;
                    arrGivenString.splice(insertAtPosition + 1, 0, stringToInsert);
                    let givenString = arrGivenString.join("");

                    setVal(givenString.toUpperCase());

                    setcounter1(givenString.length - 1);

                    value[counter1].classList.remove("color");
                }

            } else if (functioncall === "AnyRight") {
                let givenString1 = val;

                let stringToInsert = newVal;
                let arrGivenString = [...givenString1];

                if (counter1 === 0) {
                    let insertAtPosition = counter1;
                    arrGivenString.splice(insertAtPosition + 1, 0, stringToInsert);
                    let givenString = arrGivenString.join("");
                    value[counter1].classList.remove("color");

                    setVal(givenString.toUpperCase());
                    setcounter1(givenString.length - 1);
                } else if (counter1 < val.length - 1) {
                    let insertAtPosition = counter1;
                    arrGivenString.splice(insertAtPosition + 1, 0, stringToInsert);
                    let givenString = arrGivenString.join("");

                    setVal(givenString.toUpperCase());
                    setcounter1(givenString.length - 1);
                    value[counter1].classList.remove("color");
                } else {
                    let insertAtPosition = counter1;
                    arrGivenString.splice(insertAtPosition + 1, 0, stringToInsert);
                    let givenString = arrGivenString.join("");

                    setcounter1(givenString.length - 1);
                    setVal(givenString.toUpperCase());
                    value[counter1].classList.remove("color");
                }
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
        setAnyLeftColor(" #0681e8")
        setAnyRightColor(" #0165bb")
        setleftcolor(" #0681e8")
        setrightcolor("#0165bb")
        setStartGame(false)
        startGame()

    }
    async function Play() {
        let newVal;
        setFunctioncall("")
        setPositionflag(1)



        if (val.length < 3) {

            var url = `${process.env.REACT_APP_URL}/api/level_three?search=` + val.toLowerCase();

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

                        newVal = getrandomInput(val.toLowerCase(), word.toLowerCase())
                        setlaststore(newVal.toLowerCase())

                        setcounter1(newVal.length - 1)
                        setVal(newVal.toUpperCase());

                        setMinutes(1)
                        setSeconds(30)
                        setcountset(2)
                        setShowTimer(true);
                        setTurn("user");
                        setShowButton(false)
                        setAnyLeftColor(" #0681e8")
                        setAnyRightColor(" #0681e8")
                        setleftcolor(" #0681e8")
                        setrightcolor("#0165bb")
                    } else if (response.status === 400 && response.message === "Error") {
                        let passvalue = ""
                        if (val.toLowerCase() === laststore.toLowerCase()) {
                            passvalue = val.toLowerCase()
                        } else if (laststore === "") {
                            passvalue = val.toLowerCase()
                        }
                        else if (laststore !== "") {

                            passvalue = laststore.toLowerCase()
                        }

                        url = `${process.env.REACT_APP_URL}/api/level_three?search=` + passvalue;
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
                        setAnyLeftColor(" #0681e8")
                        setAnyRightColor(" #0681e8")
                        setleftcolor(" #0681e8")
                        setrightcolor("#0165bb")
                        setturndata("deded")
                        setMsg("TRY AGAIN")
                        setnewclass("card-bg-new")
                        setGameOverBox(true)
                    }


                })





        } else {
            let url = `${process.env.REACT_APP_URL}/api/level_three?search=` + val.toLowerCase();

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
                            setclassnm("easywinnerexpert")
                            setconmsg("The computer completed the word")
                            setturndata("deded2")
                            setMsg("YOU WIN")
                            setAnyLeftColor(" #0681e8")
                            setAnyRightColor(" #0681e8")
                            setleftcolor(" #0681e8")
                            setrightcolor("#0165bb")
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
                            setAnyLeftColor(" #0681e8")
                            setAnyRightColor(" #0681e8")
                            setleftcolor(" #0681e8")
                            setrightcolor("#0165bb")
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

                                newVal = getrandomInput(val.toLowerCase(), word.toLowerCase())

                                setcounter1(newVal.length - 1)
                                setlaststore(newVal.toLowerCase())
                                setVal(newVal.toUpperCase());
                                setMinutes(1)
                                setSeconds(30)
                                setcountset(2)

                                setShowTimer(true);
                                setTurn("user");
                                setShowButton(false)
                                setAnyLeftColor(" #0681e8")
                                setAnyRightColor(" #0681e8")
                                setleftcolor(" #0681e8")
                                setrightcolor("#0165bb")
                            } else if (response.status === 400 && response.message === "Error") {
                                let passvalue = ""
                                if (val.toLowerCase() === laststore.toLowerCase()) {
                                    passvalue = val.toLowerCase()
                                } else if (laststore === "") {
                                    passvalue = val.toLowerCase()
                                }
                                else if (laststore !== "") {

                                    passvalue = laststore.toLowerCase()
                                }

                                url = `${process.env.REACT_APP_URL}/api/level_three?search=` + passvalue;
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
                                setturndata("dsds2")
                                setAnyLeftColor(" #0681e8")
                                setAnyRightColor(" #0681e8")
                                setleftcolor(" #0681e8")
                                setrightcolor("#0165bb")
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
                            setclassnm("easywinnerexpert")
                            setconmsg("The computer completed the word")
                            setMsg("YOU WIN")
                            setturndata("deded3")
                            setAnyLeftColor(" #0681e8")
                            setAnyRightColor(" #0165bb")
                            setleftcolor(" #0681e8")
                            setrightcolor("#0165bb")
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
                            setAnyLeftColor(" #0681e8")
                            setAnyRightColor(" #0165bb")
                            setleftcolor(" #0681e8")
                            setrightcolor("#0165bb")
                            setnewclass("card-bg-new")
                        }
                    }


                } else {
                    const url = `${process.env.REACT_APP_URL}/api/level_three?search=` + val.toLowerCase();

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

                    setAnyLeftColor(" #0681e8")
                    setAnyRightColor(" #0165bb")
                    setleftcolor(" #0681e8")
                    setrightcolor("#0165bb")
                    setnewclass("card-bg-new")



                }

            })

        }
    }, [turn, val])

    function cancel() {
        var value = document.querySelectorAll(".getdata")
        if (counter1 === 0) {

            value[counter1].classList.remove("color");



        } else if (counter1 < val.length - 1) {



            value[counter1].classList.remove("color");
        } else {



            value[counter1].classList.remove("color");
        }
        var newVal = word

        setcounter1(val.length - 2)
        setVal(newVal);
        setTurn("user");
        setMsg("")

        setShowTimer(true)
        setShowButton(false)
        setPositionflag(1)

        setFunctioncall("")
        setAnyLeftColor(" #0165bb")
        setAnyRightColor(" #0165bb")
        setleftcolor(" #0681e8")
        setrightcolor("#0165bb")

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
                                sethintvalue("Hints Used")
                            }
                        })
                }
            })


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
            var today = new Date(),   
             time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            var formdata = new FormData();
            formdata.append('id', window.sessionStorage.getItem("mat_id"));
            formdata.append('round', roundcounter);
            formdata.append('status', "0");
            formdata.append('points', "-91");
            formdata.append('endtime',time);
       




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
                var today = new Date(),   
                time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        
            var formdata1 = new FormData();
            formdata1.append('id', window.sessionStorage.getItem("mat_id"));
            formdata1.append('round', roundcounter);
            formdata1.append('status', "1");
            formdata1.append('points', "+91");
            formdata1.append('endtime', time);
            



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
        setMinutes(1)
        setSeconds(30)
        setcountset(2)
        document.getElementById('welcomeDiv').style.display = "none";
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
        setMinutes(1)
        setSeconds(30)
        setcountset(2)
        setcounter(0)
        setRoundCounter(1)
        setExitState(false)
        window.open("/Dashboard", "_self")
    }


    async function concede() {
        const url = `${process.env.REACT_APP_URL}/api/level_three?search=` + val.toLowerCase();

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
        var value = document.querySelectorAll(".getdata")
        if (counter1 === 0) {

            value[counter1].classList.remove("color");



        } else if (counter1 < val.length - 1) {



            value[counter1].classList.remove("color");
        } else {



            value[counter1].classList.remove("color");
        }
        setGameOverBox(true)
        setimage("./lose_reslut.png")
        setcolor("linear-gradient(#977f72, #c3a26e)")
        setclassnm("easylose")
        setMsg("TRY AGAIN")
        setconmsg("You conceded")
        setconmsgdown("A word that could have been made is")
        setFunctioncall("")
        setPositionflag(1)
        setAnyLeftColor(" #e5991a")
        setAnyRightColor(" #e5991a")
        setleftcolor(" #0681e8")
        setrightcolor("#0165bb")
        setturndata("dsds")
        setnewclass("card-bg-new")




    }

    async function hint() {
        if (hintvalue !== "Hints: (0)") {
            if (counter < 1) {
                const url3 = `${process.env.REACT_APP_URL}/api/userHints?user_id=` + window.sessionStorage.getItem("id");
                const url = `${process.env.REACT_APP_URL}/api/level_three?search=` + val.toLowerCase();

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
                            gethintvalue()
                            sethintword(word)
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
            var value = document.querySelectorAll(".getdata")
            if (counter1 === 0) {

                value[counter1].classList.remove("color");



            } else if (counter1 < val.length - 1) {



                value[counter1].classList.remove("color");
            } else {



                value[counter1].classList.remove("color");
            }
            setAnyLeftColor(" #0681e8")
            setAnyRightColor(" #0165bb")
            setleftcolor(" #0681e8")
            setrightcolor("#0165bb")
            setFunctioncall("Right")
            setPositionflag(1)
        }

    }
    function Left() {
        setcounter1(val.length - 1)
        var value = document.querySelectorAll(".getdata")
        if (counter1 === 0) {

            value[counter1].classList.remove("color");



        } else if (counter1 < val.length - 1) {



            value[counter1].classList.remove("color");
        } else {



            value[counter1].classList.remove("color");
        }
        setAnyLeftColor(" #0681e8")
        setAnyRightColor(" #0681e8")
        setleftcolor("#0165bb")
        setrightcolor(" #0681e8")
        setFunctioncall("Left")
        setPositionflag(0)


    }
    function Right() {
        setcounter1(val.length - 1)
        var value = document.querySelectorAll(".getdata")
        if (counter1 === 0) {

            value[counter1].classList.remove("color");



        } else if (counter1 < val.length - 1) {



            value[counter1].classList.remove("color");
        } else {



            value[counter1].classList.remove("color");
        }
        setAnyLeftColor(" #0681e8")
        setAnyRightColor(" #0681e8")
        setleftcolor(" #0681e8")
        setrightcolor("#0165bb")
        setFunctioncall("Right")
        setPositionflag(1)



    }
    function AnyLeft() {
        setFunctioncall("AnyLeft")


        var value = document.querySelectorAll(".getdata");
        if (counter1 === 0) {
            setcounter1(counter1);
            value[counter1].classList.add("color");
        } else if (counter1 > 0 && counter1 < val.length - 1) {
            value[counter1 - 1].classList.add("color");
            value[counter1].classList.remove("color");
            setcounter1(counter1 - 1);
        } else if (counter1 === val.length - 1) {
            setcounter1(counter1 - 1);
            value[counter1 - 1].classList.add("color");
            value[counter1].classList.remove("color");
        }
        setAnyLeftColor("#0165bb")
        setAnyRightColor(" #0681e8")
        setleftcolor(" #0681e8")
        setrightcolor(" #0681e8")

    }
    function AnyRight() {

        setFunctioncall("AnyRight");

        var value = document.querySelectorAll(".getdata");

        if (val.length === 1) {

            value[counter1].classList.add("color");

        } else {
            if (counter1 === 0) {
                setcounter1(counter1 + 1);
                value[counter1 + 1].classList.add("color");
                value[counter1].classList.remove("color");
            } else if (counter1 < val.length - 1) {
                setcounter1(counter1 + 1);
                value[counter1 + 1].classList.add("color");
                value[counter1].classList.remove("color");
            } else {
                setcounter1(counter1);
                value[counter1].classList.add("color");
            }
        }
        setAnyLeftColor(" #0681e8")
        setAnyRightColor("#0165bb")
        setleftcolor(" #0681e8")
        setrightcolor(" #0681e8")
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
        
    }




    return (
        <>
            {hintstate ?
                <div className='modalmaindiv2' id='welcomeDiv1'>
                    <div className='modaldiv'>
                        <div className="cardbox bg-color-code-blue">

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


            <div className='easybg_image'>


                <div className='layer'>

                    <div className="flex-container">
                          {/*      
                        <div className="" style={{ zIndex: "34256789" }} >
                            <div className=' mt-1 ml-5' onClick={getsummarydata} >   <img src="./images/back-btn.png" className="extbtn" alt="..."  height={"40px"} width={"40px"}/></div>
                        </div>
                        */}
                        <div className="" style={{ color: "black" }}>
                            <h2 className='text-center mb-2'>NE <i>Lite</i></h2>
                            <h4 className='text-center'>Expert Level</h4>
                        </div>
                        {/* <div className="mt-1 ml-5" style={{ zIndex: "34256789" }} >
                            <div className='' style={{ float: ' right', marginRight: "10px" }} onClick={() => { setsettingshow(true) }} ><img src="./Newdesign/dashboard/settings.png" className="extbtn" alt="..." height={"40px"} width={"40px"} /> </div>
                        </div> */}


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
                                <h6 className='text-center mt-3' style={{ color: "black" }} ><i>Play letters anywhere and keep them in same order</i></h6>
                                    <h4 className="text-center mt-3 color-game">GAME : {roundcounter}</h4>

                                    <h2 className="text-center mt-4 color-game" style={{ visibility: showTimer ? "visible" : "hidden" }}>00:0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>

                                </div>
                                <div className="col-md-3">
                                    <div className="circal">
                                        <img src="./images/computer.gif" className="circalbox1" alt="..." />
                                    </div>
                                </div>
                            </div>  </div>



                        <div className="mainformbox">
                            <div className="formboxs2">
                                <h1 className=" easytextbox2 mt-2 " >  {Array.from(val).map((number, keys) => (
                                    <span className="getdata" key={keys}>{number}</span>
                                ))} </h1>
                            </div>
                        </div>




                        {showbutton ?

                            <div className='keyword-blank'> 
                            <div className="playbuttonbox ">
                                <div className="btnbox4 text-center mb-3" role="button" onClick={Play}>Play</div>
                                <br />
                                <div className="btnbox2 text-center mb-3" role="button" onClick={cancel}>Cancel</div>

                            </div>
                            </div>

                            // <div className="playbuttonbox  ">
                            // <div className="row">
                            //     <div className="col-md-6">
                            //     <div className='buttonbox3' onClick={cancel}>Cancel</div>
                            //     </div>
                            //     <div className="col-md-6">
                            // <div className='buttonbox2' onClick={Play}>Play</div>
                            //     </div>
                            // </div>

                            // </div> 




                            :


                            <div className="keybordbox mr-5 ml-5">



                                {/* <button type='text'  >Left</button>
                                <button type='text' onClick={AnyLeft} >left-</button>
                                <button type='text' onClick={AnyRight}>-right</button>
                           <button type='text' onClick={Right}>Right</button> */}
                                <br />
                                <div id="keyword">
                                    <div className='hintbtbmain1' >
                                        <button className='hintbtbcolor mediumlevel' onClick={Left} style={{ backgroundColor: leftcolor }} ><i className="fas fa-chevron-left"></i> </button>
                                        <button className='hintbtbcolor mediumlevel' onClick={AnyLeft} style={{ backgroundColor: anyleftcolor }} ><i className="fas fa-angle-double-left"></i></button>
                                        <button className='hintbtbcolor   mediumlevel ' onClick={AnyRight} style={{ backgroundColor: anyrightcolor }}><i className="fas fa-angle-double-right"></i></button>
                                        <button className='hintbtbcolor mediumlevel ' onClick={Right} style={{ backgroundColor: rightcolor }}><i className="fas fa-chevron-right"></i></button>
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
                                    <div className='text-center' >

                                        <img src={image} className="loseimg" alt="..." />

                                    </div>
                                </div>
                              
                                <h2 className='text-center color-white'></h2>

                                <div className={classnm}>
                                    <div className='mainimg play-white'>
                                   
                                    </div>
                                </div>

                                <p className='text-center color-white'>{conmsg}</p>
                                <h2 className='text-center   color-red'>{val}</h2>

                                <p className='text-center color-white'>{conmsgdown}</p>

                                <h2 className='text-center color-white white-color-lose'>{val1}</h2>
                                <p className='text-center mb-2 color-white' ><i>{defination}</i></p>
                                <button type="button" className="mainroundbtn roundbtn" onClick={showDiv}>New Game</button>
                                {/* <img onClick={showDiv} src=' ./images/Group 34.png'/> */}

                                {/* <button type="button" className="sherebox sherebtn" style={{marginTop:"10px"}}>SHARE</button> */}
                                <div className='home-dashboard-auto' style={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}>
                                    <Sharehook />
                                     <button type="button" onClick={getsummarydata} className="sherebox home-dashboard-btn" >  <span class="share-right-dashboard"><i class="fas fa-home"></i></span><span className="dashboard-home">Dashboard</span></button>

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




        </>







    )
}
