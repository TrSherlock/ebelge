import $ from "jquery";
let vknList = [
    {
        vkn: "8880327852",
        tckn: "",
        InvoiceLine: [],
        TaxSubtotal: [
            {
                siraID: 18,
                malHizmet: "ENERJİ TÜKETİM BEDELİ",
                tutar: "$(xml).find(schema.PayableAmount).text() / 1.18",
                kdvOrani: 18,
                kdvPay1: "$(xml).find(schema.PayableAmount).text() / 1.18 * 0.18",
                gmkod: "",
                gmKdv: ""
            }
        ]
    },
    {
        vkn: "9470457468",
        tckn: "",
        InvoiceLine: [
            {
                siraID: 1,
                malHizmet: "Sipariş İletim Hizmet Bedeli",
                tutar: "$(xml).find(schema.LineExtensionAmount).text() - ($(xml).find(schema.LineExtensionAmount).text() / 1.6)",
                kdvOrani: 18,
                kdvPay1: "($(xml).find(schema.LineExtensionAmount).text() - ($(xml).find(schema.LineExtensionAmount).text() / 1.6)) * 18 /100",
                gmkod: "",
                gmKdv: ""
            },
            {
                siraID: 1,
                malHizmet: "Dağıtım Hizmet Bedeli",
                tutar: "$(xml).find(schema.LineExtensionAmount).text() / 1.6",
                kdvOrani: 18,
                kdvPay1: "($(xml).find(schema.LineExtensionAmount).text() / 1.6) * 18 /100",
                gmkod: "",
                gmKdv: ""
            }
        ],
        TaxSubtotal: []
    }
]
function floatNumber(yeniSayi) {

    return Number(new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(yeniSayi).split(",").join(""))
}
$.fn.earsivXML = (xml, $fileName) => {
    // console.log(xml);
    let schema = {
        evrakno: "/Invoice/cbc:ID",
        uuID: "/Invoice/cbc:UUID",
        ProfileID: "/Invoice/cbc:ProfileID",
        InvoiceTypeCode: "/Invoice/cbc:InvoiceTypeCode",
        tarih: "/Invoice/cbc:IssueDate",
        saticiVKN: "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='VKN']",
        saticiTCKN: "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='TCKN']",
        saticiSirket: "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name",
        saticiAd: "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:FirstName",
        saticiSoyad: "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:FamilyName",
        aliciVKN: "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='VKN']",
        aliciTCKN: "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='TCKN']",
        aliciSirket: "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name",
        aliciAd: "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:Person/cbc:FirstName",
        aliciSoyad: "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:Person/cbc:FamilyName",
        InvoiceLine: "/Invoice/cac:InvoiceLine",
        InvoiceLineName: "cac:item/cbc:Name",
        LineExtensionAmount: "/Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount",
        TaxExclusiveAmount: "/Invoice/cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount",
        TaxInclusiveAmount: "/Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount",
        PayableAmount: "/Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount",
        WithholdingTaxTotal: "/Invoice/cac:WithholdingTaxTotal/cac:TaxSubtotal",
        WithholdingTaxAmount: "cbc:TaxAmount",
        WithholdingPercent: "cbc:Percent",
        WithholdingTaxTypeCode: "cac:TaxCategory/cac:TaxScheme/cbc:TaxTypeCode",
        TaxTotal: "/Invoice/cac:TaxTotal/cac:TaxSubtotal",
        toplamTutar: "cbc:TaxableAmount",
        toplamKdv: "cbc:TaxAmount",
        toplamKdvOrani: "cbc:Percent",
        siraID: "/cbc:ID",
        malHizmetKodu: "/cac:Item/cac:SellersItemIdentification/cbc:ID",
        malHizmetEkAciklama: "/cac:Item/cbc:Description",
        malHizmet: "/cac:item/cbc:Name",
        miktar: "/cbc:InvoicedQuantity",
        birimFiyat: "/cac:Price/cbc:PriceAmount",
        // tutar: "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount",
        tutar: "cac:TaxSubtotal/cbc:TaxableAmount",
        tutar3: "cbc:LineExtensionAmount",
        tutar1: "cac:TaxSubtotal/cbc:TaxableAmount",
        tutar2: "cac:TaxTotal/cbc:TaxAmount",
        iskontoSonrasi: "cbc:LineExtensionAmount",
        kdvOrani: "/cac:TaxTotal/cac:TaxSubtotal/cbc:Percent",
        kdv: "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount",
        kdvPay1: "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount",
        kdvPay2: "/cac:WithholdingTaxTotal/cac:TaxSubtotal/cbc:TaxAmount",
        kdvPay2Kodu: "/cac:WithholdingTaxTotal/cac:TaxSubtotal/cac:TaxCategory/cac:TaxScheme/cbc:TaxTypeCode",
        kdvPayOrani: "/cac:WithholdingTaxTotal/cac:TaxSubtotal/cbc:Percent",
        vergisizTutar: "/Invoice/cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount",
        faturaAltiIskontoOrani: "/Invoice/cac:AllowanceCharge/cbc:MultiplierFactorNumeric",
        faturaAltiIskontoTutari: "/Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount",
        odenecekTutar: "/Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount"
    };

    let keys = Object.keys(schema)

    keys.forEach((val_) => {
        schema[val_] = schema[val_].replace(/[/]/g, ">").replace(/[:]/g, "\\:")
    })

    if (typeof xml === "string") { xml = $.parseXML(xml) };
    let fatura = {
        fileName: $fileName,
        uuID: $(xml).find(schema.uuID).text(),
        evrakNo: $(xml).find(schema.evrakno).text(),
        evrakTarihi: $(xml).find(schema.tarih).text(),
        profileID: $(xml).find(schema.ProfileID).text(),
        InvoiceTypeCode: $(xml).find(schema.InvoiceTypeCode).text(),
        saticiVKN: $(xml).find(schema.saticiVKN).text(),
        saticiTCKN: $(xml).find(schema.saticiTCKN).text(),
        saticiSirket: $(xml).find(schema.saticiSirket).text(),
        saticiAd: $(xml).find(schema.saticiAd).text(),
        saticiSoyad: $(xml).find(schema.saticiSoyad).text(),
        aliciVKN: $(xml).find(schema.aliciVKN).text(),
        aliciTCKN: $(xml).find(schema.aliciTCKN).text(),
        aliciSirket: $(xml).find(schema.aliciSirket).text(),
        aliciAd: $(xml).find(schema.aliciAd).text(),
        aliciSoyad: $(xml).find(schema.aliciSoyad).text(),
        InvoiceLine: [],
        TaxSubtotal: [],
        WithholdingTaxTotal: []
    }
    let algoritma = vknList.find(v => v.vkn === $(xml).find(schema.saticiVKN).text() && v.tckn === $(xml).find(schema.saticiTCKN).text())

    // console.log(typeof algoritma);
    if (algoritma) {
        // console.log("fatura eşleşti")
        algoritma.TaxSubtotal.forEach(t => {
            fatura.TaxSubtotal.push({
                siraID: floatNumber(t.siraID),
                malHizmet: t.malHizmet,
                tutar: floatNumber(eval(t.tutar)),
                kdvOrani: t.kdvOrani,
                kdvPay1: floatNumber(eval(t.kdvPay1)),
                gmkod: t.gmkod,
                gmKdv: t.gmKdv
            })
        })
        algoritma.InvoiceLine.forEach(il => {
            fatura.InvoiceLine.push({
                siraID: floatNumber(il.siraID),
                malHizmet: il.malHizmet,
                tutar: floatNumber(eval(il.tutar)),
                kdvOrani: il.kdvOrani,
                kdvPay1: floatNumber(eval(il.kdvPay1)),
                gmkod: il.gmkod,
                gmKdv: il.gmKdv
            })
        })
        // fatura.TaxSubtotal.push({
        //     siraID: floatNumber(algoritma.siraID),
        //     malHizmet: algoritma.malHizmet,
        //     tutar: floatNumber(eval(algoritma.tutar)),
        //     kdvOrani: algoritma.kdvOrani,
        //     kdvPay1: floatNumber(eval(algoritma.kdvPay1)),
        //     gmkod: algoritma.gmkod,
        //     gmKdv: algoritma.gmKdv
        // })
    } else {
        // EĞER ÇALIŞMAZSA BU SATIR İLE
        $(xml).find(schema.TaxTotal).each((ind, item) => {
            fatura.TaxSubtotal.push({
                siraID: floatNumber($(item).find(schema.toplamKdvOrani).text()),
                malHizmet: `Mal Alışı %${floatNumber($(item).find(schema.toplamKdvOrani).text())}`,
                tutar: floatNumber($(item).find(schema.toplamTutar).text()),
                kdvOrani: floatNumber($(item).find(schema.toplamKdvOrani).text()),
                kdvPay1: floatNumber($(item).find(schema.toplamKdv).text()),
                gmkod: "",
                gmKdv: ""
            })

            if ($(item).find(schema.toplamKdvOrani).text() === "0") {
                fatura.tutar00 = floatNumber($(item).find(schema.toplamTutar).text());
            } else if ($(item).find(schema.toplamKdvOrani).text() === "1") {
                fatura.tutar01 = floatNumber($(item).find(schema.toplamTutar).text());
                fatura.kdv01 = floatNumber($(item).find(schema.toplamKdv).text());
            }
            else if ($(item).find(schema.toplamKdvOrani).text() === "8") {
                fatura.tutar08 = floatNumber($(item).find(schema.toplamTutar).text());
                fatura.kdv08 = floatNumber($(item).find(schema.toplamKdv).text());
            }
            else if ($(item).find(schema.toplamKdvOrani).text() === "18") {
                fatura.tutar18 = floatNumber($(item).find(schema.toplamTutar).text());
                fatura.kdv18 = floatNumber($(item).find(schema.toplamKdv).text());
            }
            // $test = {
            //     toplamKdvOrani: floatNumber($(item).find(schema.toplamKdvOrani).text()),
            //     toplamTutar: floatNumber($(item).find(schema.toplamTutar).text()),
            //     toplamKdv: floatNumber($(item).find(schema.toplamKdv).text()),
            //     toplamKdvOraniStr: $(item).find(schema.toplamKdvOrani).text(),
            //     toplamTutarStr: $(item).find(schema.toplamTutar).text(),
            //     toplamKdvStr: $(item).find(schema.toplamKdv).text()
            // }
            // console.log($test)
            // fatura.tutar00
        })
        $(xml).find(schema.InvoiceLine).each((ind, item) => {
            let malHizmet;
            if ($(item).find(schema.malHizmetEkAciklama).text() === "" && $(item).find(schema.malHizmet).text() === $(item).find(schema.malHizmetKodu).text()) {
                malHizmet = $(item).find(schema.malHizmet).text();
            } else if ($(item).find(schema.malHizmetEkAciklama).text() !== "" && $(item).find(schema.malHizmet).text() === $(item).find(schema.malHizmetKodu).text()) {
                malHizmet = $(item).find(schema.malHizmetEkAciklama).text();
            } else {
                malHizmet = $(item).find(schema.malHizmet).text();
            }

            // let tutar1 = parseFloat($(item).find(schema.tutar1).text());
            // let tutar2 = parseFloat($(item).find(schema.tutar2).text());

            // let kdv1 = parseFloat($(item).find(schema.tutar).text()) * parseFloat($(item).find(schema.tutar).text()) / 100;
            // let kdv2 = parseFloat($(item).find(schema.kdvPay1).text());
            // if(tutar == $(item).find(schema.kdvPay1).text()){
            //     tutar = 
            // }
            let InvoiceLine = {
                normal_tevk: $(item).find(schema.kdvPay2).text() === "" ? 1 : 2,
                gmkod: "",
                gmKdv: "",
                siraID: $(item).find(schema.siraID).text(),
                malHizmetKodu: $(item).find(schema.malHizmetKodu).text(),
                malHizmet: malHizmet,
                miktar: parseFloat($(item).find(schema.miktar).text()),
                birimFiyat: parseFloat($(item).find(schema.birimFiyat).text() === "" ? 0 : $(item).find(schema.birimFiyat).text()),

                tutar: isNaN(parseFloat($(item).find(schema.tutar).text())) ? parseFloat($(item).find(schema.tutar3).text()) : parseFloat($(item).find(schema.tutar).text()),
                kdvOrani: parseFloat($(item).find(schema.kdvOrani).text()),
                kdv: floatNumber($(item).find(schema.kdv).text()),
                kdvPay1: floatNumber($(item).find(schema.kdvPay1).text() === "" ? 0 : $(item).find(schema.kdvPay1).text()),
                kdvPay2: floatNumber($(item).find(schema.kdvPay2).text() === "" ? 0 : $(item).find(schema.kdvPay2).text()),
                kdvPay2Kodu: $(item).find(schema.kdvPay2Kodu).text(),
                kdvPayOrani: floatNumber($(item).find(schema.kdvPayOrani).text()),
            }
            fatura.InvoiceLine.push(InvoiceLine);
        })

        $(xml).find(schema.WithholdingTaxTotal).each((ind, item) => {
            let WithholdingTaxTotal = {
                TaxTypeCode: parseFloat($(item).find(schema.WithholdingTaxTypeCode).text()),
                Percent: parseFloat($(item).find(schema.WithholdingPercent).text()),
                TaxAmount: parseFloat($(item).find(schema.WithholdingTaxAmount).text())
            }
            fatura.WithholdingTaxTotal.push(WithholdingTaxTotal)
        })


        fatura.TaxSubtotal.forEach(c => {
            // console.log(c.tutar === 0);
            switch (c.kdvOrani) {
                case 0:
                    if (c.tutar === 0) {
                        c.tutar = fatura.InvoiceLine.reduce((a, b) => {
                            if (b.kdvOrani === 0) {
                                return a += floatNumber(b.tutar)
                            } else {
                                return a
                            }
                        }, 0)
                    }
                    break;
                case 1:
                    if (c.tutar === 0) {
                        c.tutar = fatura.InvoiceLine.reduce((a, b) => {
                            if (b.kdvOrani === 1) {
                                return a += floatNumber(b.tutar)
                            } else {
                                return a
                            }
                        }, 0)
                    }
                    break;
                case 8:
                    if (c.tutar === 0) {
                        c.tutar = fatura.InvoiceLine.reduce((a, b) => {
                            if (b.kdvOrani === 8) {
                                return a += floatNumber(b.tutar)
                            } else {
                                return a
                            }
                        }, 0)
                    }
                    break;
                case 18:
                    if (c.tutar === 0) {
                        c.tutar = fatura.InvoiceLine.reduce((a, b) => {
                            if (b.kdvOrani === 18) {
                                return a += floatNumber(b.tutar)
                            } else {
                                return a
                            }
                        }, 0)
                    }
                    break;
                default:
                    break;
            }
        })
        // BU SATIR ARASINI DIŞARI ÇIKAR
    }


    // invoice._data.push(fatura)
    // fatura.TaxSubtotal.reduce((a, b) => a += b.tutar, 0) == 0


    // xml._data.push(xml.fatura);
    return fatura;
}