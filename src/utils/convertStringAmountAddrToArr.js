export default function convertStringAmountAddrToArr(_addr) {
    let _arr = _addr.split(",")
    let _addrAmountArr = [];
    for(let i=0; i<_arr.length; i+=2) {
        _addrAmountArr.push([_arr[i].trim(), _arr[i+1].trim()])
    }
    console.log(_addrAmountArr)
    return _addrAmountArr
}