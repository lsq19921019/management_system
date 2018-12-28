module.exports = _=>{
    let date = new Date();
    let year = date.getFullYear().toString()+'_';
    let month = (date.getMonth()+1).toString()+'_';
    let day = date.getDate().toString()+'_';
    let hour = date.getHours().toString()+'_';
    let m = date.getMinutes().toString()+'_';
    let s = date.getSeconds().toString();
    return year+month+day+hour+m+s;
};