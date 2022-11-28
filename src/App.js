// import "./styles.css";
import { useState } from "react";
// import $ from "jquery";
// import faturalar from "./data/faturalar.js";
import stoklar from "./data/stoklar.js";
import xmlParse from "./lib/xmlParse";
const faturalar = {
  index: 0,
  data: [
    {
      fileName: "",
      uuID: "",
      evrakNo: "",
      evrakTarihi: "",
      profileID: "",
      InvoiceTypeCode: "",
      saticiVKN: "",
      saticiTCKN: "",
      saticiSirket: "",
      saticiAd: "",
      saticiSoyad: "",
      aliciVKN: "",
      aliciTCKN: "",
      aliciSirket: "",
      aliciAd: "",
      aliciSoyad: "",
      InvoiceLine: [],
      TaxSubtotal: []
    }
  ]
};
// import "./lib/earsivXML.js";
faturalar.data[faturalar.index].InvoiceLine.forEach((f) => {
  const find = stoklar.find((s) => s.name === f.malHizmet);
  f.gmkod = find?.gmkod ?? f.gmkod;
  // bilgiler anlık veri tabanından çekilecekse tablodaki kayıtlar trim() methodundan geçmeli.
});
function App() {
  const [fatura, setFatura] = useState([
    ...faturalar.data[faturalar.index].InvoiceLine
  ]);
  const evl = "50+45";
  const handleFileChange = async (files) => {
    faturalar.index = 0;
    faturalar.data = await xmlParse(files.target.files);
    faturalar.data[faturalar.index].InvoiceLine.forEach((f) => {
      switch (f.kdvOrani) {
        case 1:
          f.gmKdv = "191.N01";
          break;
        case 8:
          f.gmKdv = "191.N08";
          break;
        case 18:
          f.gmKdv = "191.N18";
          break;
        default:
          break;
      }
      const find = stoklar.find((s) => s.name === f.malHizmet);
      f.gmkod = find?.gmkod ?? f.gmkod;
      // bilgiler anlık veri tabanından çekilecekse tablodaki kayıtlar trim() methodundan geçmeli.
    });
    setFatura([...faturalar.data[faturalar.index].InvoiceLine]);
    console.log(faturalar);

    console.log(eval(evl));
  };
  // const handleFile = async (event) => {
  //   faturalar.data = [];
  //   for (let i of event.target.files) {
  //     // console.log(i.name);
  //     let tmppath = URL.createObjectURL(i);
  //     await $.get(
  //       tmppath,
  //       (x) => {
  //         $.fn.earsivXML(faturalar.data, x, i.name);
  //       },
  //       "xml"
  //     );
  //   }
  //   console.log(faturalar);
  // };

  return (
    <div className="h-[100vh] bg-gradient-to-b from-[#1fa2ff] to-[#12d8fa] to-[#a6ffcb]">
      <div className="container mx-auto py-1 flex flex-col items-center"></div>

      <div className="container mx-auto py-1 flex flex-col items-center">
        {/* <div className="grid grid-cols-3 gap-x-4"> */}
        <div className="inline-block">
          <div className="flex pb-1">
            <span className="inline-flex w-[200px] font-bold rounded-l-md items-center bg-white/50 border border-white/20 text-sm px-3 border-r-0 text-white">
              Alıcı VKN
            </span>
            <input
              type="text"
              readOnly
              value={
                faturalar.data[faturalar.index].aliciVKN === ""
                  ? faturalar.data[faturalar.index].aliciTCKN
                  : faturalar.data[faturalar.index].aliciVKN
              }
              className="h-10 w-[250px] bg-white/5 font-bold border rounded-r-md border-white/20 text-sm px-3 text-white min-w-0"
            />
            <span className="inline-flex w-[150px] font-bold rounded-l-md items-center bg-white/50 border border-white/20 text-sm px-3 border-r-0 text-white">
              Alıcı Unvanı
            </span>
            <input
              type="text"
              readOnly
              value={faturalar.data[faturalar.index].aliciSirket}
              className="h-10 w-[300px] bg-white/5 font-bold border rounded-r-md border-white/20 text-sm px-3 text-white min-w-0 w-full"
            />
          </div>
          <div className="flex pb-1">
            <span className="inline-flex w-[200px] font-bold rounded-l-md items-center bg-white/50 border border-white/20 text-sm px-3 border-r-0 text-white">
              Satıcı VKN
            </span>
            <input
              type="text"
              readOnly
              value={
                faturalar.data[faturalar.index].saticiVKN === ""
                  ? faturalar.data[faturalar.index].saticiTCKN
                  : faturalar.data[faturalar.index].saticiVKN
              }
              className="h-10 w-[250px] bg-white/5 font-bold border rounded-r-md border-white/20 text-sm px-3 text-white min-w-0"
            />
            <span className="inline-flex w-[150px] font-bold rounded-l-md items-center bg-white/50 border border-white/20 text-sm px-3 border-r-0 text-white">
              Satıcı Unvanı
            </span>
            <input
              type="text"
              readOnly
              value={faturalar.data[faturalar.index].saticiSirket}
              className="h-10 w-[250px] bg-white/5 font-bold border rounded-r-md border-white/20 text-sm px-3 text-white min-w-0 w-full"
            />
          </div>
          <input
            type="file"
            multiple
            accept=".xml"
            onChange={handleFileChange}
          />
          <input
            readOnly
            className="h-10 bg-white/5 border rounded border-white/20 text-sm px-3 text-white outline-none text-center"
            type="text"
            value={faturalar.data[faturalar.index].evrakNo}
          />
          <input
            readOnly
            className="h-10 bg-white/5 font-bold border rounded border-white/20 text-sm px-3 text-white outline-none text-center"
            type="date"
            value={faturalar.data[faturalar.index].evrakTarihi}
          />
        </div>
        <div className="grid gap-y-1 py-1">
          <div className="flex">
            <button
              onClick={() => {
                if (faturalar.index !== 0) {
                  faturalar.index -= 1;
                }
                setFatura(faturalar.data[faturalar.index].InvoiceLine);
              }}
              className="text-4xl rounded border border-blue-500 w-[100%] bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
            >
              &#8678;
            </button>
            <input
              readOnly
              className="h-10 w-12 bg-white/5 border rounded border-white/20 text-sm px-3 text-white text-center"
              type="text"
              value={faturalar.index + 1}
            />
            <input
              readOnly
              className="h-10 w-12 bg-white/5 border rounded border-white/20 text-sm px-3 text-white text-center"
              type="text"
              value={faturalar.data.length}
            />
            <div className="hidden flex items-center justify-center">
              <input
                type="checkbox"
                className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
              />
            </div>
            <button
              onClick={() => {
                if (
                  faturalar.data.lastIndexOf(faturalar.data.at(-1)) >
                  faturalar.index
                ) {
                  faturalar.index += 1;
                }
                // const tmpFatura = [
                //   ...faturalar.data[faturalar.index].InvoiceLine
                // ];
                setFatura([...faturalar.data[faturalar.index].InvoiceLine]);
              }}
              className="text-4xl rounded border border-blue-500 w-[100%] bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
            >
              &#8680;
            </button>
          </div>
          <div
            id="table-thead"
            className="bg-[#1fa2ff] bg-white/5 border rounded border-white/20 text-sm text-white outline-none"
          >
            <div className="bg-[#1fa2ff] flex justify-center border-white">
              <div className="border-[1px] border-blue text-white w-[50px]">
                #
              </div>
              <div className="text-center border-[1px] border-blue text-white w-[350px]">
                Muhasebe Kodu
              </div>
              <div className="text-center border-[1px] border-blue text-white w-[300px]">
                Mal Hizmet
              </div>
              <div className="border-[1px] border-blue text-white w-[100px]">
                Tutar
              </div>
              <div className="border-[1px] border-blue text-white w-[100px]">
                Kdv %
              </div>
              {/* <div className="border-[1px] border-blue text-white w-[100px]">
              Kdv
            </div> */}
              <div className="border-[1px] border-blue text-white w-[50px]">
                <button
                  onClick={() => {
                    faturalar.data[faturalar.index].InvoiceLine.push({
                      normal_tevk: 1,
                      gmkod: "",
                      gmKdv: "",
                      siraID: "",
                      malHizmetKodu: "",
                      malHizmet: "",
                      miktar: 0,
                      birimFiyat: 0,
                      tutar: 0,
                      kdvOrani: 0,
                      kdv: 0,
                      kdvPay1: 0,
                      kdvPay2: 0,
                      kdvPay2Kodu: "",
                      kdvPayOrani: 0
                    });
                    setFatura([...faturalar.data[faturalar.index].InvoiceLine]);
                  }}
                  className="px-4 rounded border border-blue-500 text-sm w-[100%] bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="table-tbody"
          className="h-[300px] bg-white/5 border rounded border-white/20 text-sm text-white outline-none"
        >
          {fatura.map((item, index) => (
            <div
              key={index}
              className="flex justify-center border-white even:bg-[#12d8fa] odd:bg-[#a6ffcb]"
            >
              <div className="border-[1px] h-[26px]border-blue text-[#212529] w-[50px]">
                {index + 1}
              </div>
              <div className="border-[1px] h-[26px]border-blue text-[#212529] w-[150px]">
                {item.gmkod}
              </div>
              <div className="border-[1px] h-[26px] border-blue text-[#212529] w-[200px]">
                <select
                  className="w-[100%] h-[100%]"
                  onChange={(e) => {
                    faturalar.data[faturalar.index].InvoiceLine[index].gmkod =
                      e.target.value;

                    setFatura([...faturalar.data[faturalar.index].InvoiceLine]);
                  }}
                  value={item.gmkod}
                >
                  <option value="">Kod Seçiniz</option>
                  <option value="150">İlk Madde ve Malzeme</option>
                  <option value="153">Ticari Mallar</option>
                  <option value="770">Genel Yönetim Giderleri</option>
                  <option value="760">
                    Pazarlama, Satış ve Dağıtım Giderleri
                  </option>
                </select>
              </div>
              <div
                className="border-[1px] h-[26px] border-blue text-[#212529] w-[300px] whitespace-wrap truncate"
                title={item.malHizmet}
              >
                {item.malHizmet}
              </div>
              <div className="border-[1px] h-[26px] border-blue text-[#212529] w-[100px]">
                {item.tutar}
              </div>
              <div className="border-[1px] h-[26px] border-blue text-[#212529] w-[100px]">
                {item.kdvOrani}
              </div>
              {/* <div className="border-[1px] h-[26px] border-blue text-[#212529] w-[100px]">
                {item.kdv}
              </div> */}
              <div className="border-[1px] h-[26px] border-blue text-[#212529] w-[50px]">
                <button
                  onClick={() => {
                    faturalar.data[faturalar.index].InvoiceLine.splice(
                      index,
                      1
                    );
                    setFatura([...faturalar.data[faturalar.index].InvoiceLine]);
                  }}
                  className="px-4 rounded border border-blue-500 text-sm w-[100%] bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
