
const getExpiration = (date:string, time:string, lifeTime:number) =>{
    const dateArray = date.split("-")
    const timeArray = time.split("-")

    const minuteAsNumber = Number.parseInt(timeArray[0])
    const hourAsNumber = Number.parseInt(timeArray[1])

    const dayAsNumber = Number.parseInt(dateArray[2])
    const monthAsNumber = Number.parseInt(dateArray[1])
    const yearAsNumber = Number.parseInt(dateArray[0])
    const originalDate = new Date(yearAsNumber, monthAsNumber, dayAsNumber, hourAsNumber, minuteAsNumber)
    const expirationDate = new Date(originalDate.getTime()+lifeTime*60000)

    const expirationDateString = `${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDay()}/${expirationDate.getHours()}-${expirationDate.getMinutes()}`

    return expirationDateString
}

export {getExpiration}