export default function convertStringAddrToArr(_addr) {
    let _arr = _addr.split(",")
    for(let i=0; i<_arr.length; i++) {
        _arr[i] = _arr[i].trim()
    }
    return _arr
}