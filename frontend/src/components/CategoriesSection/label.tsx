import "./categories.css"
import { CategoryProps } from "../../types/categoryProps";


interface LabelProps extends CategoryProps {
    selected : boolean
}

export default function Label({ label, image, parent, selected }: LabelProps) {
    
    return(
        <div className={`label-container ${selected && "label-selected"}`} >
        {parent !== undefined && 
        <img
          src={image? image : "https://via.placeholder.com/150"}
          alt={label}
          className="label-image"
        />}
        <div className="label-text">
            {label}
        </div>
      </div>
    )

}