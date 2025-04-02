import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    /* BODY */
    body {
      background: ${({ theme }) => theme.colors.background.primary};
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 0.875rem;
      height: 100vh;
      width: 100%;
    }

    #root{
        height: 100%;
    }

    /*=================================================================================================
      SCROLL BAR
    =================================================================================================*/
    body ::-webkit-scrollbar-thumb {
      cursor: pointer;
      border-radius: 1rem;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
      background: ${({ theme }) => theme.colors.background.mainDimmer};
    }

    body ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.background.linear2};
    }

    body ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.background.secondary};
      border-radius: 0;
    }
    body ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: .5rem;
    }

    .zoom-dialog [data-rmiz-modal-overlay],
    .zoom-dialog [data-rmiz-modal-img] {
      transition-duration: 0.2s;
      transition-timing-function: linear;
    }
    .zoom-dialog [data-rmiz-modal-overlay="hidden"] {
      background-color: transparent;
      backdrop-filter: blur(0);
    }
    .zoom-dialog [data-rmiz-modal-overlay="visible"] {
      background-color:${({ theme }) => theme.colors.background.overlay};
      backdrop-filter: blur(0.2rem);
    }
    .zoom-dialog [data-rmiz-btn-unzoom] {
      background-color: ${({ theme }) => theme.colors.background.main};
      color: ${({ theme }) => theme.colors.text.button.primary};
    }
    .zoom-dialog [data-rmiz-btn-unzoom]:focus-visible {
      outline-offset: 0.4rem;
      outline: 0.2rem solid ${({ theme }) => theme.colors.border.active};
    }

    @media (max-width: 768px) {
      .ant-picker-panels {
        flex-direction: column;
        width: 100%;
      }
    }
  
`;
