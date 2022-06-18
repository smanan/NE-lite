import React, { useState, useEffect, useRef } from "react";
import ItemsCarousel from "react-items-carousel";

export default function Carousel() {
  const myRefname = useRef(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [timeLeft, setTimeLeft] = useState(1);
  const [data, setData] = useState([])
  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      myRefname.current.click();
      setTimeLeft(timeLeft + 1);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  useEffect(() => {
    console.log(window.screen.width)
    const appbanner = `${process.env.REACT_APP_URL}/api/getHomepageBanner`;
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    fetch(appbanner, {
      headers: myHeaders
    }).then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          var value = response.data.length > 0 && response.data.map((val, key) =>
            <div className="image-wrapper" key={key}>
              <a href={val.url} target="_blank" rel="noreferrer"> <img
                className="inner-img"
                src={response.image_path + "/" + val.image}
                alt=""
              /></a>
            </div>
          )
          setData(value)
        }
      })


  }, [])
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        infiniteLoop={true}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={window.screen.width <= "420" ? 1 : window.screen.width > "420" && window.screen.width < "725" ? 2 : window.screen.width > "420" && window.screen.width < "1025" ? 3 : 4}
        gutter={10}
        leftChevron={<span class="arrow left"></span>}
        rightChevron={<span ref={myRefname} class="arrow right"></span>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {data}
      </ItemsCarousel>
    </div>
  );
}
