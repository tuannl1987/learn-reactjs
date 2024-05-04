import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InsertEmoticon } from '@mui/icons-material';

TagsDropDown.propTypes = {
    options: PropTypes.array.isRequired,

    placeholder: PropTypes.string,
    disabled: PropTypes.bool,

    handleTagsChange: PropTypes.func,
};

TagsDropDown.defaultProps = {
    disabled: false,
    handleTagsChange: null,
};

function TagsDropDown(props) {
    const {options, placeholder, disabled, handleTagsChange} = props;

    const [chipList, setChipList] = useState([]);
    const [visiable, setVisiable] = useState('invisible');

    const itemList = options;

    const [renderItemList, setRenderItemList] = useState(itemList);

    // hide and show options list 
    const toogleItemList = () => {
        if (visiable === 'invisible') {
            setVisiable('visiable');
        } else {
            setVisiable('invisible');
        }
        // get position
        const tagsInput = document.getElementById("tags-input");
        const listItem = document.getElementById("list-item");
        const root = document.getElementById("root");
        if ( (tagsInput.offsetTop + window.scrollY) > root.offsetHeight / 2) {
            listItem.style.transform = "translate(" + tagsInput.offsetLeft + "px," + 0 + "px)";
        } else {
            const y = listItem.offsetHeight + tagsInput.offsetHeight;
            listItem.style.transform = "translate(" + tagsInput.offsetLeft + "px, -" + y + "px)";
        }

    };

    // check option selected
    const isSelected = (item) => {
        const equals = (a, b) => Object.keys(a).every(key => a[key] === b[key]);
        if (chipList.some(_item => equals(_item, item))) {
            return true;
        } else {
            return false;
        }
    };

    const handleItemClick = (item, index) => {
        const inputId = document.getElementById("tag-input");
        inputId.value = "";
        toogleItemList();
        setRenderItemList(itemList);

        const newChipList = [...chipList];

        const equals = (a, b) => Object.keys(a).every(key => a[key] === b[key]);

        if (newChipList.some(_item => equals(_item, item))) {
            const pos = newChipList.map(e => e.id).indexOf(item.id);
            newChipList.splice(pos, 1);
        } else {
            newChipList.push(item);
        }
        
        setChipList(newChipList);
        handleTagsChange(newChipList);
    };

    const handleDeleteChip = (chip, index) => {
        const newChipList = [...chipList];
        newChipList.splice(index, 1);
        setChipList(newChipList);
        handleTagsChange(newChipList);
    };

    const handleTagSelectClick = () => {
        toogleItemList();
    };

    const handleTagsInputClick = () => {
        toogleItemList();
    };

    const handleTagsInputChange = (event) => {
        const newItemList = itemList.filter(item =>  item.name.toLowerCase().includes(event.target.value));
        setRenderItemList(newItemList);
    };

    const handleDeleteBtnClick = () => {
        setChipList([]);
        handleTagsChange([]);
        if (visiable === 'visiable') {
            setVisiable('invisible');
        }
    };

    return (
        <>
        <div id="tags-input" className="w-full max-w-lg flex flex-col relative mr-2 ml-2">
            <div  className="flex flex-row flex-wrap w-full relative cursor-text
                                box-border border rounded border-solid border-gray-500
                                pr-16 bg-white">

                {chipList.map((chip, index) => (
                    <div
                        key={chip.id}
                        className='max-w-[calc(100% - 6px)] p-0 m-1 h-8 relative cursor-none 
                        inline-flex items-center justify-center align-middle
                        bg-gray-200 box-border border-0 rounded-2xl outline-none
                        font-sans text-sm no-underline select-none appearance-none'
                    >
                        <span
                            className='overflow-hidden text-ellipsis px-3 whitespace-nowrap'
                        >
                            {chip.name}
                        </span>

                        <svg 
                            className="cursor-pointer mt-0 mr-1.5 mb-0 -ml-1.5" 
                            height="24" 
                            width="24" 
                            onClick={() => handleDeleteChip(chip.id, index)}
                        >
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                        </svg>
                    </div>
                ))}
                    
                <input 
                    id="tag-input" 
                    className="text-ellipsis block box-content bg-none outline-0 grow
                                ps-1 pe-1 pt-2 pr-1 pb-2 pl-2" 
                    type='text' 
                    name='tags-input' 
                    placeholder={placeholder}
                    onClick={handleTagsInputClick} onKeyUp={handleTagsInputChange} />

                
                    <button 
                        className="cursor-pointer absolute top-2/4 right-8 translate-x-0 -translate-y-2/4" 
                        onClick={handleDeleteBtnClick}
                    >
                        <svg height="24" width="24" >
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                        </svg>
                    </button>
                    <button 
                        className="cursor-pointer absolute top-2/4 right-2 translate-x-0 -translate-y-2/4" 
                        onClick={handleTagSelectClick}
                    >
                        <svg height="24" width="24" >
                            <path d="M7 10l5 5 5-5z"></path>
                        </svg>
                    </button>
                
            </div>
        </div>

        <ul id="list-item" className={`w-full max-w-lg overflow-scroll max-h-32 bg-slate-50 absolute z-10 ${visiable}`}>
            {renderItemList.map((item, index) => (
                <li 
                    key={item.id} 
                    onClick={() => handleItemClick(item, index)}
                    className={`cursor-pointer p-2 ${isSelected(item) ? 'bg-cyan-300' : ''}`}
                >
                    {item.name}
                </li>
            ))}
        </ul>
        </>
    );
}

export default TagsDropDown;