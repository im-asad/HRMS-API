module.exports = (obj) => {
    let flattenedObj = {};
    const firstLevelArr = Object.keys(obj);
    for (let i = 0; i < firstLevelArr.length; i++) {
        if (typeof obj[firstLevelArr[i]] === "object") {
            const secondLevelArrElements = Object.keys(obj[firstLevelArr[i]]);
            for (let j = 0; j < secondLevelArrElements.length; j++) {
                flattenedObj[secondLevelArrElements[j]] = obj[firstLevelArr[i]][secondLevelArrElements[j]]
            }
        } else {
            flattenedObj[firstLevelArr[i]] = obj[firstLevelArr[i]];
        }
    }

    return flattenedObj;
}