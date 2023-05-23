exports.response = (msg,data,code,res) => {
    let obj = {};
    obj["code"] = code;
    obj["message"] = msg;
    obj["data"] = data;
    // obj["res"] = res;
    return res.status(code).json(obj);
}