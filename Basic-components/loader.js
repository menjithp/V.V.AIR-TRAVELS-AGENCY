import style from './loader.module.css'

export default ()=>{

    return <div className={`${style.backgroundloader} d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0`}>
        <span className={style.loader}></span>
    </div>
}