import React, { useState } from "react";

function Slider({valuesOption,max,min,onChangeSlider,classNameSlider,valueSliders}){
    let [sliderState,setSliderState] = useState([])
    function changeValueSlider(event){  
        setSliderState([]);   
        const slidersContainer = document.getElementsByClassName("sliderField-sliders");
        for(let i = 0;i<slidersContainer.length;i+=1){
            setSliderState(arr => [...arr,`${slidersContainer[i].value}`])
        }
        onChangeSlider();        
    }
    return (
        <div class="slidersContainer">
            {valuesOption.map((value,index) => <div className={"radioCheckValue"}><label for={value}>{value}</label><input type="range" min={min} max={max} step={1} id={value} name={value} className={classNameSlider} onChange={changeValueSlider} /><p>{sliderState[index]}</p></div>)}
            <input type="range" max={"100"} min={"0"} step={"1"}/>
        </div>
    )
}
export default Slider;