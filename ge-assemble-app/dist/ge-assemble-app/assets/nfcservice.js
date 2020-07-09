
async function onScan(throwtag) {
  console.log("scan진입")
  try {
    const reader = new NDEFReader();
    await reader.scan();

    reader.addEventListener("error", (event) => {
      console.log("scanError")
      alert('ScanError')
    });
    reader.addEventListener("reading", ({ message, serialNumber }) => {
      console.log(message.records)
      throwtag(message.records)

      const decoder = new TextDecoder();
      for (const record of message.records) {
        switch (record.recordType) {
          case "text":
            const textDecoder = new TextDecoder(record.encoding);
            console.log(`Text: ${textDecoder.decode(record.data)} (${record.lang})`);
            throwtag(textDecoder.decode(record.data))
            break;
          case "url":
            console.log(`URL: ${decoder.decode(record.data)}`);
            break;
          case "mime":
            if (record.mediaType === "application/json") {
              console.log(`JSON: ${JSON.parse(decoder.decode(record.data))}`);
            }
            else if (record.mediaType.startsWith('image/')) {
              const blob = new Blob([record.data], { type: record.mediaType });
    
              const img = document.createElement("img");
              img.src = URL.createObjectURL(blob);
              img.onload = () => window.URL.revokeObjectURL(this.src);
    
              document.body.appendChild(img);
            }
            else {
              console.log(`Media not handled`);
            }
            break;
          default:
            console.log(`Record not handled`);
        }
      }
    });
  } catch (error) {
    console.log("scanError:" + error)
  }
}

async function onWrite(tagId,thowResult) {
  try {
    const writer = new NDEFWriter();
    await writer.write(tagId);
    console.log(tagId)
    thowResult(true)
  } catch (error) {
    console.log("writeError:" + error)
    thowResult(false)
  }
}