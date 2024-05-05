import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

TagsDropDown2.propTypes = {
    optionsList: PropTypes.array.isRequired,

    placeHolder: PropTypes.string,
};

TagsDropDown2.defaultProps = {
    placeHolder: '',
};

function TagsDropDown2(props) {
    const { optionsList, placeHolder } = props;

    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [tagsList, setTagsList] = useState([]);
    const [filterList, setFilterList] = useState(optionsList);

    var tagsDropDown = useRef(null);
    // handle click out site of dropdown
    useEffect(() => {
      const handleClickOutSite = (e) => {
        if(tagsDropDown.current && !tagsDropDown.current.contains(e.target)) {
            // hide dropdown
            setIsOpen(false);
        } else {

        }
      };
    
      document.addEventListener('click', handleClickOutSite);
      return () => {
        document.removeEventListener('click', handleClickOutSite);
      }
    }, [tagsDropDown])
    
    // handle dropdown click
    const handleOnClick = () => {
        setIsOpen(true);
    };

    const handleOnChange = (e) => {
        setValue(e.target.value);
        const newList = optionsList.filter(option => option.name.toLocaleLowerCase().includes(e.target.value?.toLocaleLowerCase()));
        setFilterList(newList);
    };

    const handleOnKeyUp = (e) => {
        if (e.keyCode === 13 && filterList.length) {
            handleOnSelect(filterList[0]);
            setFilterList(optionsList);
        }
    };

    // check object equal object
    const equals = (a, b) => Object.keys(a).every(key => a[key] === b[key]);

    // handle select options
    const handleOnSelect = (option) => {
        // reset input value
        setValue('');
        // reset options list
        setFilterList(optionsList);

        // check option existed to remove or add into list
        const newList = [...tagsList];
        if (newList.some(_item => equals(_item, option))) {
            const pos = newList.map(e => e.id).indexOf(option.id);
            newList.splice(pos, 1);
        } else {
            newList.push(option);
        }
        setTagsList(newList);
    };

    // handle on delete one tag
    const handleOnDeleteTag = (tag, index) => {
        const newList = [...tagsList];
        newList.splice(index, 1);
        setTagsList(newList);
    };

    return (
        <div className='flex flex-col w-full max-w-lg' ref={tagsDropDown}>
            <div 
                className='relative flex flex-row flex-wrap cursor-text 
                            box-border border rounded border-solid border-gray-500
                            pr-16 bg-white'
                onClick={handleOnClick}>
                
                {tagsList.map((tag, index) => (
                    <div
                        key={tag.id}
                        className='relative max-w-[calc(100% - 6px)]
                                    p-0 m-1 h-8 
                                    inline-flex items-center justify-center align-middle
                                    bg-gray-200 box-border border-0 rounded-2xl outline-none
                                    font-sans text-sm no-underline select-none appearance-none'
                    >
                        <span
                            className='overflow-hidden text-ellipsis px-3 whitespace-nowrap pointer-events-none cursor-text'
                        >
                            {tag.name}
                        </span>
                        <div
                            className='cursor-pointer text-blue-800 font-bold -mt-2 mr-1.5 mb-0 -ml-1.5 h-3 w-3'
                            onClick={() => handleOnDeleteTag(tag, index)}
                        >
                            X
                        </div>
                    </div>
                ))}
                

                <input 
                    className='text-ellipsis block box-content bg-none outline-0 grow
                                ps-1 pe-1 pt-2 pr-1 pb-2 pl-2' 
                    type='text' 
                    value={value} 
                    onChange={handleOnChange}
                    onKeyUp={handleOnKeyUp} 
                    placeholder={placeHolder} 
                />
            </div>

            <div className='relative'>
                { 
                    isOpen && 
                    <ul className='absolute bg-slate-50 w-full max-h-32'>
                        {filterList.map((option) => (
                            <li
                                key={option.id}
                                className={` ${tagsList.includes(option) ? 'bg-cyan-200': ''} cursor-pointer p-2`}
                                onClick={() => handleOnSelect(option)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
}

export default TagsDropDown2;