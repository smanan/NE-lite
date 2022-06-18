
import React from "react";
import html2canvas from "html2canvas";
export default function Sharehook() {
  async function screenshot() {
    const screenshotTarget = document.body;

    html2canvas(screenshotTarget).then(async (canvas) => {
      const base64image = canvas.toDataURL();

      const response = await fetch(base64image);
      const blob = await response.blob();
      const filesArray = [
        new File([blob], "meme.jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime()
        })
      ];
      const shareData = {
        files: filesArray
      };
      navigator.share(shareData);
    });
  }
  return (
    <>
      <div >
        <button type="button" className="sherebox sherebtn" onClick={screenshot}> <span className="marshar">Share</span> <span class="share-right"><i class="fas fa-share-square"></i></span></button>
        
      </div>
    </>
  );
}
