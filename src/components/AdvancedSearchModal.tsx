import React, { useState, useRef, useEffect } from 'react';
import './AdvancedSearchModal.css';
import './SearchSuggestionsDropdown.css';
import './DesignComponent.css';
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
import locationIcon from '../assets/location-icon.svg';
import cameraIcon from '../assets/camera-icon.svg';
import clearIcon from '../assets/clear-icon.svg';
import tagIcon from '../assets/tag-icon.svg';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchValue?: string;
  onOpenAdvancedFilters?: () => void;
  onOpenPeopleView?: () => void;
}

interface DatePickerMenuProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
  calendarDate: Date;
  onCalendarDateChange: (date: Date) => void;
}

const DatePickerMenu: React.FC<DatePickerMenuProps> = ({ 
  selectedDate, 
  onSelectDate, 
  onClose,
  calendarDate,
  onCalendarDateChange
}) => {
  const datePresets = [
    'Today',
    'Yesterday',
    'This week',
    'Last week',
    'This month',
    'Last month',
    'This year',
    'Last year',
    'Any date'
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return (firstDay.getDay() + 6) % 7; // Convert Sunday (0) to 6, Monday (0) to 0
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onCalendarDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onCalendarDateChange(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(calendarDate);
    const firstDay = getFirstDayOfMonth(calendarDate);
    type DayItem = number | { day: number; isPrevMonth?: boolean; isNextMonth?: boolean };
    const days: DayItem[] = [];

    // Get previous month's last days
    const prevMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 0);
    const prevMonthDays = prevMonth.getDate();
    
    // Add previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isPrevMonth: true });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // Add next month's days to fill the grid
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({ day, isNextMonth: true });
    }

    return days;
  };

  const handleApply = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="date-picker-menu" onClick={(e) => e.stopPropagation()}>
      <div className="date-picker-content">
        {/* Left Panel - Date Presets */}
        <div className="date-picker-presets">
          {datePresets.map((preset) => (
            <div
              key={preset}
              className={`date-picker-preset-item ${selectedDate === preset ? 'date-picker-preset-selected' : ''}`}
              onClick={() => onSelectDate(preset)}
            >
              <p>{preset}</p>
            </div>
          ))}
        </div>

        {/* Right Panel - Calendar */}
        <div className="date-picker-calendar">
          <div className="date-picker-calendar-content">
            <div className="date-picker-calendar-header">
              <button 
                className="date-picker-nav-button"
                onClick={handlePreviousMonth}
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="date-picker-month-year">
                {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
              </p>
              <button 
                className="date-picker-nav-button"
                onClick={handleNextMonth}
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="date-picker-calendar-grid">
              {/* Day headers */}
              {dayNames.map((day) => (
                <div key={day} className="date-picker-day-header">
                  <p>{day}</p>
                </div>
              ))}

              {/* Calendar days */}
              {renderCalendarDays().map((day, index) => {
                const dayValue = typeof day === 'number' ? day : day?.day || null;
                const isPrevMonth = typeof day === 'object' && day !== null && 'isPrevMonth' in day && day.isPrevMonth;
                const isNextMonth = typeof day === 'object' && day !== null && 'isNextMonth' in day && day.isNextMonth;
                const isEmpty = day === null;
                
                return (
                  <div
                    key={index}
                    className={`date-picker-day ${isEmpty ? 'date-picker-day-empty' : ''} ${isPrevMonth || isNextMonth ? 'date-picker-day-other-month' : ''} ${dayValue === 8 ? 'date-picker-day-selected' : ''}`}
                  >
                    {!isEmpty && <p>{dayValue}</p>}
                    {dayValue === 8 && <div className="date-picker-day-dot" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Panel - Actions */}
          <div className="date-picker-actions">
            <button className="date-picker-cancel-button" onClick={handleCancel} type="button">
              <p>Cancel</p>
            </button>
            <button className="date-picker-apply-button" onClick={handleApply} type="button">
              <p>Apply</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CameraPickerMenuProps {
  selectedCamera: string;
  onSelectCamera: (camera: string) => void;
  onClose: () => void;
  cameraOptions: string[];
}

const CameraPickerMenu: React.FC<CameraPickerMenuProps> = ({ 
  selectedCamera, 
  onSelectCamera, 
  onClose,
  cameraOptions
}) => {
  return (
    <div className="camera-picker-menu" onClick={(e) => e.stopPropagation()}>
      <div className="camera-picker-content">
        <div className="camera-picker-list">
          {cameraOptions.map((camera) => (
            <div
              key={camera}
              className={`camera-picker-item ${selectedCamera === camera ? 'camera-picker-item-selected' : ''}`}
              onClick={() => {
                onSelectCamera(camera);
                onClose();
              }}
            >
              <p>{camera}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ isOpen, onClose, initialSearchValue = '', onOpenAdvancedFilters, onOpenPeopleView }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'photos' | 'videos'>('photos');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [selectedSearchIn, setSelectedSearchIn] = useState<string>('all');
  const [tags, setTags] = useState<string[]>(['beach', 'summer 2025']);
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set());
  const [isFileTypesExpanded, setIsFileTypesExpanded] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('Any date');
  const [calendarDate, setCalendarDate] = useState(new Date(2024, 1, 1)); // February 2024
  const [locationSearchValue, setLocationSearchValue] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const [isCameraDropdownOpen, setIsCameraDropdownOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string>('Any camera');

  // Tags input states
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [isTagsSingleRow, setIsTagsSingleRow] = useState(true);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tagsListRef = useRef<HTMLDivElement>(null);
  const tagsInputWrapperRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Tag suggestions - matching Figma design
  const allTagSuggestions = [
    'summer 2025',
    'holiday',
    'Expedition into nature\'s wonders',
    'Pursuit of excitement',
    'Companions on a quest',
    'Exploring fresh vistas',
  ];

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

  // Sample location suggestions for autocomplete
  const allLocations = [
    'Strawberry, Arizona, USA',
    'Phoenix, Arizona, USA',
    'Tucson, Arizona, USA',
    'Flagstaff, Arizona, USA',
    'Sedona, Arizona, USA',
    'Los Angeles, California, USA',
    'San Francisco, California, USA',
    'San Diego, California, USA',
    'New York, New York, USA',
    'Chicago, Illinois, USA',
    'Houston, Texas, USA',
    'Miami, Florida, USA',
  ];

  // Camera options
  const cameraOptions = [
    'Any camera',
    'Canon EOS R5',
    'Canon EOS 5D Mark IV',
    'Canon EOS 90D',
    'Nikon D850',
    'Nikon Z7',
    'Nikon D750',
    'Sony A7R IV',
    'Sony A7 III',
    'Sony A6400',
    'Fujifilm X-T4',
    'Fujifilm X-Pro3',
    'Olympus OM-D E-M1 Mark III',
    'Panasonic Lumix GH5',
    'iPhone 14 Pro',
    'iPhone 13 Pro',
    'Samsung Galaxy S23 Ultra',
    'Google Pixel 7 Pro',
  ];
  
  // Search input states
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
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
      // Close date dropdown when modal closes
      setIsDateDropdownOpen(false);
      // Close camera dropdown when modal closes
      setIsCameraDropdownOpen(false);
      // Close tag suggestions when modal closes
      setIsTagInputFocused(false);
      setTagSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only depend on isOpen to preserve user input

  // Close date dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDateDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.modal-date-input-wrapper')) {
          setIsDateDropdownOpen(false);
        }
      }
    };

    if (isDateDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDateDropdownOpen]);

  // Close camera dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCameraDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.modal-camera-input-wrapper')) {
          setIsCameraDropdownOpen(false);
        }
      }
    };

    if (isCameraDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCameraDropdownOpen]);

  // Close tag suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isTagInputFocused) {
        const target = event.target as HTMLElement;
        if (!target.closest('.modal-tags-input-wrapper')) {
          setIsTagInputFocused(false);
          setTagSuggestions([]);
        }
      }
    };

    if (isTagInputFocused) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isTagInputFocused]);

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


  // Detect if tags are in single row or multiple rows
  useEffect(() => {
    if (tagsListRef.current && tags.length > 0) {
      const checkRows = () => {
        const tagsList = tagsListRef.current;
        if (tagsList && tagsList.children.length > 0) {
          // Get the first and last tag elements
          const firstTag = tagsList.children[0] as HTMLElement;
          const lastTag = tagsList.children[tagsList.children.length - 1] as HTMLElement;
          
          // If first and last tag are on the same row, they'll have the same offsetTop
          const isSingleRow = firstTag.offsetTop === lastTag.offsetTop;
          setIsTagsSingleRow(isSingleRow);
        }
      };
      
      // Check immediately and after a short delay to account for layout
      checkRows();
      const timeout = setTimeout(checkRows, 10);
      return () => clearTimeout(timeout);
    } else {
      setIsTagsSingleRow(true);
    }
  }, [tags, isTagInputFocused]);

  if (!isOpen) return null;

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Tag input handlers
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInputValue(value);
    
    // Filter suggestions based on input, or show all if empty and focused
    if (value.trim()) {
      const filtered = allTagSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase()) &&
        !tags.includes(suggestion)
      );
      setTagSuggestions(filtered);
    } else {
      // Show all available suggestions when input is empty and focused
      if (isTagInputFocused) {
        setTagSuggestions(allTagSuggestions.filter(suggestion => !tags.includes(suggestion)));
      } else {
        setTagSuggestions([]);
      }
    }
  };

  const handleTagInputFocus = () => {
    setIsTagInputFocused(true);
    // Show all available suggestions when field is activated
    setTagSuggestions(allTagSuggestions.filter(suggestion => !tags.includes(suggestion)));
    
    // Scroll tags input to middle of modal so suggestions are visible
    if (tagsInputWrapperRef.current && modalBodyRef.current) {
      setTimeout(() => {
        const wrapperRect = tagsInputWrapperRef.current?.getBoundingClientRect();
        const bodyRect = modalBodyRef.current?.getBoundingClientRect();
        if (wrapperRect && bodyRect && modalBodyRef.current) {
          const wrapperTop = wrapperRect.top - bodyRect.top + modalBodyRef.current.scrollTop;
          const bodyHeight = modalBodyRef.current.clientHeight;
          const scrollPosition = wrapperTop - (bodyHeight / 2) + (wrapperRect.height / 2);
          modalBodyRef.current.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    
    // Let the browser handle cursor position naturally
  };

  const handleTagInputBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== tagInputRef.current && 
          !document.activeElement?.closest('.modal-tag-suggestions')) {
        setIsTagInputFocused(false);
        setTagSuggestions([]);
      }
    }, 200);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    // Only handle Escape key - typing searches for existing tags, doesn't add new ones
    if (e.key === 'Escape') {
      setTagInputValue('');
      setTagSuggestions([]);
      tagInputRef.current?.blur();
    }
  };

  const handleTagSuggestionSelect = (suggestion: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion]);
    }
    setTagInputValue('');
    setTagSuggestions([]);
    // Revert field to default state (unfocused)
    setIsTagInputFocused(false);
    if (tagInputRef.current) {
      tagInputRef.current.blur();
    }
  };

  const handleTagInputWrapperClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.modal-tag-close')) {
      // Only focus if clicking on the input area, not on tags
      const target = e.target as HTMLElement;
      if (target.closest('.modal-tags-content') || target.closest('.modal-tags-placeholder-container')) {
        setTimeout(() => {
          if (tagInputRef.current) {
            tagInputRef.current.focus();
            // Let the browser handle cursor position based on click location
          }
        }, 0);
      } else {
        // If clicking elsewhere in the input, focus and position cursor at end
        setTimeout(() => {
          if (tagInputRef.current) {
            tagInputRef.current.focus();
            const length = tagInputRef.current.value.length;
            tagInputRef.current.setSelectionRange(length, length);
          }
        }, 0);
      }
    }
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

  // Location search handlers
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationSearchValue(value);
    setSelectedLocation(''); // Clear selected location when typing
    
    // Filter locations based on search value
    if (value.trim()) {
      const filtered = allLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationSearchValue(location);
    setLocationSuggestions([]);
    setIsLocationFocused(false);
  };

  const handleLocationFocus = () => {
    setIsLocationFocused(true);
    if (locationSearchValue.trim()) {
      const filtered = allLocations.filter(location =>
        location.toLowerCase().includes(locationSearchValue.toLowerCase())
      );
      setLocationSuggestions(filtered);
    }
  };

  const handleLocationBlur = () => {
    // Delay to allow click on suggestion to register
    setTimeout(() => {
      setIsLocationFocused(false);
      setLocationSuggestions([]);
    }, 200);
  };

  const handleLocationClear = () => {
    setLocationSearchValue('');
    setSelectedLocation('');
    setLocationSuggestions([]);
    setTimeout(() => {
      locationInputRef.current?.focus();
    }, 0);
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
                !isFocused && (
                  <div className="modal-search-text-wrapper" data-node-id="1587:3304">
                    <div className="modal-search-placeholder" data-node-id="1587:3307">
                      <p>{placeholderText}</p>
                    </div>
                  </div>
                )
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
        <div ref={modalBodyRef} className="modal-body" data-name="search-modal-1" data-node-id="1587:3294">
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
                <div 
                  className={`modal-date-input ${isDateDropdownOpen ? 'modal-date-input-focused' : ''}`}
                  data-name="Badge" 
                  data-node-id="1587:3335"
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={dateCalendarIcon} alt="Calendar" className="modal-date-icon" />
                  <p className="modal-date-text">{selectedDate}</p>
                  <img src={dropdownChevronIcon} alt="Dropdown" className="modal-date-chevron" />
                </div>
                {isDateDropdownOpen && (
                  <DatePickerMenu
                    selectedDate={selectedDate}
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setIsDateDropdownOpen(false);
                    }}
                    onClose={() => setIsDateDropdownOpen(false)}
                    calendarDate={calendarDate}
                    onCalendarDateChange={setCalendarDate}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="modal-section" data-node-id="1587:3336">
            <p className="modal-label" data-node-id="1587:3337">Location</p>
            <div className="modal-location-input-wrapper" data-node-id="1587:3338">
              <div className={`modal-location-input ${isLocationFocused ? 'modal-location-input-focused' : ''}`} data-name="Badge" data-node-id="1587:3341">
                <img src={locationIcon} alt="Location" className="modal-location-icon" />
                <input
                  ref={locationInputRef}
                  type="text"
                  value={locationSearchValue}
                  onChange={handleLocationChange}
                  onFocus={handleLocationFocus}
                  onBlur={handleLocationBlur}
                  placeholder="Search for a location"
                  className="modal-location-input-field"
                  autoComplete="off"
                  spellCheck="false"
                />
                {locationSearchValue && (
                  <button
                    className="modal-location-clear-button"
                    onClick={handleLocationClear}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <img alt="Clear" className="modal-location-clear-icon" src={clearIcon} />
                  </button>
                )}
              </div>
              {isLocationFocused && locationSuggestions.length > 0 && (
                <div className="modal-location-suggestions">
                  {locationSuggestions.map((location, index) => (
                    <div
                      key={index}
                      className="modal-location-suggestion-item"
                      onClick={() => handleLocationSelect(location)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <p>{location}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Camera Section */}
          <div className="modal-section" data-node-id="1587:3342">
            <div className="modal-section-inner" data-node-id="1587:3342">
              <p className="modal-label" data-node-id="1587:3343">Camera</p>
              <div className="modal-camera-input-wrapper" data-node-id="1587:3344">
                <div 
                  className={`modal-camera-input ${isCameraDropdownOpen ? 'modal-camera-input-focused' : ''}`}
                  data-name="Badge" 
                  data-node-id="1587:3347"
                  onClick={() => setIsCameraDropdownOpen(!isCameraDropdownOpen)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={cameraIcon} alt="Camera" className="modal-camera-icon" />
                  <p className="modal-camera-text">{selectedCamera}</p>
                  <img src={dropdownChevronIcon} alt="Dropdown" className="modal-camera-chevron" />
                </div>
                {isCameraDropdownOpen && (
                  <CameraPickerMenu
                    selectedCamera={selectedCamera}
                    onSelectCamera={(camera) => {
                      setSelectedCamera(camera);
                      setIsCameraDropdownOpen(false);
                    }}
                    onClose={() => setIsCameraDropdownOpen(false)}
                    cameraOptions={cameraOptions}
                  />
                )}
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
            <div className={`modal-tags-container ${tags.length > 0 ? 'modal-tags-container-with-tags' : ''}`} data-node-id="I1587:3362;1551:3288">
              <div ref={tagsInputWrapperRef} className={`modal-tags-input-wrapper ${isTagInputFocused ? 'modal-tags-input-wrapper-focused' : ''}`}>
                <div 
                  className={`modal-tags-input ${isTagInputFocused ? 'modal-tags-input-focused' : ''} ${tags.length > 0 ? 'modal-tags-input-with-tags' : ''} ${isTagInputFocused && tagSuggestions.length > 0 ? 'modal-tags-input-adding' : ''} ${tags.length > 0 && isTagInputFocused && isTagsSingleRow ? 'modal-tags-single-row' : ''}`}
                  data-name="Input" 
                  data-node-id="I1587:3362;1551:3289"
                  onClick={handleTagInputWrapperClick}
                >
                  {!tagInputValue && (
                    <div className="modal-tags-content" data-name="Content" data-node-id="I1587:3362;1551:3298">
                      <div className="modal-tags-placeholder-container">
                        <p className="modal-tags-placeholder">Type to search tags</p>
                      </div>
                    </div>
                  )}
                  {tags.length > 0 && !isTagInputFocused && (
                    <div ref={tagsListRef} className="modal-tags-list" data-node-id="I1587:3362;1551:3343">
                      {tags.map((tag) => {
                        const truncatedTag = tag.length > 20 ? tag.substring(0, 20) + '...' : tag;
                        return (
                          <div key={tag} className="search-person-chip" data-name="Tag" data-node-id="I1587:3362;1551:3344">
                            <div className="search-person-chip-content" data-name="Content" data-node-id="I1587:3362;1551:3344;3309:406970">
                              <p className="search-person-chip-text" data-node-id="I1587:3362;1551:3344;3307:418119">
                                {truncatedTag}
                              </p>
                            </div>
                          <div 
                            className="search-person-chip-close" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(tag);
                            }}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                            data-name="_Tag close X" 
                            data-node-id="I1587:3362;1551:3344;3307:418120"
                          >
                            <div className="search-person-chip-close-icon" data-name="x-close" data-node-id="I1587:3362;1551:3344;3307:418120;3307:417860">
                              <div className="search-person-chip-close-icon-inner" data-name="Icon" data-node-id="I1587:3362;1551:3344;3307:418120;3307:417860;3463:405166">
                                <div className="search-person-chip-close-icon-vector" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                                  <img alt="" className="search-person-chip-close-icon-img" src={closeXIcon} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  )}
                  <input
                    ref={tagInputRef}
                    type="text"
                    value={tagInputValue}
                    onChange={handleTagInputChange}
                    onFocus={handleTagInputFocus}
                    onBlur={handleTagInputBlur}
                    onKeyDown={handleTagInputKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    className="modal-tags-input-hidden"
                    aria-label="Add tags"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
                {isTagInputFocused && tagSuggestions.length > 0 && (
                  <div className="modal-tag-suggestions">
                    <div className="modal-tag-suggestions-list">
                      {tagSuggestions.map((suggestion, index) => (
                        <React.Fragment key={index}>
                          <div
                            className="modal-tag-suggestion-item"
                            onClick={(e) => handleTagSuggestionSelect(suggestion, e)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <div className="modal-tag-suggestion-icon">
                              <img src={tagIcon} alt="Tag" className="modal-tag-suggestion-icon-img" />
                            </div>
                            <p className="modal-tag-suggestion-text">{suggestion}</p>
                          </div>
                          {index < tagSuggestions.length - 1 && (
                            <div className="modal-tag-suggestion-divider"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
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

