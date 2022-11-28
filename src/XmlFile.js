function XmlFile() {
    const evl = "50+45"
    const handleFileChange = async files => {
        // console.log(await xmlParse(files.target.files));
        console.log(eval(evl));
    }
  return (
      <input
        type="file"
        // onChange={handleFile}
        className=""
        accept=".xml"
        multiple
      />
    
  );
}

export default XmlFile();
