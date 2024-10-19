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
      border-radius: 5px;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
      border: 0.25rem ${({ theme }) => theme.colors.background.secondary} solid;
    }

    body ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.background.secondary};
      border: 0.3rem ${({ theme }) => theme.colors.background.secondary} solid;
      border-radius: 0;
    }
    body ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0.95rem;
      height: 1rem;
    }
    body ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.background.primary};
    }
    body ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.background.main};
    }

    /*=================================================================================================
      LABELS
    =================================================================================================*/
    .ui.teal.label, .ui.label{
      background-color: #0a5858 !important;
      border-color: #0a5858 !important;
    }

    /*=================================================================================================
      FORM INPUTS
    =================================================================================================*/

    
    .ui.input, .ui.selection {
      background-color: ${({ theme }) => theme.colors.background.primary} !important;
      color: ${({ theme }) => theme.colors.text.primary} !important;
      border: 1px ${({ theme }) => theme.colors.border.primary} solid !important;
      border-radius: 3px;
      .divider.text {
        color: ${({ theme }) => theme.colors.text.primary} !important;
      }
      input[type='text'], input[type='number'], input[type='email'], input[type=password] {
        background-color: ${({ theme }) => theme.colors.background.primary} !important;
        color: ${({ theme }) => theme.colors.text.primary} !important;
      }
      .borderless-input {
        border: none !important;
      }
    }
    .ui.input.override {
      input[type='text'], input[type='number'], input[type='email'], input[type=password] {
        background-color: ${({ theme }) => theme.colors.background.secondary} !important;
        color: ${({ theme }) => theme.colors.text.primary} !important;
      }
    }
    .ui.selection.dropdown {
      border: 1px ${({ theme }) => theme.colors.border.primary} solid !important;
    }

    .ui.selection.dropdown .menu {
      border: solid 1px ${({ theme }) => theme.colors.border.primary} !important;
    }
    .ui.selection.dropdown .menu>.item:hover{
      background-color: ${({ theme }) => theme.colors.background.secondary} !important;
    }
    .ui.label {
      color: ${({ theme }) => theme.colors.text.primary} !important;
      background-color: ${({ theme }) => theme.colors.background.secondary} !important;
    }
    .ui.mini.label:not(.override) {
      background: ${({ theme }) => theme.colors.background.primary} !important;
    }
    .field label, label {
      color: ${({ theme }) => theme.colors.text.primary} !important;
    }
    .field textarea, #textarea {
      background-color: ${({ theme }) => theme.colors.background.primary} !important;
      color: ${({ theme }) => theme.colors.text.primary} !important;
      border: 1px ${({ theme }) => theme.colors.border.primary} solid !important;
      border-radius: 3px;
    }
    .inline.fields, .field.location-field {
      border: 1px ${({ theme }) => theme.colors.border.primary} solid !important;
    }
    .menu.transition {
      border: 1px ${({ theme }) => theme.colors.background.secondary} solid !important;
      background: ${({ theme }) => theme.colors.background.primary} !important;

      .item, .message {
        background-color: ${({ theme }) => theme.colors.background.secondary} !important;
        color: ${({ theme }) => theme.colors.text.primary} !important;
        border-top: 1px ${({ theme }) => theme.colors.border.primary} solid !important;
      }
    }
    .ui.tiny.header {
      color: ${({ theme }) => theme.colors.text.primary} !important;
      font-weight: bold !important;
    }
    .ui.checked.slider.checkbox, .ui.slider.checkbox {
      && label, label::before, label::after {
        color: ${({ theme }) => theme.colors.text.primary} !important;
      }
    }

    /*=================================================================================================
      BUTTONS
    =================================================================================================*/
    .ui.button {
        box-shadow: none !important;
    }

    .ui.basic.inverted.borderless-btn {
      color: ${({ theme }) => theme.colors.text.primary} !important;
      background: ${({ theme }) => theme.colors.background.primary} !important;
      box-shadow: none !important;

      &:hover {
        box-shadow: none !important;
        border: none !important;
        color: ${({ theme }) => theme.colors.text.header};
      }
    }

    .ui.button.primary {
      color: ${props => props.theme.colors.text.button} !important;
      background: ${props => props.theme.colors.background.buttons.primary} !important;
      border: none !important;
      &:hover {
        box-shadow: none !important;
        color: ${props => props.theme.colors.text.button} !important;
        background: ${props => props.theme.colors.background.buttons.primary} !important;
      }
    }

    /*=================================================================================================
      TABLES
    =================================================================================================*/
    .ui.pointing.inverted.secondary.menu .item.active {
      color: ${({ theme }) => theme.colors.text.primary} !important;
    }

    /*=================================================================================================
    SEMANTIC MODAL COMPONENT
    =================================================================================================*/
    .ui.page.modals.dimmer.transition.visible.active {
        padding: 0 !important;
        align-items: center;
        justify-content: center;
		    background-color: ${({ theme }) => theme.colors.background.overlay} !important;	
    }


    /*=================================================================================================
    FLEX GLOBALS
    =================================================================================================*/
    .flex{
      display: flex;
    }

    .ui.divider:not(.vertical):not(.horizontal) {
      border-top: 1px solid ${props => props.theme.colors.border.primary};
      border-bottom: none;
    }
`;
