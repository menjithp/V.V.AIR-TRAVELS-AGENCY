import style from './Button.module.css'

export default ({onClick,title,className,children})=>{
    return <button className={style.customButton+" "+className} onClick={onClick} >{children} </button>
}