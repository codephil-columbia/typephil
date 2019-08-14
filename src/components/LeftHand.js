import React from 'react';

const LeftHand = ({img}) => {
  if (!img) {
    return ( 
     <svg width="182px" height="259px" viewBox="0 0 182 259" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>Fill 1</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <div></div>
        <g id="Hands" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-53.000000, -18.000000)">
          <g transform="translate(0.000000, 1.000000)" fill="#FFFFFF" id="Left-hand" stroke="#979797" strokeWidth="2">
              <g>
                  <g transform="translate(127.836158, 145.168660) scale(-1, 1) rotate(340.000000) translate(-127.836158, -145.168660) translate(35.836158, 24.168660)" id="Fill-1">
                      <path d="M71.7539953,241.153878 L63.3170777,241.153878 C57.7414805,240.758975 52.1068248,240.734369 46.6059545,239.866542 C40.7579654,238.9447 34.9178105,237.582344 29.2970155,235.738062 C24.7880857,234.258075 23.1284235,230.834179 23.5647326,226.119946 C24.2710232,218.486549 25.1358072,210.867556 25.8137738,203.231159 C26.3344521,197.357422 25.924659,191.812572 23.144092,186.191502 C16.9851422,173.740045 11.5945545,160.91229 5.86106638,148.251378 C3.56803271,143.187253 2.69481174,137.841655 2.54957623,132.348418 C2.22294699,119.997788 2.04275854,107.641756 1.58113862,95.2965266 C1.23823818,86.1357304 0.534960838,76.9881377 0.0154877701,67.8333431 C-0.159879588,64.740134 1.15145846,62.4949467 3.93985972,61.0371654 C6.86445693,59.5085656 9.91621054,59.1436701 12.280958,61.5502996 C15.466497,64.7935479 18.7822056,68.154427 20.9920754,72.0548473 C26.580328,81.9214281 28.7389737,92.7992734 28.9878627,104.086426 C29.0692187,107.77439 29.1294824,111.498965 29.7236825,115.120912 C29.9876375,116.731133 31.2604067,118.74526 32.6362269,119.39343 C33.4576211,119.780531 35.8868508,118.201518 36.6949869,116.936987 C39.581618,112.420806 42.7460647,107.904624 44.586518,102.940126 C47.881737,94.0542016 50.7297993,84.9498202 52.9842642,75.7464129 C58.1916503,54.4858518 63.0832546,33.1514714 71.1688348,12.7251285 C72.4060485,9.60011109 73.7294393,6.45708897 75.4632258,3.5925397 C77.3265793,0.51313422 80.5428528,-0.126633123 83.922441,0.501731237 C87.0055317,1.07488115 89.5691494,2.80213295 89.8355149,6.00697123 C90.1940839,10.3227001 90.4025963,14.7902687 89.6902794,19.0285773 C87.424967,32.5069028 84.5967917,45.8898033 82.1988992,59.3471233 C80.8953955,66.6600362 79.9926453,74.0449678 78.9747914,81.4064934 C78.6541886,83.7261001 79.9727583,85.7354257 81.9927974,85.8752623 C83.3511411,85.9688867 84.8800311,84.1126012 86.2600698,83.03772 C86.5993544,82.773651 86.6632339,82.1524885 86.8428197,81.6921681 C94.4661774,62.1120466 101.979855,42.4887137 109.773156,22.9758097 C112.306642,16.6327506 115.446381,10.5159506 118.552372,4.4183557 C120.180094,1.22251977 123.313806,-0.199852275 126.790419,0.0228059653 C131.213172,0.306080061 135.368956,1.88509308 136.159013,6.79557751 C136.618223,9.64932396 136.151782,12.9387844 135.15502,15.6923046 C126.241417,40.3047424 117.113877,64.8409603 108.065283,89.4053856 C107.657298,90.5126753 107.20532,91.666177 107.153494,92.8154776 C107.126375,93.4204358 107.800726,94.2846619 108.391912,94.6045456 C108.761329,94.804998 110.314324,94.9568377 110.740389,94.5355275 C111.282762,93.9989872 113.456474,92.0304723 113.744534,91.3024818 C118.697005,78.7592009 125.597198,68.9364316 130.653322,56.4357618 C134.44873,47.0529076 139.310805,38.7077247 143.316533,29.4112931 C144.476609,26.7201892 148.050849,22.1643975 151.273149,21.9849506 C158.052212,21.6086521 164.705927,25.9081768 162.440614,32.8429907 C155.214394,54.9647771 139.813404,77.1105697 132.382288,99.1657386 C130.770234,103.95139 128.230722,108.646418 126.959158,113.516692 C126.581907,114.96127 126.371586,117.231664 127.492491,118.411573 C128.137915,119.09095 130.450233,118.698448 131.732645,118.145703 C133.2308,117.500534 134.600594,116.315224 135.720896,115.087903 C145.974162,103.854165 156.103887,92.5057966 166.421032,81.3302734 C168.341636,79.248929 170.806421,77.5648885 173.263372,76.1029061 C175.835426,74.573106 178.360475,75.8856493 180.468499,77.4142491 C182.370422,78.7928097 183.844472,80.7889318 183.138784,83.3083908 C182.425864,85.8566574 181.750308,88.6389852 180.217802,90.6969235 C173.483937,99.7400889 166.405363,108.526987 159.531083,117.466926 C154.542454,123.956423 149.178985,130.234065 144.887005,137.162277 C139.55427,145.77273 135.223721,154.995342 130.330309,163.883067 C125.199458,173.201104 120.510339,182.840225 114.520128,191.585713 C109.07229,199.538393 102.167275,206.507416 95.8401897,213.854538 C93.3525043,216.743093 90.8648189,219.548227 90.4285097,223.580081 C90.1416545,226.233976 89.8089989,228.907675 89.1732169,231.493751 C88.0378488,236.11376 85.363346,239.315597 80.310235,239.97637 C77.4555436,240.349668 74.6056734,240.760175 71.7539953,241.153878"></path>
                  </g>
              </g>
          </g>
        </g>
      </svg>
     );
  } else {
    return (
      <img alt="Left hand with finger highlighted" src={img}></img>
    )
  }
}

export default LeftHand;