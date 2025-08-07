import { useState, type InputEventHandler } from 'react';
import './Range.css'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'



interface RangeProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
}

const Range = ({ min, max, step = 1, value, onChange }: RangeProps) => {
    const handleInputBlurOrEnter = (index: 0 | 1) => (
        e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
    ) => {
        if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
            return;
        }

        const inputValue = parseInt((e.currentTarget as HTMLInputElement).value);
        const newValue = isNaN(inputValue) ? (index === 0 ? min : max) : inputValue;
        
        const newValues: [number, number] = [...value];
        
        if (index === 0) {
            newValues[0] = Math.min(Math.max(newValue, min), newValues[1]);
        } else {
            newValues[1] = Math.max(Math.min(newValue, max), newValues[0]);
        }

        onChange(newValues);
    };

    const handleInputChange = (index: 0 | 1) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputValue = parseInt(e.target.value);
        if (isNaN(inputValue)) return;
        
        const newValues: [number, number] = [...value];
        newValues[index] = inputValue;
        onChange(newValues);
    };

    return (
        <div className="range">
            <div className="inputs_container">
                <div className='input_container input_left'>
                    <input 
                        className="inputs" 
                        type="number" 
                        value={value[0]}
                        min={min}
                        max={value[1]}
                        onChange={(e) => handleInputChange(0)(e)}
                        onBlur={handleInputBlurOrEnter(0)}
                        onKeyDown={handleInputBlurOrEnter(0)} 
                    />
                </div>
                <div className='input_container input_right'>
                    <input 
                        className="inputs" 
                        type="number" 
                        value={value[1]}
                        min={value[0]}
                        max={max}
                        onChange={(e) => handleInputChange(1)(e)}
                        onBlur={handleInputBlurOrEnter(1)}
                        onKeyDown={handleInputBlurOrEnter(1)} 
                    />
                </div>
            </div>
            <RangeSlider 
                className="range_slider" 
                step={step} 
                value={value} 
                min={min} 
                max={max} 
                onInput={onChange} 
            />
        </div>
    );
};

export default Range;