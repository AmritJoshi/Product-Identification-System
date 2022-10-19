import React from "react";
import '../button.css'


const STYLES=[
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline"
]

const SIZE=[
    "btn--medium",
    "btn--small"
]


export const Button =({children,type,onClick,buttonStyle,buttonSize,value})=>{
    const checkButtonSTYLE=STYLES.includes(buttonStyle)?buttonStyle:STYLES[0];
    const checkButtonSIZE=SIZE.includes(buttonSize)?buttonSize:SIZE[0];

    return(
        <input className={`btn ${checkButtonSTYLE} ${checkButtonSIZE})`} onClick={onClick} type={type} style={{margin:"2px"}} value={value}>
            {children}
        </input>
    )
}