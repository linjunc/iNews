
export const speak = (content) => {
    const msg = new SpeechSynthesisUtterance()
    const synth = window.speechSynthesis
    const speak = () => {
        msg.lang = 'zh-CN'
        msg.text = content;
        msg.volume = 70; //设置音量
        msg.rate = 1.5; //说话速度 
        msg.pitch = 1.5; //设置话语音调(值越大越尖锐,越低越低沉)
        synth.speak(msg)
    }
    const pause = (e) => {
        msg.text = e;
        msg.lang = 'zh-CN'
        synth.pause(msg)
    }
    const resume = () => {
        synth.resume()
    }
    const cancel = () => {
        synth.cancel(msg)
    }
    return {
        speak,
        pause,
        resume,
        cancel
    }
}

