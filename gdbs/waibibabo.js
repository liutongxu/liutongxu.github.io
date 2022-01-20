function bin2Waibi(num) {
  switch (num) {
    case 0b00:
      return '.';
    case 0b01:
      return ';';
    case 0b10:
      return '`';
    case 0b11:
      return ':';
    default:
      return null;
  }
}


function waibi2Bin(waibi) {
  switch (waibi) {
    case '.':
      return 0b00;
    case ';':
      return 0b01;
    case '`':
      return 0b10;
    case ':':
      return 0b11;
    default:
      return null;
  }
}


function waibiEncode(text) {
  return new Promise(((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const textArray = new Uint8Array(reader.result);
      let waibiText = [];
      for (let t of textArray) {
        let bin;
        // 7,6
        bin = t >>> 6;
        waibiText.push(bin2Waibi(bin));
        // 5,4
        bin = (t >>> 4) & 0b11;
        waibiText.push(bin2Waibi(bin));
        // 3,2
        bin = (t >>> 2) & 0b11;
        waibiText.push(bin2Waibi(bin));
        // 1,0
        bin = t & 0b11;
        waibiText.push(bin2Waibi(bin));
      }
      waibiText = waibiText.join('');
      resolve(waibiText);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(new Blob([text], {type: 'text/plain'}));
  }));
}


function waibiDecode(waibiText) {
  return new Promise(((resolve, reject) => {
    if (waibiText.length % 4 !== 0) {
      throw Error('密文长度必须为4的倍数');
    }
    waibiText = waibiText.split('');
    let dataArray = [];
    let move = 6;
    let temp = 0;
    for (let waibi of waibiText) {
      let a = waibi2Bin(waibi);
      if (a == null) {
        throw Error('密文输入不正确');
      }
      temp += a << move;
      move -= 2;
      if (move < 0) {
        dataArray.push(temp);
        temp = 0;
        move = 6;
      }
    }
    let typedArray = new Uint8Array(dataArray);
    let reader = new FileReader();
    reader.readAsText(new Blob([typedArray.buffer], {type: 'application/octet-stream'}));
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  }));
}


window.onload = () => {
  $('#btn-encode').click(event => {
    let text = $('#text')[0].value;
    if (text.length > 0) {
      waibiEncode(text).then(result => {
        $('#waibi')[0].value = result;
      }).catch(error => {
        alert(error);
      });
    }
  });
  $('#btn-decode').click(event => {
    let text = $('#waibi')[0].value;
    if (text.length > 0) {
      waibiDecode(text).then(result => {
        $('#text')[0].value = result;
      }).catch(error => {
        alert(error);
      });
    }
  });
};