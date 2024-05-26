interface Props{
    text:string,
    keyword:string|null
}

const HightLight:React.FC<Props> = ({text,keyword})=>{
    return text.split(new RegExp(`(${keyword})`,'gi')).map((c,i)=>c===keyword?<mark key={i}>{c}</mark>:c)
}

export default HightLight