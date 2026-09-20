import React from 'react';
import { LetterState } from '../../game/types';
import { KeyButton } from './KeyButton';
import { Delete } from 'lucide-react';

interface VirtualKeyboardProps {
  keyboardStates: Record<string, LetterState>;
  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  disabled?: boolean;
  highContrast?: boolean;
}

const ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const ROW_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  keyboardStates,
  onChar,
  onEnter,
  onDelete,
  disabled = false,
  highContrast = false,
}) => {
  const handleKeyClick = (val: string) => {
    if (val === 'ENTER') {
      onEnter();
    } else if (val === 'BACKSPACE') {
      onDelete();
    } else {
      onChar(val);
    }
  };

  return (
    <div
      role="group"
      aria-label="On-screen Keyboard"
      className="w-full max-w-lg mx-auto px-1.5 sm:px-2 py-2 flex flex-col gap-1.5 sm:gap-2 select-none"
    >
      {/* Row 1 */}
      <div className="flex gap-1 sm:gap-1.5 w-full justify-center">
        {ROW_1.map(char => (
          <KeyButton
            key={char}
            value={char}
            state={keyboardStates[char]}
            onClick={handleKeyClick}
            disabled={disabled}
            highContrast={highContrast}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-1 sm:gap-1.5 w-full justify-center px-2 sm:px-3">
        {ROW_2.map(char => (
          <KeyButton
            key={char}
            value={char}
            state={keyboardStates[char]}
            onClick={handleKeyClick}
            disabled={disabled}
            highContrast={highContrast}
          />
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex gap-1 sm:gap-1.5 w-full justify-center">
        <KeyButton
          value="ENTER"
          display="ENTER"
          isWide
          onClick={handleKeyClick}
          disabled={disabled}
          highContrast={highContrast}
        />
        {ROW_3.map(char => (
          <KeyButton
            key={char}
            value={char}
            state={keyboardStates[char]}
            onClick={handleKeyClick}
            disabled={disabled}
            highContrast={highContrast}
          />
        ))}
        <KeyButton
          value="BACKSPACE"
          display={<Delete className="w-5 h-5" />}
          isWide
          onClick={handleKeyClick}
          disabled={disabled}
          highContrast={highContrast}
        />
      </div>
    </div>
  );
};
