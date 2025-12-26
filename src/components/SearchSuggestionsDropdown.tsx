import React, { useState } from 'react';
import './SearchSuggestionsDropdown.css';
import clockIcon from '../assets/clock-icon.svg';
import clockIcon2 from '../assets/clock-icon-2.svg';
import closeXGray from '../assets/close-x-gray.svg';
import dividerLine from '../assets/divider-line.svg';
import arrowDownIcon from '../assets/arrow-down-icon.svg';
import arrowRightIcon from '../assets/16f676d5be3442ecdd9228f68fac1693697db02a.svg';
import filterIcon from '../assets/filter-icon.svg';

interface SearchSuggestionsDropdownProps {
  isVisible: boolean;
  searchValue?: string;
  onSelectSuggestion?: (suggestion: string) => void;
  onOpenAdvancedFilters?: () => void;
  onOpenPeopleView?: () => void;
}

const SearchSuggestionsDropdown: React.FC<SearchSuggestionsDropdownProps> = ({ isVisible, searchValue = '', onSelectSuggestion, onOpenAdvancedFilters, onOpenPeopleView }) => {
  const [recentSearches, setRecentSearches] = useState([
    { id: 1, text: 'beach', selected: false },
    { id: 2, text: 'emma', selected: false },
    { id: 3, text: 'christmas holidays 2025', selected: false },
  ]);

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

  const handleRemoveRecent = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(item => item.id !== id));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRecentSearches([]);
  };

  const handleClearAllMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSelectSuggestion = (text: string) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(text);
    }
  };

  if (!isVisible) return null;

  const hasRecentSearches = recentSearches.length > 0;
  const isSearchValueEmpty = !searchValue || searchValue.trim() === '';

  return (
    <div className="search-suggestions-dropdown" data-name="search-01" data-node-id="1563:5129">
      <div className="search-suggestions-content" data-name="search-modal-1" data-node-id="I1563:5129;1554:3444">
        {/* Recent Searches Section - Only show if there are items */}
        {hasRecentSearches && (
          <>
            <div className="search-suggestions-section" data-node-id="I1563:5129;1563:8192">
              <div className="search-suggestions-header" data-node-id="I1563:5129;1563:8193">
                <p className="search-suggestions-title" data-node-id="I1563:5129;1563:8194">Recent searches</p>
                <button 
                  type="button"
                  className="search-suggestions-clear" 
                  onClick={(e) => handleClearAll(e)}
                  onMouseDown={handleClearAllMouseDown}
                  data-node-id="I1563:5129;1563:8195"
                >
                  <p className="search-suggestions-clear-text">Clear</p>
                </button>
              </div>
              <div className="search-suggestions-list" data-node-id="I1563:5129;1563:8350">
                {recentSearches.map((search) => (
                  <div
                    key={search.id}
                    className="search-suggestion-item"
                    onClick={() => handleSelectSuggestion(search.text)}
                    data-name="Badge"
                    data-node-id="I1563:5129;1563:8351"
                  >
                    <div className="search-suggestion-icon" data-name="Frame" data-node-id="I1563:5129;1563:8353">
                      <img alt="" className="search-suggestion-icon-img" src={clockIcon} />
                    </div>
                    <div className="search-suggestion-text-wrapper" data-node-id="I1563:5129;1563:8355">
                      <p className="search-suggestion-text">{search.text}</p>
                    </div>
                    <div
                      className="search-suggestion-close"
                      onClick={(e) => handleRemoveRecent(search.id, e)}
                      data-name="_Tag close X"
                      data-node-id="I1563:5129;1563:8388"
                    >
                      <div className="search-suggestion-close-icon" data-name="x-close" data-node-id="I1563:5129;1563:8388;3307:417860">
                        <div className="search-suggestion-close-icon-inner" data-name="Icon" data-node-id="I1563:5129;1563:8388;3307:417860;3463:405166">
                          <div className="search-suggestion-close-icon-vector" style={{ "--stroke-0": "rgba(143, 146, 159, 1)" } as React.CSSProperties}>
                            <img alt="" className="search-suggestion-close-icon-img" src={closeXGray} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider - Only show if there are recent searches */}
            <div className="search-suggestions-divider" data-name="divider" data-node-id="I1563:5129;1563:8383">
              <div className="search-suggestions-divider-line" data-node-id="I1563:5129;1563:8383;1529:1768">
                <div className="search-suggestions-divider-stroke">
                  <img alt="" className="search-suggestions-divider-img" src={dividerLine} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* People Section */}
        <div className="search-suggestions-section" data-name="Input field" data-node-id="I1563:5129;1554:3472">
          <div className="search-suggestions-label-wrapper" data-name="Label wrapper" data-node-id="I1563:5129;1554:3473">
            <p className="search-suggestions-label" data-node-id="I1563:5129;1554:3474">People</p>
          </div>
          <div className="search-suggestions-people-grid" data-node-id="I1563:5129;1554:3476">
            {people.map((person, index) => (
              <div
                key={index}
                className="search-suggestions-person-item"
                onClick={() => handleSelectSuggestion(person)}
                data-name="Component 6"
                data-node-id="I1563:5129;1554:3477"
              >
                <div className="search-suggestions-person-avatar" data-node-id="I1563:5129;1554:3477;1534:1737">
                  <div className="search-suggestions-person-avatar-bg" />
                  <img src={peoplePhotos[index]} alt={person} className="search-suggestions-person-avatar-img" />
                </div>
                <p className="search-suggestions-person-name" data-node-id="I1563:5129;1554:3477;1534:1739">{person}</p>
              </div>
            ))}
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
      </div>

      {/* Footer */}
      <div className="search-suggestions-footer" data-node-id="I1563:5129;1554:3531">
        <div className="search-suggestions-footer-content" data-node-id="I1563:5129;1554:3532">
          <div 
            className="search-suggestions-show-more" 
            data-name="Buttons/Button" 
            data-node-id="1605:3965"
            onClick={onOpenAdvancedFilters}
            style={{ cursor: 'pointer' }}
          >
            <div className="search-suggestions-show-more-content" data-name="Text padding" data-node-id="1605:3967">
              <div className="search-suggestions-show-more-filter-icon" data-name="Frame" data-node-id="1605:3968">
                <img alt="" className="search-suggestions-show-more-filter-icon-img" src={filterIcon} />
              </div>
              <p className="search-suggestions-show-more-text" data-node-id="1605:3978">Advanced filters</p>
              <div className="search-suggestions-show-more-chevron-wrapper" data-name="Badge" data-node-id="1605:4000">
                <div className="search-suggestions-show-more-chevron-icon-wrapper" data-name="Icon Buttons" data-node-id="1605:4004">
                  <div className="search-suggestions-show-more-chevron-icon" data-name="Badge Icons" data-node-id="1605:4005">
                    <div className="search-suggestions-show-more-chevron-vector" data-name="Vector" data-node-id="I1605:4005;1492:5119">
                      <img alt="" className="search-suggestions-show-more-chevron-img" src={arrowDownIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-suggestions-footer-actions" data-node-id="I1563:5129;1554:3546">
            <div 
              className={`search-suggestions-search-button ${isSearchValueEmpty ? 'search-suggestions-button-disabled' : ''}`}
              data-name="Buttons/Button" 
              data-node-id="1554:3548"
            >
              <div className="search-suggestions-search-button-content" data-name="Text padding" data-node-id="I1554:3548;6421:273911">
                <p className="search-suggestions-search-button-text" data-node-id="I1554:3548;3287:432949">Search</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestionsDropdown;

