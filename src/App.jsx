import { useRef } from "react";
import { useState } from "react";
import html2canvas from "html2canvas";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";

import "./App.css";
const options = {
  // default is `save`
  method: "save",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "portrait",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const getTargetElement = () => document.getElementById("divToPrint");

  const rufComp = useRef();
  const handlePrint = useReactToPrint({
    content: () => rufComp.current,
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "20%",
          margin: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>Name:</label>
          <input
            style={{ marginLeft: "10px", width: "100%" }}
            type="text"
            name="name"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>Name:</label>
          <input
            style={{ marginLeft: "10px", width: "100%" }}
            type="text"
            name="name"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
        <button
          onClick={() => handlePrint()}
          // generatePDF(getTargetElement, options)}
        >
          Generate PDF
        </button>
      </div>
      <div
        style={{
          // height: "100%",
          // width: "80%",
          overflow: "hide",
          boxSizing: "border-box",
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <A4PAper text1={text1} text2={text2} /> */}
        <div style={{ transform: "scale(0.5)" }}>
          <div
            id="divToPrint"
            ref={rufComp}
            style={{
              width: "21cm",
              minHeight: "29.7cm",
              margin: "auto",
              padding: "auto",
              background: "white",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
          >
            {Array(9)
              .fill()
              .map((_, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <LeftSideStker text1={text1} text2={text2} />
                  <RightSideStiker text1={text1} text2={text2} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// function App() {
//   const [text1, setText1] = useState("");
//   const [text2, setText2] = useState("");

//   const printDocument = () => {
//     const input = document.getElementById("divToPrint");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       pdf.addImage(imgData, "JPEG", 0, 0);
//       // pdf.output('dataurlnewwindow');
//       pdf.save("download.pdf");
//     });
//   };
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         height: "100%",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//           minWidth: "20%",
//           margin: "20px",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <label>Name:</label>
//           <input
//             style={{ marginLeft: "10px", width: "100%" }}
//             type="text"
//             name="name"
//             value={text1}
//             onChange={(e) => setText1(e.target.value)}
//           />
//         </div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <label>Name:</label>
//           <input
//             style={{ marginLeft: "10px", width: "100%" }}
//             type="text"
//             name="name"
//             value={text2}
//             onChange={(e) => setText2(e.target.value)}
//           />
//         </div>
//         <button onClick={printDocument}>Download</button>
//       </div>
//       <div
//         style={{
//           // height: "100%",
//           // width: "80%",
//           overflow: "auto",
//           boxSizing: "border-box",
//           paddingTop: "20px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {/* <A4PAper text1={text1} text2={text2} /> */}
//         {/* <div style={{ transform: "scale(0.5)" }}> */}
//         <div
//           id="divToPrint"
//           style={{
//             width: "21cm",
//             minHeight: "29.7cm",
//             padding: "2cm",
//             background: "white",
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "black",
//           }}
//         >
//           {Array(9)
//             .fill()
//             .map((_, index) => (
//               <div key={index} style={{ display: "flex" }}>
//                 <LeftSideStker text1={text1} text2={text2} />
//                 <RightSideStiker text1={text1} text2={text2} />
//               </div>
//             ))}
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }

export default App;

function RightSideStiker({ text1, text2 }) {
  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      <div
        style={{
          width: "100px",
          borderLeft: "1px solid black",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          height: "50px",
          borderRadius: "20px 0 0 20px",
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "200px",
            borderTop: "1px solid black",
            borderRight: "1px solid black",
            borderLeft: "1px solid black",
            height: "50px",
            borderRadius: "20px 20px 0px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {text1}
        </div>
        <div
          style={{
            width: "200px",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
            height: "50px",
            borderRadius: "0 0 20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {text2}
        </div>
      </div>
    </div>
  );
}

function LeftSideStker({ text1, text2 }) {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <div
          style={{
            width: "200px",
            borderTop: "1px solid black",
            borderLeft: "1px solid black",
            height: "50px",
            borderRadius: "20px 0 0px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {text1}
        </div>
        <div
          style={{
            width: "200px",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            height: "50px",
            borderRadius: "0 0 20px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {text2}
        </div>
      </div>
      <div
        style={{
          width: "100px",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          height: "50px",
          borderRadius: "0 20px 20px 0",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// https://medium.com/nerd-for-tech/react-to-pdf-printing-f469cc99b24a
