import React, { useState, useRef, useEffect } from 'react';
import './DesignComponent.css';
import searchIcon from '../assets/search-icon.svg';
import frameIcon from '../assets/frame-icon.svg';
import iconButtonsSvg from '../assets/icon-buttons.svg';
import screenshotImage from '../assets/screenshot.png';
import AdvancedSearchModal from './AdvancedSearchModal';

type InputsProps = {
  className?: string;
  active?: "Active" | "Typing" | "Default" | "Active4";
};

const Inputs: React.FC<InputsProps> = ({ className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setValue(e.target.value);
  };

  const handleClearMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue('');
    // Keep focus after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setValue('');
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

  return (
    <div
      className={`search-input-wrapper ${className || ''} search-state-${state.toLowerCase()}`}
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
  );
};

const AdvancedButton: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onOpenModal();
  };

  const buttonState = isActive ? "active" : isHovered ? "hover" : "default";

  return (
    <div
      className={`advanced-button-container advanced-button-${buttonState}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      data-name="Buttons/Button"
      data-node-id={isActive ? "1605:3551" : "1605:3535"}
    >
      <div className="advanced-button-content" data-name="Text padding" data-node-id={isActive ? "1605:3553" : "1605:3537"}>
        <div className="advanced-icon" data-name="Frame" data-node-id={isActive ? "1605:3554" : "1605:3538"}>
          <img alt="" className="advanced-icon-img" src={frameIcon} />
        </div>
        <div className="advanced-text-wrapper" data-node-id={isActive ? "1605:3564" : "1605:3548"}>
          <p className="advanced-text">Advanced</p>
        </div>
      </div>
    </div>
  );
};

const DesignComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Inputs className="search-input-positioned" />
      
      {/* Advanced button */}
      <AdvancedButton onOpenModal={() => setIsModalOpen(true)} />
      
      {/* Advanced Search Modal */}
      <AdvancedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DesignComponent;

