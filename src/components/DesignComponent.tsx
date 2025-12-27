import React, { useState, useRef, useEffect } from 'react';
import './DesignComponent.css';
import searchIcon from '../assets/search-icon.svg';
import clearFieldSvg from '../assets/clear-field.svg';
import screenshotImage from '../assets/screenshot.png';
import closeXIcon from '../assets/close-x-icon.svg';
import AdvancedSearchModal from './AdvancedSearchModal';
import SearchSuggestionsDropdown from './SearchSuggestionsDropdown';
import PeopleViewModal from './PeopleViewModal';

type InputsProps = {
  className?: string;
  active?: "Active" | "Typing" | "Default" | "Active4";
  value?: string;
  onChange?: (value: string) => void;
};

type InputsPropsWithAdvanced = InputsProps & {
  onOpenAdvancedFilters?: () => void;
  onOpenPeopleView?: () => void;
  selectedPeople?: string[];
  onRemovePerson?: (person: string) => void;
  onTogglePerson?: (person: string) => void;
};

const Inputs: React.FC<InputsPropsWithAdvanced> = ({ className, value: externalValue, onChange: externalOnChange, onOpenAdvancedFilters, onOpenPeopleView, selectedPeople = [], onRemovePerson, onTogglePerson }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external value if provided, otherwise use internal state
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = externalOnChange || setInternalValue;

  const handleWrapperClick = (e: React.MouseEvent) => {
    // Don't focus if clicking on clear button or chip close button
    if (!(e.target as HTMLElement).closest('.search-clear-button') && 
        !(e.target as HTMLElement).closest('.search-person-chip-close')) {
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
    } else if (e.key === 'Backspace' && !value && selectedPeople.length > 0 && onRemovePerson) {
      // Delete last chip when backspace is pressed and input is empty
      e.preventDefault();
      const lastPerson = selectedPeople[selectedPeople.length - 1];
      onRemovePerson(lastPerson);
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
        style={{
          paddingLeft: '12px',
          paddingRight: '8px',
        }}
      >
      {searchLg}
      
      {/* Person chips */}
      {selectedPeople.length > 0 && (
        <div className="search-person-chips">
          {selectedPeople.slice(0, 2).map((person) => (
            <div key={person} className="search-person-chip" data-name="Tag" data-node-id="1719:5558">
              <div className="search-person-chip-content" data-name="Content" data-node-id="I1719:5558;3309:406970">
                <p className="search-person-chip-text" data-node-id="I1719:5558;3307:418119">
                  {person}
                </p>
              </div>
              <div 
                className="search-person-chip-close" 
                data-name="_Tag close X" 
                data-node-id="I1719:5558;3307:418120"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (onRemovePerson) {
                    onRemovePerson(person);
                  }
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div className="search-person-chip-close-icon" data-name="x-close" data-node-id="I1719:5558;3307:418120;3307:417860">
                  <div className="search-person-chip-close-icon-inner" data-name="Icon" data-node-id="I1719:5558;3307:418120;3307:417860;3463:405166">
                    <div className="search-person-chip-close-icon-vector" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                      <img alt="" className="search-person-chip-close-icon-img" src={closeXIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {selectedPeople.length > 2 && (
            <div className="search-person-chip search-person-chip-count" data-name="Tag" data-node-id="1719:5558">
              <div className="search-person-chip-content" data-name="Content" data-node-id="I1719:5558;3309:406970">
                <p className="search-person-chip-text" data-node-id="I1719:5558;3307:418119">
                  +{selectedPeople.length - 2}
                </p>
              </div>
              <div 
                className="search-person-chip-close" 
                data-name="_Tag close X" 
                data-node-id="I1719:5558;3307:418120"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // Remove all remaining people (those beyond the first 2)
                  if (onRemovePerson) {
                    selectedPeople.slice(2).forEach(person => {
                      onRemovePerson(person);
                    });
                  }
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div className="search-person-chip-close-icon" data-name="x-close" data-node-id="I1719:5558;3307:418120;3307:417860">
                  <div className="search-person-chip-close-icon-inner" data-name="Icon" data-node-id="I1719:5558;3307:418120;3307:417860;3463:405166">
                    <div className="search-person-chip-close-icon-vector" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                      <img alt="" className="search-person-chip-close-icon-img" src={closeXIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="search-input-content">
        {state === "Typing" || (value && !isFocused) ? (
          <>
            <div className="search-text-typing">
              <p className="search-text-typed">{value}</p>
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
                src={clearFieldSvg}
              />
            </div>
          </>
        ) : (
          <>
            {!isFocused && (
              <>
                <div className="search-text" data-node-id={state === "Active" ? "1489:612" : "1517:1420"}>
                  <p className="search-text-content">{placeholderText}</p>
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
        onOpenAdvancedFilters={onOpenAdvancedFilters}
        onOpenPeopleView={onOpenPeopleView}
        selectedPeople={selectedPeople}
        onTogglePerson={onTogglePerson}
      />
    </div>
  );
};

const DesignComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvancedFiltersModalOpen, setIsAdvancedFiltersModalOpen] = useState(false);
  const [isPeopleViewModalOpen, setIsPeopleViewModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const handleOpenAdvancedFilters = () => {
    setIsAdvancedFiltersModalOpen(true);
  };

  const handleOpenPeopleView = () => {
    setIsPeopleViewModalOpen(true);
  };

  const handleSelectPeople = (people: string[]) => {
    setSelectedPeople(people);
  };

  const handleRemovePerson = (person: string) => {
    setSelectedPeople(prev => prev.filter(p => p !== person));
  };

  const handleTogglePerson = (person: string) => {
    setSelectedPeople(prev => {
      if (prev.includes(person)) {
        return prev.filter(p => p !== person);
      } else {
        return [...prev, person];
      }
    });
  };

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
        onOpenAdvancedFilters={handleOpenAdvancedFilters}
        onOpenPeopleView={handleOpenPeopleView}
        selectedPeople={selectedPeople}
        onRemovePerson={handleRemovePerson}
        onTogglePerson={handleTogglePerson}
      />
      
      {/* Advanced Search Modal */}
      <AdvancedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialSearchValue={searchValue}
        onOpenAdvancedFilters={handleOpenAdvancedFilters}
        onOpenPeopleView={handleOpenPeopleView}
      />
      
      {/* Full Advanced Filters Modal */}
      <AdvancedSearchModal 
        isOpen={isAdvancedFiltersModalOpen} 
        onClose={() => setIsAdvancedFiltersModalOpen(false)}
        initialSearchValue={searchValue}
        onOpenAdvancedFilters={handleOpenAdvancedFilters}
        onOpenPeopleView={handleOpenPeopleView}
      />
      
      {/* People View Modal */}
      <PeopleViewModal 
        isOpen={isPeopleViewModalOpen} 
        onClose={() => setIsPeopleViewModalOpen(false)}
        onSelectPeople={handleSelectPeople}
      />
    </div>
  );
};

export default DesignComponent;

