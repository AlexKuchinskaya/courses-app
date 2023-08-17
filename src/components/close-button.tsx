/* import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { FC, memo, useCallback, useState } from 'react';
import { theme } from 'theme';
import { CloseButtonBase } from '../../assets/close-button-base';
import { CloseButtonContainer } from './close-button.styles';

extend([mixPlugin]);

type CloseButtonProps = { onClick?: () => void };
export const CloseButton: FC<CloseButtonProps> = memo(({ onClick }) => {
  const colorPressed = colord('#FFB800').mix('#011132', 0.2).toHex();
  const colorHover = colord('#FFB800').mix('#011132', 0.1).toHex();

  const colorStates = {
    idle: theme.colors.orange,
    pressed: theme.color([colorPressed]),
    hover: theme.color([colorHover]),
  } as const;
    type ColorStates = keyof typeof colorStates;

    const [colorState, setColorState] = useState<ColorStates>('idle');

    const Idle = useCallback(() => setColorState('idle'), []);
    const Hover = useCallback(() => setColorState('hover'), []);
    const Pressed = useCallback(() => setColorState('pressed'), []);
    return (
      <CloseButtonContainer
        onClick={onClick}
        onMouseDown={Pressed}
        onMouseUp={Hover}
        onMouseEnter={Hover}
        onMouseLeave={Idle}
        onTouchEnd={Idle}
        onTouchCancel={Idle}
      >
        <CloseButtonBase themeColor={colorStates[colorState]} />
      </CloseButtonContainer>
    );
});

 */
