import React, { useState, useEffect, useMemo } from 'react';
import './PeopleViewModal.css';
import arrowRightIcon from '../assets/16f676d5be3442ecdd9228f68fac1693697db02a.svg';

interface PeopleViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPerson?: (person: string) => void;
  onSelectPeople?: (people: string[]) => void;
}

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PeopleViewModal: React.FC<PeopleViewModalProps> = ({ isOpen, onClose, onSelectPerson, onSelectPeople }) => {
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set());
  const [shuffleKey, setShuffleKey] = useState(0);

  // Reset selections when modal opens/closes and trigger shuffle on open
  useEffect(() => {
    if (!isOpen) {
      setSelectedPeople(new Set());
    } else {
      setShuffleKey(prev => prev + 1);
    }
  }, [isOpen]);

  // People with gender-matched names and avatars
  // Using useMemo to ensure consistent randomization per modal open
  const allPeople = useMemo(() => {
    // Male names with diverse male avatar IDs (pravatar.cc)
    const malePeople = [
      { name: 'Ethan Rivers', avatarId: 12 },
      { name: 'Oliver Bennett', avatarId: 13 },
      { name: 'Mason Reed', avatarId: 14 },
      { name: 'Mason Thompson', avatarId: 15 },
      { name: 'James Carter', avatarId: 16 },
      { name: 'James Bennett', avatarId: 17 },
      { name: 'Lucas Gray', avatarId: 18 },
      { name: 'Lucas Adams', avatarId: 19 },
      { name: 'Lucas Bennett', avatarId: 20 },
      { name: 'Lucas Parker', avatarId: 21 },
      { name: 'Lucas Harris', avatarId: 22 },
      { name: 'Lucas Foster', avatarId: 23 },
      { name: 'Lucas Thompson', avatarId: 24 },
      { name: 'Liam Harris', avatarId: 25 },
      { name: 'Liam Bennett', avatarId: 26 },
      { name: 'Liam Reed', avatarId: 27 },
      { name: 'Liam Foster', avatarId: 28 },
      { name: 'Liam Thompson', avatarId: 29 },
      { name: 'Liam King', avatarId: 30 },
      { name: 'Liam Mitchell', avatarId: 31 },
      { name: 'Noah Scott', avatarId: 32 },
      { name: 'Noah King', avatarId: 33 },
      { name: 'Noah Mitchell', avatarId: 34 },
      { name: 'Noah Gray', avatarId: 35 },
      { name: 'Noah Carter', avatarId: 36 },
      { name: 'Noah Adams', avatarId: 37 },
      { name: 'Noah Parker', avatarId: 38 },
      { name: 'Alexander Wright', avatarId: 39 },
      { name: 'Benjamin Taylor', avatarId: 40 },
      { name: 'Daniel Martinez', avatarId: 41 },
      { name: 'Henry Wilson', avatarId: 42 },
      { name: 'Jackson Brown', avatarId: 43 },
      { name: 'Samuel Davis', avatarId: 44 },
      { name: 'William Johnson', avatarId: 45 },
      { name: 'Michael Smith', avatarId: 46 },
    ];

    // Female names with diverse female avatar IDs (pravatar.cc)
    const femalePeople = [
      { name: 'Amelia Brooks', avatarId: 47 },
      { name: 'Amelia Parker', avatarId: 48 },
      { name: 'Isabella Foster', avatarId: 49 },
      { name: 'Isabella Harris', avatarId: 50 },
      { name: 'Ava Mitchell', avatarId: 51 },
      { name: 'Ava Brooks', avatarId: 52 },
      { name: 'Olivia King', avatarId: 53 },
      { name: 'Olivia Reed', avatarId: 54 },
      { name: 'Olivia Carter', avatarId: 55 },
      { name: 'Olivia Mitchell', avatarId: 56 },
      { name: 'Olivia Gray', avatarId: 57 },
      { name: 'Olivia Brooks', avatarId: 58 },
      { name: 'Chloe Adams', avatarId: 59 },
      { name: 'Chloe Bennett', avatarId: 60 },
      { name: 'Chloe Brooks', avatarId: 61 },
      { name: 'Chloe Foster', avatarId: 62 },
      { name: 'Chloe Parker', avatarId: 63 },
      { name: 'Chloe Reed', avatarId: 64 },
      { name: 'Chloe Mitchell', avatarId: 65 },
      { name: 'Zoe Parker', avatarId: 66 },
      { name: 'Zoe King', avatarId: 67 },
      { name: 'Zoe Foster', avatarId: 68 },
      { name: 'Zoe Gray', avatarId: 69 },
      { name: 'Zoe Harris', avatarId: 70 },
      { name: 'Mia Thompson', avatarId: 1 },
      { name: 'Mia Bennett', avatarId: 2 },
      { name: 'Mia King', avatarId: 3 },
      { name: 'Mia Harris', avatarId: 4 },
      { name: 'Mia Reed', avatarId: 5 },
      { name: 'Mia Adams', avatarId: 6 },
      { name: 'Mia Mitchell', avatarId: 7 },
      { name: 'Sophia Martinez', avatarId: 8 },
      { name: 'Emma Williams', avatarId: 9 },
      { name: 'Charlotte Anderson', avatarId: 10 },
      { name: 'Harper Johnson', avatarId: 11 },
      { name: 'Grace Lee', avatarId: 20 },
      { name: 'Lily Chen', avatarId: 21 },
    ];

    return shuffleArray([...malePeople, ...femalePeople]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleKey]); // Re-shuffle when modal opens (shuffleKey changes trigger re-shuffle)

  // Extract names and photos arrays
  const people = allPeople.map(p => p.name);
  const peoplePhotos = allPeople.map(p => `https://i.pravatar.cc/150?img=${p.avatarId}`);

  if (!isOpen) return null;

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

  const handleSearch = () => {
    const selectedArray = Array.from(selectedPeople);
    if (onSelectPeople && selectedArray.length > 0) {
      onSelectPeople(selectedArray);
    } else if (onSelectPerson && selectedArray.length > 0) {
      // Fallback to single select for backward compatibility
      onSelectPerson(selectedArray[0]);
    }
    onClose();
  };

  return (
    <div className="people-view-modal-overlay" onClick={onClose}>
      <div className="people-view-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="people-view-modal-header">
          <div className="people-view-modal-header-content">
            <div className="people-view-modal-back-button" onClick={onClose}>
              <div className="people-view-modal-back-icon-container">
                <img alt="Back" className="people-view-modal-back-icon" src={arrowRightIcon} />
              </div>
              <p className="people-view-modal-back-text">People</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="people-view-modal-body">
          <div className="people-view-modal-section">
            <div className="people-view-modal-people-grid">
              {people.map((person, index) => {
                const isSelected = selectedPeople.has(person);
                return (
                  <div 
                    key={`${person}-${index}`} 
                    className={`people-view-modal-person-item ${isSelected ? 'people-view-modal-person-selected' : ''}`}
                    onClick={() => handleTogglePerson(person)}
                  >
                    <div className="people-view-modal-person-avatar">
                      <div className="people-view-modal-person-avatar-bg" />
                      <img 
                        src={peoplePhotos[index]} 
                        alt={person} 
                        className="people-view-modal-person-avatar-img" 
                      />
                      {isSelected && (
                        <div className="people-view-modal-person-checkmark">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#4250af"/>
                            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="people-view-modal-person-name">{person}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="people-view-modal-footer">
          <div className="people-view-modal-footer-content">
            <button 
              className={`people-view-modal-search-button ${selectedPeople.size === 0 ? 'people-view-modal-search-button-disabled' : ''}`}
              onClick={handleSearch}
              type="button"
              disabled={selectedPeople.size === 0}
            >
              <div className="people-view-modal-search-button-content">
                <p className="people-view-modal-search-button-text">Apply</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleViewModal;

