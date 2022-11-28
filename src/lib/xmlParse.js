import $ from "jquery";
import "./earsivXML";
// import floatNumber from "./floatNumber";
// import floatTrNumber from "./floatTrNumber";

async function earsivXML($xmlFiles) {
  const $faturalar = [];
  for (let i of $xmlFiles) {
    await $.get(
      URL.createObjectURL(i),
      (xml) => {
        $faturalar.push($.fn.earsivXML(xml, i.name));
      },
      "xml"
    );
  }
  return $faturalar;
}

export default earsivXML;
