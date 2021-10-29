export const dateFormatter = (date, format = "YYYY-MM-DD hh:mm:ss") => {
    date = new Date(date);
    let obj = {
        "Y+": date.getFullYear(), // 年
        "M+": date.getMonth(), // 月
        "D+": date.getDate(), // 日
        "h+": date.getHours(), // 时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
    }
    for (let key in obj) {
        let reg = new RegExp(`(${key})`);
        if (reg.test(format)) {
            format = format.replace(reg, f => `0000${obj[key]}`.slice(-f.length));
        }
    }
    return format;
}