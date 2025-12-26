import React, { useState, useRef, useEffect } from 'react';
import './DesignComponent.css';
import searchIcon from '../assets/search-icon.svg';
import iconButtonsSvg from '../assets/icon-buttons.svg';
import screenshotImage from '../assets/screenshot.png';
import AdvancedSearchModal from './AdvancedSearchModal';
import SearchSuggestionsDropdown from './SearchSuggestionsDropdown';

type InputsProps = {
  className?: string;
  active?: "Active" | "Typing" | "Default" | "Active4";
  value?: string;
  onChange?: (value: string) => void;
};

const Inputs: React.FC<InputsProps> = ({ className, value: externalValue, onChange: externalOnChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external value if provided, otherwise use internal state
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = externalOnChange || setInternalValue;

  // Blinking cursor animation
  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(interval);
    } else {
      setShowCursor(false);
    }
  }, [isFocused]);

  const handleWrapperClick = (e: React.MouseEvent) => {
    // Don't focus if clicking on clear button
    if (!(e.target as HTMLElement).closest('.search-clear-button')) {
      inputRef.current?.focus();
    }
  };

  const handleBlur = () => {
    // Use setTimeout to check if focus moved to clear button
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        setIsFocused(false);
      }
    }, 150);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (typeof setValue === 'function') {
      setValue(newValue);
    }
  };

  const handleClearMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof setValue === 'function') {
      setValue('');
    }
    // Keep focus after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (typeof setValue === 'function') {
        setValue('');
      }
      inputRef.current?.blur();
    }
  };

  // Determine state
  let state: "Default" | "Active4" | "Active" | "Typing" = "Default";
  if (isFocused && value) {
    state = "Typing";
  } else if (isFocused) {
    state = "Active";
  } else if (isHovered && !isFocused) {
    state = "Active4";
  }

  const searchLg = (
    <div className="search-icon-container" data-name="search-lg" data-node-id="1523:1980">
      <div className="search-icon-wrapper" data-name="Icon" data-node-id="I1523:1980;3463:405301">
        <div className="search-icon-inner" style={{ "--stroke-0": "rgba(8, 9, 13, 1)" } as React.CSSProperties}>
          <img alt="" className="search-icon" src={searchIcon} />
        </div>
      </div>
    </div>
  );

  const placeholderText = "Search photos by content, people, or metadata";

  const handleSelectSuggestion = (suggestion: string) => {
    if (typeof setValue === 'function') {
      setValue(suggestion);
    }
    inputRef.current?.focus();
  };

  return (
    <div className={`search-input-container ${className || ''}`}>
      <div
        className={`search-input-wrapper search-state-${state.toLowerCase()}`}
        onClick={handleWrapperClick}
        onMouseEnter={() => !isFocused && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-name={`Active=${state}`}
        data-node-id={state === "Default" ? "1517:1429" : state === "Active" ? "1489:121" : state === "Typing" ? "1489:562" : "1563:2990"}
      >
      {searchLg}
      
      <div className="search-input-content">
        {state === "Typing" ? (
          <>
            <div className="search-text-typing">
              <p className="search-text-typed">{value}</p>
              {showCursor && <span className="search-cursor">|</span>}
            </div>
            <div 
              className="search-clear-button" 
              onClick={handleClear}
              onMouseDown={handleClearMouseDown}
              data-name="Icon Buttons" 
              data-node-id="1489:566"
            >
              <img 
                alt="Clear" 
                className="search-clear-icon-svg" 
                src={iconButtonsSvg}
              />
            </div>
          </>
        ) : (
          <>
            <div className="search-text" data-node-id={state === "Active" ? "1489:612" : "1517:1420"}>
              {state === "Active" ? (
                <div className="search-text-active-wrapper">
                  {showCursor && (
                    <span className="search-cursor-active">|</span>
                  )}
                  <div className="search-text-active-placeholder">
                    <p className="search-text-content">{placeholderText}</p>
                  </div>
                </div>
              ) : (
                <p className="search-text-content">{placeholderText}</p>
              )}
            </div>
            {state !== "Active" && (
              <div className="search-shortcut" data-node-id="1563:3014">
                <div className="shortcut-button" data-name="Buttons/Button" data-node-id="1563:3047">
                  <div className="shortcut-text-padding" data-name="Text padding" data-node-id="I1563:3047;1487:372">
                    <p className="shortcut-text" data-node-id="I1563:3047;1487:373">
                      ⌘+K
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          setIsHovered(false);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="search-input-hidden"
        aria-label="Search photos"
        autoComplete="off"
        spellCheck="false"
      />
      </div>
      <SearchSuggestionsDropdown 
        isVisible={state === "Active"} 
        searchValue={value}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </div>
  );
};

const DesignComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="design-component" data-name="100" data-node-id="1563:3846">
      {/* Static screenshot background */}
      <div className="screenshot-background" data-name="image 6" data-node-id="1563:3847">
        <div className="screenshot-wrapper">
          <img 
            alt="" 
            className="screenshot-image" 
            src={screenshotImage}
          />
        </div>
      </div>
      
      {/* White header bar */}
      <div className="header-bar" data-node-id="1563:3848" />
      
      {/* Search input */}
      <Inputs 
        className="search-input-positioned" 
        value={searchValue}
        onChange={setSearchValue}
      />
      
      {/* Advanced Search Modal */}
      <AdvancedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialSearchValue={searchValue}
      />
    </div>
  );
};

export default DesignComponent;

