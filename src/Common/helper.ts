export const URL = 'http://localhost:3000/'

/**
 *  格式化时间的函数
 * */
export const FormatTime = (time: number): string => {

        // let hours:string|number = Math.floor(time / (60 * 60))
        const minutes = String(Math.floor(time / (60))).padStart(2, '0')
        const seconds = String(Math.floor(time % 60)).padStart(2, '0')

        // switch (hours) {
        //     case 0:
        return `${minutes}:${seconds}`
        //     default:
        //         hours = String(hours).padStart(2, '0')

        // return `${hours}:${minutes}:${seconds}`

        // }





}