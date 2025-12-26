import React, { useState, useRef, useEffect } from 'react';
import './AdvancedSearchModal.css';
import './SearchSuggestionsDropdown.css';
import searchIcon from '../assets/search-icon.svg';
import closeXIcon from '../assets/close-x-icon.svg';
import iconButtonsSvg from '../assets/icon-buttons.svg';
import filterIcon from '../assets/filter-icon.svg';
import arrowDownIcon from '../assets/arrow-down-icon.svg';
import arrowRightIcon from '../assets/16f676d5be3442ecdd9228f68fac1693697db02a.svg';
import photosIconDefault from '../assets/photos-icon-default.svg';
import photosIconSelected from '../assets/photos-icon-selected.svg';
import videoIconDefault from '../assets/video-icon-default.svg';
import videoIconSelected from '../assets/video-icon-selected.svg';
import dateCalendarIcon from '../assets/date-calendar-icon.svg';
import dropdownChevronIcon from '../assets/dropdown-chevron-icon.svg';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchValue?: string;
  onOpenAdvancedFilters?: () => void;
  onOpenPeopleView?: () => void;
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ isOpen, onClose, initialSearchValue = '', onOpenAdvancedFilters, onOpenPeopleView }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'photos' | 'videos'>('photos');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [selectedSearchIn, setSelectedSearchIn] = useState<string>('all');
  const [tags, setTags] = useState<string[]>(['beach', 'summer 2025']);
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set());
  const [isFileTypesExpanded, setIsFileTypesExpanded] = useState(false);

  // People photos and names - matching SearchSuggestionsDropdown
  const peoplePhotos = [
    'https://i.pravatar.cc/150?img=12', // Oliver Thompson
    'https://i.pravatar.cc/150?img=47', // Sophia Martinez
    'https://i.pravatar.cc/150?img=33', // Liam Johnson
    'https://i.pravatar.cc/150?img=68', // Emma Williams
    'https://i.pravatar.cc/150?img=15', // Noah Brown
    'https://i.pravatar.cc/150?img=32', // Isabella Clark
  ];

  const people = [
    'Oliver Thompson',
    'Sophia Martinez',
    'Liam Johnson',
    'Emma Williams',
    'Noah Brown',
    'Isabella Clark',
  ];
  
  // Search input states
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [showCursor, setShowCursor] = useState(true);
  const [justOpened, setJustOpened] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update search value only when modal first opens
  useEffect(() => {
    if (isOpen) {
      // Set initial value when modal opens
      if (initialSearchValue) {
        setSearchValue(initialSearchValue);
      }
      // Reset focus state and justOpened flag when modal opens
      setIsFocused(false);
      setJustOpened(true);
      // Don't auto-focus - let user see default state first
    } else {
      // Reset justOpened when modal closes
      setJustOpened(true);
      // Reset selected people when modal closes
      setSelectedPeople(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only depend on isOpen to preserve user input

  const handleTogglePerson = (person: string) => {
    setSelectedPeople(prev => {
      const newSet = new Set(prev);
      if (newSet.has(person)) {
        newSet.delete(person);
      } else {
        newSet.add(person);
      }
      return newSet;
    });
  };

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

  if (!isOpen) return null;

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSearchWrapperClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.modal-search-clear-button')) {
      searchInputRef.current?.focus();
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== searchInputRef.current) {
        setIsFocused(false);
      }
    }, 150);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClearMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearchClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchValue('');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Clear all filters logic can be added here
    setSearchValue('');
    setSelectedType('photos');
    setSelectedFileType('all');
    setSelectedSearchIn('all');
    setTags([]);
  };

  const handleClearAllMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchValue('');
      searchInputRef.current?.blur();
    }
  };

  // Determine search input state
  // Show default state when modal just opened, even if there's a value
  let searchState: "Default" | "Active4" | "Active" | "Typing" = "Default";
  if (isFocused && searchValue) {
    searchState = "Typing";
  } else if (isFocused) {
    searchState = "Active";
  } else if (justOpened) {
    // Show default state when modal just opened, even if there's a value
    searchState = "Default";
  } else if (searchValue) {
    // If there's text and modal has been interacted with, show typing state
    searchState = "Typing";
  } else if (isHovered) {
    searchState = "Active4";
  }

  const placeholderText = "Search photos by content, people, or metadata";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} data-name="search-01" data-node-id="1587:3293">
        {/* Header */}
        <div className="modal-header" data-node-id="1587:3534">
          <div className="modal-header-content" data-node-id="1587:3295">
            <div className="modal-title-wrapper" data-node-id="1587:3296">
              <p className="modal-title" data-node-id="1587:3297">Advanced search</p>
            </div>
            <div className="modal-close-button" onClick={onClose} data-node-id="1587:3298">
              <div className="modal-close-icon-wrapper" data-name="Icon sizes" data-node-id="1587:3299">
                <div className="modal-close-icon-container" data-name="x" data-node-id="I1587:3299;361:16">
                  <div className="modal-close-icon-inner" data-name="Vector" data-node-id="I1587:3299;361:16;366:3239">
                    <img alt="Close" className="modal-close-icon" src={closeXIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search Input */}
          <div 
            className={`modal-search-input modal-search-state-${searchState.toLowerCase()}`}
            onClick={handleSearchWrapperClick}
            onMouseEnter={() => !isFocused && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-name="Input" 
            data-node-id="1587:3300"
          >
            <div className="modal-search-icon-container" data-name="search-lg" data-node-id="1587:3301">
              <div className="modal-search-icon-wrapper" data-name="Icon" data-node-id="I1587:3301;3463:405301">
                <div className="modal-search-icon-inner" style={{ "--stroke-0": "rgba(8, 9, 13, 1)" } as React.CSSProperties}>
                  <img alt="" className="modal-search-icon" src={searchIcon} />
                </div>
              </div>
            </div>
            <div className="modal-search-content" data-node-id="1587:3302">
              {searchState === "Typing" ? (
                <>
                  <div className="modal-search-text-typing">
                    <p className="modal-search-typed-text">{searchValue}</p>
                    {isFocused && showCursor && <span className="modal-search-cursor">|</span>}
                  </div>
                  <div 
                    className="modal-search-clear-button" 
                    onClick={handleSearchClear}
                    onMouseDown={handleSearchClearMouseDown}
                  >
                    <img alt="Clear" className="modal-search-clear-icon-svg" src={iconButtonsSvg} />
                  </div>
                </>
              ) : (
                <div className="modal-search-text-wrapper" data-node-id="1587:3304">
                  {searchState === "Active" ? (
                    <div className="modal-search-text-content" data-node-id="1587:3305">
                      {showCursor && <span className="modal-search-cursor">|</span>}
                      <div className="modal-search-placeholder" data-node-id="1587:3307">
                        <p>{placeholderText}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="modal-search-placeholder" data-node-id="1587:3307">
                      <p>{placeholderText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => {
                setIsFocused(true);
                setIsHovered(false);
                setJustOpened(false); // Clear justOpened flag when user focuses
              }}
              onBlur={handleSearchBlur}
              onKeyDown={handleSearchKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="modal-search-input-hidden"
              aria-label="Search"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" data-name="search-modal-1" data-node-id="1587:3294">
          {/* Type Section */}
          <div className="modal-section" data-name="Input field" data-node-id="1587:3308">
            <div className="modal-label-wrapper" data-name="Label wrapper" data-node-id="1587:3309">
              <p className="modal-label" data-node-id="1587:3310">Type</p>
            </div>
            <div className="modal-badges" data-node-id="1587:3312">
              <button 
                className={`modal-badge ${selectedType === 'all' ? 'modal-badge-selected' : 'modal-badge-default'}`}
                onClick={() => setSelectedType('all')}
                data-name="Badge" 
                data-node-id="1587:3313"
              >
                <p className={selectedType === 'all' ? 'modal-badge-text-selected' : 'modal-badge-text'}>All types</p>
              </button>
              <button 
                className={`modal-badge ${selectedType === 'photos' ? 'modal-badge-selected' : 'modal-badge-default'}`}
                onClick={() => setSelectedType('photos')}
                data-name="Badge" 
                data-node-id="1587:3314"
              >
                <img 
                  src={selectedType === 'photos' ? photosIconSelected : photosIconDefault} 
                  alt="Photos" 
                  className="modal-badge-icon"
                />
                <p className={selectedType === 'photos' ? 'modal-badge-text-selected' : 'modal-badge-text'}>Photos</p>
              </button>
              <button 
                className={`modal-badge ${selectedType === 'videos' ? 'modal-badge-selected' : 'modal-badge-default'}`}
                onClick={() => setSelectedType('videos')}
                data-name="Badge" 
                data-node-id="1587:3315"
              >
                <img 
                  src={selectedType === 'videos' ? videoIconSelected : videoIconDefault} 
                  alt="Videos" 
                  className="modal-badge-icon"
                />
                <p className={selectedType === 'videos' ? 'modal-badge-text-selected' : 'modal-badge-text'}>Videos</p>
              </button>
            </div>
          </div>

          {/* People Section */}
          <div className="search-suggestions-section" data-name="Input field" data-node-id="I1563:5129;1554:3472">
            <div className="search-suggestions-label-wrapper" data-name="Label wrapper" data-node-id="I1563:5129;1554:3473">
              <p className="search-suggestions-label" data-node-id="I1563:5129;1554:3474">People</p>
            </div>
            <div className="search-suggestions-people-grid" data-node-id="I1563:5129;1554:3476">
              {people.map((person, index) => {
                const isSelected = selectedPeople.has(person);
                return (
                  <div
                    key={index}
                    className={`search-suggestions-person-item ${isSelected ? 'search-suggestions-person-selected' : ''}`}
                    data-name="Component 6"
                    data-node-id="I1563:5129;1554:3477"
                    onClick={() => handleTogglePerson(person)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="search-suggestions-person-avatar" data-node-id="I1563:5129;1554:3477;1534:1737">
                      <div className="search-suggestions-person-avatar-bg" />
                      <img src={peoplePhotos[index]} alt={person} className="search-suggestions-person-avatar-img" />
                      {isSelected && (
                        <div className="search-suggestions-person-checkmark">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#4250af"/>
                            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="search-suggestions-person-name" data-node-id="I1563:5129;1554:3477;1534:1739">{person}</p>
                  </div>
                );
              })}
              <div 
                className="search-suggestions-person-item search-suggestions-person-see-all" 
                data-name="Component" 
                data-selected="Selected3"
                onClick={onOpenPeopleView}
                style={{ cursor: 'pointer' }}
              >
                <div className="search-suggestions-person-avatar search-suggestions-person-avatar-see-all">
                  <div className="search-suggestions-person-avatar-bg-see-all" />
                  <div className="search-suggestions-person-arrow">
                    <img src={arrowRightIcon} alt="See all" className="search-suggestions-arrow-icon" />
                  </div>
                </div>
                <p className="search-suggestions-person-name-see-all">See all</p>
              </div>
            </div>
          </div>

          {/* Date Section */}
          <div className="modal-section" data-name="expanded" data-node-id="1587:3329">
            <div className="modal-section-inner" data-node-id="1587:3330">
              <p className="modal-label" data-node-id="1587:3331">Date</p>
              <div className="modal-date-input-wrapper" data-node-id="1587:3332">
                <div className="modal-date-input" data-name="Badge" data-node-id="1587:3335">
                  <img src={dateCalendarIcon} alt="Calendar" className="modal-date-icon" />
                  <p className="modal-date-text">Any date</p>
                  <img src={dropdownChevronIcon} alt="Dropdown" className="modal-date-chevron" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="modal-section" data-node-id="1587:3336">
            <p className="modal-label" data-node-id="1587:3337">Location</p>
            <div className="modal-location-input-wrapper" data-node-id="1587:3338">
              <div className="modal-location-input" data-name="Badge" data-node-id="1587:3341">
                <p className="modal-location-text">Strawberry, Arizona, USA</p>
              </div>
            </div>
          </div>

          {/* Camera Section */}
          <div className="modal-section" data-node-id="1587:3342">
            <p className="modal-label" data-node-id="1587:3343">Camera</p>
            <div className="modal-camera-input-wrapper" data-node-id="1587:3344">
              <div className="modal-camera-input" data-name="Badge" data-node-id="1587:3347">
                <p className="modal-camera-text">Any camera</p>
              </div>
            </div>
          </div>

          {/* File Types Section */}
          <div className="modal-section" data-name="Component 7" data-node-id="1587:3348">
            <p className="modal-label" data-node-id="I1587:3348;1554:2522">File types</p>
            <div className="modal-file-types-wrapper" data-node-id="I1587:3348;1554:2523">
              <div className="modal-file-types" data-node-id="I1587:3348;1554:2524">
                <div className="modal-file-types-badges" data-node-id="I1587:3348;1554:2525">
                  <button 
                    className={`modal-file-type-badge ${selectedFileType === 'all' ? 'modal-file-type-selected' : ''}`}
                    onClick={() => setSelectedFileType('all')}
                    data-name="Badge" 
                    data-node-id="I1587:3348;1554:2733"
                  >
                    <p className={selectedFileType === 'all' ? 'modal-file-type-text-selected' : 'modal-file-type-text'}>All</p>
                  </button>
                  {(isFileTypesExpanded 
                    ? ['.jpeg', '.png', '.heic', '.webp', '.gif', '.raw', '.tiff', '.bmp', '.avif', '.jxl', '.heif', '.svg', '.psd', '.jp2', '.rw2']
                    : ['.jpeg', '.png', '.heic', '.webp', '.gif', '.raw', '.tiff']
                  ).map((type) => (
                    <button
                      key={type}
                      className={`modal-file-type-badge ${selectedFileType === type ? 'modal-file-type-selected' : ''}`}
                      onClick={() => setSelectedFileType(type)}
                      data-name="Badge"
                    >
                      <p className={selectedFileType === type ? 'modal-file-type-text-selected' : 'modal-file-type-text'}>{type}</p>
                    </button>
                  ))}
                </div>
                {!isFileTypesExpanded && (
                  <button 
                    className="modal-see-more-button" 
                    data-name="Badge" 
                    data-node-id="I1587:3348;1554:2534"
                    onClick={() => setIsFileTypesExpanded(true)}
                  >
                    <p className="modal-see-more-text">see more</p>
                    <div className="modal-see-more-icon">
                      <img src={arrowDownIcon} alt="See more" className="modal-see-more-icon-img" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search In Section */}
          <div className="modal-section" data-name="Input field" data-node-id="1587:3349">
            <div className="modal-label-wrapper" data-name="Label wrapper" data-node-id="1587:3350">
              <p className="modal-label" data-node-id="1587:3351">Search in</p>
            </div>
            <div className="modal-badges" data-node-id="1587:3353">
              {['All', 'Albums', 'Favorites', 'Locked folder', 'Archive', 'Folders', 'Trash'].map((item) => (
                <button
                  key={item}
                  className={`modal-badge ${selectedSearchIn === item.toLowerCase() ? 'modal-badge-selected' : 'modal-badge-default'}`}
                  onClick={() => setSelectedSearchIn(item.toLowerCase())}
                  data-name="Badge"
                >
                  <p className={selectedSearchIn === item.toLowerCase() ? 'modal-badge-text-selected' : 'modal-badge-text'}>{item}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="modal-section" data-name="Adding Tags" data-node-id="1587:3362">
            <div className="modal-label-wrapper" data-name="Label wrapper" data-node-id="I1587:3362;1551:3285">
              <p className="modal-label" data-node-id="I1587:3362;1551:3286">Tags</p>
            </div>
            <div className="modal-tags-container" data-node-id="I1587:3362;1551:3288">
              <div className="modal-tags-input" data-name="Input" data-node-id="I1587:3362;1551:3289">
                <div className="modal-tags-content" data-name="Content" data-node-id="I1587:3362;1551:3298">
                  <p className="modal-tags-placeholder">Type to add tags</p>
                </div>
                <div className="modal-tags-list" data-node-id="I1587:3362;1551:3343">
                  {tags.map((tag) => (
                    <div key={tag} className="modal-tag" data-name="Tag" data-node-id="I1587:3362;1551:3344">
                      <p className="modal-tag-text">{tag}</p>
                      <div className="modal-tag-close" onClick={() => handleRemoveTag(tag)} data-name="_Tag close X">
                        <div className="modal-tag-close-icon" data-name="x-close">×</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" data-node-id="1587:3363">
          <div className="modal-footer-content" data-node-id="1587:3364">
            <div className="modal-show-more" data-name="Buttons/Button" data-node-id="1605:3965">
              <div className="modal-show-more-content" data-name="Text padding" data-node-id="1605:3967">
                <div className="modal-show-more-filter-icon" data-name="Frame" data-node-id="1605:3968">
                  <img alt="" className="modal-show-more-filter-icon-img" src={filterIcon} />
                </div>
                <p className="modal-show-more-text" data-node-id="1605:3978">Advanced filters</p>
                <div className="modal-show-more-chevron-wrapper" data-name="Badge" data-node-id="1605:4000">
                  <div className="modal-show-more-chevron-icon-wrapper" data-name="Icon Buttons" data-node-id="1605:4004">
                    <div className="modal-show-more-chevron-icon" data-name="Badge Icons" data-node-id="1605:4005">
                      <div className="modal-show-more-chevron-vector" data-name="Vector" data-node-id="I1605:4005;1492:5119">
                        <img alt="" className="modal-show-more-chevron-img" src={arrowDownIcon} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-actions" data-node-id="1554:3546">
              <button className="modal-search-button" data-name="Buttons/Button" data-node-id="1554:3548">
                <div className="modal-search-button-content" data-name="Text padding" data-node-id="I1554:3548;6421:273911">
                  <p className="modal-search-button-text" data-node-id="I1554:3548;3287:432949">Search</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;

