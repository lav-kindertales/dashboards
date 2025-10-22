import { useEffect, useRef, useCallback } from 'react';

interface FocusManagementOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export const useFocusManagement = (isOpen: boolean, options: FocusManagementOptions = {}) => {
  const { trapFocus = false, restoreFocus = true, initialFocusRef } = options;
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Store the previously focused element when opening
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus management when opening/closing
  useEffect(() => {
    if (isOpen) {
      // Focus the initial element or container
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (containerRef.current) {
        containerRef.current.focus();
      }

      // Trap focus if enabled
      if (trapFocus && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Tab') {
            if (event.shiftKey) {
              if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }
    } else if (restoreFocus && previousActiveElement.current) {
      // Restore focus when closing
      previousActiveElement.current.focus();
    }
  }, [isOpen, trapFocus, restoreFocus, initialFocusRef]);

  const focusFirstElement = useCallback(() => {
    if (containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, []);

  const focusLastElement = useCallback(() => {
    if (containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      if (lastElement) {
        lastElement.focus();
      }
    }
  }, []);

  return {
    containerRef,
    focusFirstElement,
    focusLastElement,
  };
};
