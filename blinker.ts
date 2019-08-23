
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon=""
namespace blinker {
    let ssid = ""
    let pasd = ""
    let authkey = ""
    let receline = ""
    let para = ""
    let id = ""
    let step = 0
    let stop = 0
    let start = 0
    /**
     * TODO: 在此处描述您的函数
     * @param s 在此处描述参数, eg: "WIFI"
     */
    //% block="设置wifi名称 $s"
    export function set_ssid(s: string): void {
        ssid = s;
    }
    /**
     * TODO: 在此处描述您的函数
     * @param s 在此处描述参数, eg: "12345678"
     */
    //% block="设置wifi密码 $s"
    export function set_pasd(s: string): void {
        pasd = s;
    }
    /**
     * TODO: 在此处描述您的函数
     * @param s 在此处描述参数, eg: "cbfc1459b597"
     */
    //% block="设置blinker key $s"
    export function set_authkey(s: string): void {
        authkey = s;
    }
    //% block="连接blinker"
    export function connect(): void {
        serial.writeLine("AT")
        basic.pause(100)
        serial.writeLine("AT+BLINKER_WIFI=0," + authkey + "," + ssid + "," + pasd)
        basic.pause(1000)
    }

    //% block="发送滑动条 名字：$name 数值：$num"
    export function sendbar(name: string, num: number) {
        serial.writeLine("{\"" + name + "\":{\"val\":" + num.toString() + "}}")
    }

    //% block="发送数值 名字：$name 数值：$num"
    export function sendvalue(name: string, num: number) {
        serial.writeLine("{\"" + name + "\":{\"val\":" + num.toString() + "}}")
    }

    function get_message(buf: string) {
        step = 0
        for (let i = 0; i <= buf.length - 1; i++) {
            if (buf.charAt(i) == ":") {
                if (step == 0) {
                    step = 1
                    start = 1
                    stop = i
                    id = buf.substr(start, stop - start)
                    start = i + 1
                }
            } else if (buf.charAt(i) == ",") {
                if (step == 1) {
                    step = 2
                    stop = i
                    para = buf.substr(start, stop - start)
                }
            }
        }
    }
    //% block="接受命令"
    export function get_command(): void {
        receline = serial.readLine()
        get_message(receline)
    }

    //% block="命令ID"
    export function get_id(): string {
        return id.substr(1, id.length - 2);
    }
    //% block="命令参数"
    export function get_para(): string {
        return id;
    }
}
