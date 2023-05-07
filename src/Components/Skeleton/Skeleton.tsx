/**
 * This component will make a skeleton component, a barebone component used as a placeholder
 *  when the data is still being fetched to show content
 * v0.0
 */
 import style from './skeleton.module.scss'
 
 interface Props{
   shape?: "rectangle" | "circle" | "rounded", // defaults to rectangle
   shade?: "lighter" | "light" | 'dark' | 'darker',//defaults to light
   animated?: boolean, // default to true
   borderRadius?: number | string
   className?: string,
   styles?:React.CSSProperties;
 }
 
 const Skeleton = ({shape, shade, animated, styles, className} : Props) => {
   const componentClass = `${ !!shade ? style[shade] : style.light} ${!!animated && style.animate}`
   const componentStyle ={
     borderRadius: "0"
   }
 
   if(shape === "circle"){
     componentStyle.borderRadius = "100%";
   }else if(shape === 'rounded'){
     componentStyle.borderRadius= "8px"
   }
 
   return(
     <div className={`${componentClass} ${className}`} style={componentStyle.borderRadius === "0" ? {...styles, ...componentStyle} :styles}></div>
   )
 }
 
 export default Skeleton;