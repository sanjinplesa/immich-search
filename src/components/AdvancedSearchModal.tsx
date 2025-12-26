import React, { useState, useRef, useEffect } from 'react';
import './AdvancedSearchModal.css';
import searchIcon from '../assets/search-icon.svg';
import closeXIcon from '../assets/close-x-icon.svg';
import iconButtonsSvg from '../assets/icon-buttons.svg';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'photos' | 'videos'>('photos');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [selectedSearchIn, setSelectedSearchIn] = useState<string>('all');
  const [tags, setTags] = useState<string[]>(['beach', 'summer 2025']);
  
  // Search input states
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchValue('');
      searchInputRef.current?.blur();
    }
  };

  // Determine search input state
  let searchState: "Default" | "Active4" | "Active" | "Typing" = "Default";
  if (isFocused && searchValue) {
    searchState = "Typing";
  } else if (isFocused) {
    searchState = "Active";
  } else if (isHovered && !isFocused) {
    searchState = "Active4";
  }

  const placeholderText = "Try 'sunset at the beach' or 'people laughing...'";

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
                    {showCursor && <span className="modal-search-cursor">|</span>}
                    <p className="modal-search-typed-text">{searchValue}</p>
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
                className={`modal-badge ${selectedType === 'all' ? '' : 'modal-badge-default'}`}
                onClick={() => setSelectedType('all')}
                data-name="Badge" 
                data-node-id="1587:3313"
              >
                <p className="modal-badge-text">All types</p>
              </button>
              <button 
                className={`modal-badge ${selectedType === 'photos' ? 'modal-badge-selected' : 'modal-badge-default'}`}
                onClick={() => setSelectedType('photos')}
                data-name="Badge" 
                data-node-id="1587:3314"
              >
                <p className="modal-badge-text-selected">Photos</p>
              </button>
              <button 
                className={`modal-badge ${selectedType === 'videos' ? 'modal-badge-selected' : 'modal-badge-default'}`}
                onClick={() => setSelectedType('videos')}
                data-name="Badge" 
                data-node-id="1587:3315"
              >
                <p className="modal-badge-text">Videos</p>
              </button>
            </div>
          </div>

          {/* People Section */}
          <div className="modal-section" data-name="margin" data-node-id="1587:3316">
            <div className="modal-section-inner" data-name="Input field" data-node-id="1587:3317">
              <div className="modal-label-wrapper" data-name="Label wrapper" data-node-id="1587:3318">
                <p className="modal-label" data-node-id="1587:3319">People</p>
              </div>
              <div className="modal-people-grid" data-node-id="1587:3321">
                <div className="modal-person-item" data-name="Component 6" data-node-id="1587:3322">
                  <div className="modal-person-avatar" data-node-id="I1587:3322;1534:1737">
                    <div className="modal-person-avatar-bg" />
                  </div>
                  <p className="modal-person-name">Oliver Thompson</p>
                </div>
                <div className="modal-person-item modal-person-selected" data-node-id="1587:3323">
                  <div className="modal-person-avatar" data-node-id="I1587:3323;1538:1945">
                    <div className="modal-person-avatar-bg" />
                  </div>
                  <p className="modal-person-name">Sophia Martinez</p>
                </div>
                <div className="modal-person-item" data-node-id="1587:3324">
                  <div className="modal-person-avatar" data-node-id="I1587:3324;1534:1737">
                    <div className="modal-person-avatar-bg" />
                  </div>
                  <p className="modal-person-name">Liam Johnson</p>
                </div>
                <div className="modal-person-item" data-node-id="1587:3325">
                  <div className="modal-person-avatar" data-node-id="I1587:3325;1534:1737">
                    <div className="modal-person-avatar-bg" />
                  </div>
                  <p className="modal-person-name">Emma Williams</p>
                </div>
                <div className="modal-person-item" data-node-id="1587:3326">
                  <div className="modal-person-avatar" data-node-id="I1587:3326;1534:1737">
                    <div className="modal-person-avatar-bg" />
                  </div>
                  <p className="modal-person-name modal-person-name-unnamed">Unnamed</p>
                </div>
                <div className="modal-person-item" data-node-id="1587:3327">
                  <div className="modal-person-avatar" data-node-id="I1587:3327;1534:1737">
                    <div className="modal-person-avatar-bg" />
                  </div>
                  <p className="modal-person-name modal-person-name-unnamed">Unnamed</p>
                </div>
                <div className="modal-person-item modal-person-see-all" data-name="Component" data-selected="Selected3">
                  <div className="modal-person-avatar modal-person-avatar-see-all">
                    <div className="modal-person-avatar-bg-see-all" />
                    <div className="modal-person-arrow">→</div>
                  </div>
                  <p className="modal-person-name-see-all">See all</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date Section */}
          <div className="modal-section" data-name="expanded" data-node-id="1587:3329">
            <div className="modal-section-inner" data-node-id="1587:3330">
              <p className="modal-label" data-node-id="1587:3331">Date</p>
              <div className="modal-date-input-wrapper" data-node-id="1587:3332">
                <div className="modal-date-input" data-name="Badge" data-node-id="1587:3335">
                  <p className="modal-date-text">Any date</p>
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
                  {['.jpeg', '.png', '.heic', '.webp', '.gif', '.raw', '.tiff'].map((type) => (
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
                <button className="modal-see-more-button" data-name="Badge" data-node-id="I1587:3348;1554:2534">
                  <p className="modal-see-more-text">See more</p>
                  <div className="modal-see-more-icon">→</div>
                </button>
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
            <div className="modal-show-more" data-name="Badge" data-node-id="1587:3365">
              <p className="modal-show-more-text">Show more filters</p>
              <div className="modal-show-more-icon">↓</div>
            </div>
            <div className="modal-footer-actions" data-node-id="1587:3373">
              <button className="modal-clear-all-button" data-name="Buttons/Button" data-node-id="1587:3374">
                <p className="modal-clear-all-text">Clear all</p>
              </button>
              <button className="modal-search-button" data-name="Buttons/Button" data-node-id="1587:3375">
                <p className="modal-search-button-text">Search</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;

