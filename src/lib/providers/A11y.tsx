import React, { createContext, useReducer } from 'react';
export const providers = '';

export interface A11yStateProps {
  contrast: string;
  saturation: boolean;
  largeCursor: boolean;
  fonts: boolean;
  textSize: string;
}

export interface A11yContextProps extends A11yStateProps {
  dispatch(action: { type: string; value?: any }): A11yStateProps | void;
}

export const a11yInitialState: A11yStateProps = {
  contrast: 'normal',
  saturation: false,
  largeCursor: false,
  fonts: false,
  textSize: 'normal',
};

export const A11yContext = createContext<A11yContextProps>({
  ...a11yInitialState,
  dispatch: () => void null,
});

const contrastOpts = ['normal', 'high', 'highest'];
const textSizeOpts = ['normal', 'large', 'largest'];

export function a11yReducer(
  state: A11yStateProps,
  action: { type: string; value?: any }
): A11yStateProps {
  switch (action.type) {
    case 'toggleContrast':
      return {
        ...state,
        contrast:
          state.contrast === contrastOpts[contrastOpts.length - 1]
            ? contrastOpts[0]
            : contrastOpts[contrastOpts.indexOf(state.contrast) + 1],
      };
    case 'increaseContrast':
      return {
        ...state,
        contrast:
          state.contrast === contrastOpts[contrastOpts.length - 1]
            ? state.contrast
            : contrastOpts[contrastOpts.indexOf(state.contrast) + 1],
      };
    case 'decreaseContrast':
      return {
        ...state,
        contrast:
          state.contrast === contrastOpts[0]
            ? state.contrast
            : contrastOpts[contrastOpts.indexOf(state.contrast) - 1],
      };
    case 'toggleTextSize':
      return {
        ...state,
        textSize:
          state.textSize === textSizeOpts[textSizeOpts.length - 1]
            ? textSizeOpts[0]
            : textSizeOpts[textSizeOpts.indexOf(state.textSize) + 1],
      };
    case 'increaseTextSize':
      return {
        ...state,
        textSize:
          state.textSize === textSizeOpts[textSizeOpts.length - 1]
            ? state.textSize
            : textSizeOpts[textSizeOpts.indexOf(state.textSize) + 1],
      };
    case 'decreaseTextSize':
      return {
        ...state,
        textSize:
          state.textSize === textSizeOpts[0]
            ? state.textSize
            : textSizeOpts[textSizeOpts.indexOf(state.textSize) - 1],
      };
    case 'toggleSaturation':
      return {
        ...state,
        saturation: !state.saturation,
      };
    case 'toggleLargeCursor':
      return {
        ...state,
        largeCursor: !state.largeCursor,
      };
    case 'toggleFonts':
      return {
        ...state,
        fonts: !state.fonts,
      };
    default:
      return state;
  }
}

export const A11yProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(a11yReducer, a11yInitialState);
  return (
    <A11yContext.Provider value={{ ...state, dispatch }}>
      {children}
    </A11yContext.Provider>
  );
};
